import React from "react";
import { FormControl, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { TextField } from "../components/TextField";

export const CreatePost: React.FC<{}> = () => {
  return (
    <Wrapper variant="small">
      <Box textAlign={["center"]}>
        <h1>Create Post</h1>
      </Box>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data?.login.errors));
          // } else if (response.data?.login.user) {
          //   navigate("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <Box mt={4}>
                <InputField name="title" placeholder="title" label="Title" />
              </Box>
              <Box mt={4}>
                <TextField name="text" placeholder="text..." label="Text" />
              </Box>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
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
