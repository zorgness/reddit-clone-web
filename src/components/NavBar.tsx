import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import reddit from "../icon/reddit.png";

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
        <Button mr={3}>
          <Link to="/create-post" style={{ margin: "8px" }}>
            create_post
          </Link>
        </Button>

        <Box mr={3}>{data.me.username}</Box>

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
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="#F7FAFC"
      style={{
        borderBottom: "1px solid lightgrey",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      }}
      p={4}
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link to={"/"}>
          <Flex align="center">
            <Image
              src={reddit}
              alt="reddit"
              borderRadius="full"
              boxSize={"40px"}
              mr={1}
            />
            <Heading>mini reddit</Heading>
          </Flex>
        </Link>

        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
