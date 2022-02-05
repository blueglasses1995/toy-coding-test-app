import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Page, Layout, TextField, Button, Frame, Banner, Toast } from "@shopify/polaris";
import store from 'store-js';

export default function index() {
  const [productName, setProductName] = useState("");
  const handleChange = useCallback((newProductName) => setProductName(newProductName), []);

  const UPDATE_PRODUCT_NAME = gql`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
      }
    }
  }`;

  return (
    <Page>
      <Layout>
        <TextField
          value={productName}
          onChange={handleChange}
          autoComplete="off"
          minLength={5}
        />
        <Mutation mutation={UPDATE_PRODUCT_NAME}>
          {(handleSubmit, {error, data}) => {
            const [hasResults, setHasResults] = useState(false);

            const showError = error && (
              <Banner status="critical">{error.message}</Banner>
            );

            const showToast = hasResults && (
              <Toast
                content="Successfully updated"
                onDismiss={() => setHasResults(false)}
              />
            );
            return (
              <Frame>
                <Button
                  onClick={() => handleSubmit({ variables: { input: {
                    id: "gid://shopify/Product/6732947423329",
                    title: productName
                  } }})}
                >
                  Update Product Name
                </Button>
              </Frame>
            );
          }}
        </Mutation>
      </Layout>
    </Page>
  );
}
