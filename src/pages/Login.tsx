import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Flex, FormControl } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({ ...props }) => {
  const [, login] = useLoginMutation();
  const navigate = useNavigate();
  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <h1>Login</h1>
      </Box>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login.user) {
            navigate("/");
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

              <Flex mt={4}>
                <Box ml={"auto"}>
                  <Link to={"/forgot-password"}>forget your password ?</Link>
                </Box>
              </Flex>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
