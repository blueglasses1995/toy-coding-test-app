import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Page, Layout, TextField, Button } from "@shopify/polaris";
import store from 'store-js';
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

export default function index() {
  const [productName, setProductName] = useState("");
  const handleChange = useCallback((newProductName) => setProductName(newProductName), []);

  return (
    <Page>
      <Layout>
        <TextField
          value={productName}
          onChange={handleChange}
          autoComplete="off"
          minLength={5}
        />
        <Button
          onClick={() => console.log(productName)}
        >Update Product Name</Button>
      </Layout>
    </Page>
  );
}
