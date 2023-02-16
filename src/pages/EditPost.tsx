import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout/Layout";
import { SelectField } from "../components/SelectField";
import { TextField } from "../components/TextField";
import { usePostQuery, useUpdatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const intId = parseInt(params.id as string);
  const [{ data, fetching }] = usePostQuery({
    // skip: intId === -1,
    variables: {
      _id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  const [selectedOption, setSelectedOption] = React.useState(
    data?.post?.categoryId
  );

  const handleChange = (e: any) => {
    setSelectedOption(e.currentTarget.value);
  };
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: data.post.title,
          text: data.post.text,
          categoryId: data?.post?.categoryId,
        }}
        onSubmit={async (values) => {
          console.log(values);
          await updatePost({
            _id: intId,
            title: values.title,
            text: values.text,
            categoryId: values.categoryId,
          });
          navigate(-1);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <TextField name="text" placeholder="text..." label="Body" />
            </Box>

            {/* <Box mt={4}>
              <SelectField
                value={selectedOption}
                onChange={handleChange}
              />
            </Box> */}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditPost);
