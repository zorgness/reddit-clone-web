import React from "react";
import { NextPage } from "next";
import { FormControl, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useParams } from "react-router-dom";

const ChangePassword: NextPage<{ token: string }> = () => {
  const params = useParams();
  console.log(params.token);
  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <h1>Change Password</h1>
      </Box>

      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={() => console.log(params.token)}
        // onSubmit={async (values, { setErrors }) => {
        //   // const response = await login(values);
        //   // if (response.data?.login.errors) {
        //   //   setErrors(toErrorMap(response.data?.login.errors));
        //   // } else if (response.data?.login.user) {
        //   //   // navigate("/");
        //   // }
        // }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>

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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
