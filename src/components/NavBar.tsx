import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import reddit from "../icon/reddit.png";
import { isServer } from "../utils/isServer";
import CategoryNavBar from "./CategoryNavBar";

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
        <Button
          colorScheme="blue"
          bg="#0079D3"
          color="white"
          borderRadius="full"
        >
          <Link to={"/login"} style={{ margin: "12px" }}>
            login
          </Link>
        </Button>
        <ColorModeSwitcher />
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Button mr={3}>
          <Link to="/create-post" style={{ margin: "8px" }}>
            create
          </Link>
        </Button>

        {/* <Box mr={3}>{data.me.username}</Box> */}

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
    <>
      <Flex
        zIndex={1}
        position="fixed"
        w={"100%"}
        top={0}
        bg={useColorModeValue("#F7FAFC", "gray.900")}
        style={{
          borderBottom: "1px solid lightgrey",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
        p={0}
      >
        <Box className="sidebar-container-desktop">
          <CategoryNavBar />
        </Box>
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
              <Heading fontSize={{ base: "12px", md: "40px", lg: "40px" }}>
                mini redd
                <span className="special">i</span>t
              </Heading>
            </Flex>
          </Link>

          <Box ml={"auto"}>{body}</Box>
        </Flex>
      </Flex>
    </>
  );
};
