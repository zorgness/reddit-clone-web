import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, FormControl, Flex, Text } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [, register] = useRegisterMutation();
  const navigate = useNavigate();
  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <Text fontSize="4xl" as="b">
          Register
        </Text>
      </Box>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.data?.register.user) {
            navigate("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
              </Box>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>

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
                  Register
                </Button>
              </Flex>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
