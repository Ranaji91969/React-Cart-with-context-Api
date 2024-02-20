import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import { useProductsWithLimit } from "../hooks/useProducts";

import ProductSuggestions from "../components/ProductSuggestions";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: theme.spacing(1),
  },
}));
export default function Home() {
  const classes = useStyles();
  const { response: products, loading } = useProductsWithLimit(5);
  if (loading) {
    return (
      <>
        <div className="banner"></div>
        <Loading text={"Fetching top products"} />
      </>
    );
  }
  return (
    <div>
      <div className="banner"></div>
      <Typography variant="h5" className={classes.title}>
        Top products
      </Typography>
      <Container maxWidth={false}>
        <ProductSuggestions products={products} />
      </Container>
    </div>
  );
}
