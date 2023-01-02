import React from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const navigate = useNavigate();
  // const [logout, { loading: logoutFetching }] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

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
          // onClick={async () => {
          //   await logout();
          //   await apolloClient.resetStore();
          // }}
          // isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tomato" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link to={"/"}>
          <Heading>Reddit Clone</Heading>
        </Link>

        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
