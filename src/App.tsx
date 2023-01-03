import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import Login from "./pages/Login";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "./generated/graphql";
import { betterUpdateQuery } from "./utils/betterUpdateQuery";

// const client = createClient({
//   url: "http://localhost:4000/graphql",
//   fetchOptions: {
//     credentials: "include",
//   },
//   exchanges: [
//     dedupExchange,
//     cacheExchange({
//       updates: {
//         Mutation: {
//           login: (_result, args, cache, info) => {
//             betterUpdateQuery<LoginMutation, MeQuery>(
//               cache,
//               { query: MeDocument },
//               _result,
//               (result, query) => {
//                 if (result.login.errors) {
//                   return query;
//                 } else {
//                   return {
//                     me: result.login.user,
//                   };
//                 }
//               }
//             );
//           },
//           register: (_result, args, cache, info) => {
//             betterUpdateQuery<RegisterMutation, MeQuery>(
//               cache,
//               { query: MeDocument },
//               _result,
//               (result, query) => {
//                 if (result.register.errors) {
//                   return query;
//                 } else {
//                   return {
//                     me: result.register.user,
//                   };
//                 }
//               }
//             );
//           },
//         },
//       },
//     }),
//     fetchExchange,
//   ],
// });

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
