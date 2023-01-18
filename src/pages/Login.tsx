import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [, login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <Text fontSize="4xl" as="b">
          Login
        </Text>
      </Box>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login.user) {
            navigate(-1);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                <InputField
                  name="usernameOrEmail"
                  placeholder="username or email"
                  label="Username or Email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>

              <Flex mt={4} mr={2}>
                <Box ml={"auto"} color="grey" _hover={{ color: "teal.600" }}>
                  <Link to={"/register"}>
                    No account yet ? <strong>register here</strong>{" "}
                  </Link>
                </Box>
              </Flex>

              <Flex mt={4} mr={2}>
                <Box ml={"auto"} color="grey" _hover={{ color: "teal.600" }}>
                  <Link to={"/forgot-password"}>
                    Forget your <strong>password </strong>?
                  </Link>
                </Box>
              </Flex>

              <Flex align={"center"} justifyContent={"center"}>
                <Button
                  mt={4}
                  colorScheme="orange"
                  bg="#ff4500"
                  color="white"
                  borderRadius="full"
                  isLoading={isSubmitting}
                  type="submit"
                  size="lg"
                  height="48px"
                  width="200px"
                >
                  Login
                </Button>
              </Flex>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
