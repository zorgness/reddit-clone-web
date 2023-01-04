import { Box, Button, FormControl } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout/Layout";
import { TextField } from "../components/TextField";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/createUrqlClient";

const CreatePost: React.FC<{}> = () => {
  const navigate = useNavigate();

  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Box textAlign={["center"]}>
        <h1>Create Post</h1>
      </Box>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const response = await createPost({ input: values });
          console.log(response);
          if (response.error === undefined) {
            navigate("/");
          }
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
