import React from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const navigate = useNavigate();
  // const [logout, { loading: logoutFetching }] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  // const { data, loading } = useMeQuery({
  //   skip: isServer(),
  // });
  const loading = false;

  const me = true;

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (me) {
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
        <Link to="/create-post">create post</Link>
        <Box mr={2}>username</Box>
        {/* <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button> */}
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
