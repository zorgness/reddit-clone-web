import React from "react";
import { NextPage } from "next";
import { FormControl, Button, Box, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../../generated/graphql";
import { Link } from "react-router-dom";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ChangePassword: NextPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token as string;
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = React.useState("");
  return (
    <Wrapper variant={"small"}>
      <Box textAlign={["center"]}>
        <h1>Change Password</h1>
      </Box>

      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            navigate("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                <InputField
                  name="newPassword"
                  placeholder="newpassword"
                  label="New Password"
                  type="password"
                />
              </Box>

              {tokenError ? (
                <Flex>
                  <Box mr={2} style={{ color: "red" }}>
                    {tokenError}
                  </Box>

                  <Link to={"/forgot-password"}>forget your password ?</Link>
                </Flex>
              ) : null}

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Update Password
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
