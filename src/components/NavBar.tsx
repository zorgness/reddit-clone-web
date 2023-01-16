import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  // const apolloClient = useApolloClient();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    // if window is undefined no need to make the query
  });

  let body = null;

  const handleLogout = async () => {
    // ? strange behavior, don't know why i have to pass this argument to logout function
    await logout({ variable: "logout" as never });
  };

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <div className="flex">
        <Link to={"/login"} style={{ margin: "16px" }}>
          login
        </Link>
      </div>
    );
    // user is logged in
  } else {
    body = (
      <div>
        <button>
          <Link to="/create-post">create post</Link>
        </button>

        {/* <Box mr={2}>{data.me.username}</Box> */}

        <button
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link to={"/"}>
          <h1>Reddit Clone</h1>
        </Link>

        <div>{body}</div>
      </div>
    </div>
  );
};
