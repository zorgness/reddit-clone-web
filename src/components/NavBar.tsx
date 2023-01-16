import React from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
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
      <>
        <Link to={"/login"} style={{ margin: "12px" }}>
          login
        </Link>

        <Link to={"/register"}>register</Link>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.me.username}</Box>
        <Link to="/create-post" style={{ margin: "12px" }}>
          create_post
        </Link>

        <Button
          onClick={() => {
            handleLogout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
        <ColorModeSwitcher />
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link to={"/"}>
          <Heading>Reddit Clone</Heading>
        </Link>

        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
