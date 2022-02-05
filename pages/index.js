import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Page, Layout, TextField, Button, Frame, Banner, Toast, DisplayText } from "@shopify/polaris";

export default function index() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [defaultProductName, setDefaultProductName] = useState("");
  const handleChange = useCallback((newProductName) => setProductName(newProductName), []);

  const GET_FIRST_PRODUCT = gql`
  query getProducts($first: Int) {
    products(first: $first) {
      edges {
        node {
          title
          id
        }
      }
    }
  }`;

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
      <Query query={GET_FIRST_PRODUCT} variables={{ first: 1 }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          setDefaultProductName(data.products.edges[0].node.title)
          setProductId(data.products.edges[0].node.id)
          // display nothing for query
          return null;
        }}
      </Query>
      <Layout>
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
                {showToast}
                <Layout.Section>
                  {showError}
                </Layout.Section>
                <TextField
                  value={productName}
                  placeholder={defaultProductName}
                  onChange={handleChange}
                  autoComplete="off"
                  minLength={5}
                />
                <Button
                  onClick={() => handleSubmit({ variables: { input: {
                    id: "gid://shopify/Product/" + productId,
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
