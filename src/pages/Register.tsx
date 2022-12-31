import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <h1>Register</h1>
      </Box>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                {/* <FormLabel>Username</FormLabel> */}
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
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

              {/* <FormErrorMessage>lol</FormErrorMessage> */}
              <Button
                mt={4}
                colorScheme="teal"
                // isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
