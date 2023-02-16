import { gql } from "@urql/core";
import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          // second security if not authenticated
          window.location.href = "/login";
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

const categoryPosts = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "postsByCategory"
    );
    info.partial = !isItInTheCache;

    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;

      const data = cache.resolve(key, "posts") as string[];
      results.push(...data);
    });

    return {
      __typename: "CategoryPosts",

      posts: results,
    };
  };
};

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");

  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  const categoryInfos = allFields.filter(
    (info) => info.fieldName === "postsByCategory"
  );
  fieldInfos.forEach((info) => {
    cache.invalidate("Query", "posts", info.arguments || {});
  });
  categoryInfos.forEach((info) => {
    cache.invalidate("Query", "postsByCategory", info.arguments || {});
  });
};

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: process.env.REACT_APP_PUBLIC_API as string,
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
          CategoryPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
            // postsByCategory: (_, args) => ({
            //   __typename: "CategoryPosts",
            //   id: args.categoryId,
            // }),
            postsByCategory: categoryPosts(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                _id: (args as DeletePostMutationVariables)._id,
              });
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as { id: number }
              );

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newValue =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value;

                const fragment = gql`
                  fragment _ on Post {
                    points
                    voteStatus
                  }
                `;

                cache.writeFragment(fragment, {
                  id: postId,
                  points: newValue,
                  voteStatus: value,
                } as any);
              }
              invalidateAllPosts(cache);
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
              invalidateAllPosts(cache);
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
              invalidateAllPosts(cache);
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
