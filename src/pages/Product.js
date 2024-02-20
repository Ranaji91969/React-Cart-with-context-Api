import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Divider from "@mui/material/Divider";

import { useParams } from "react-router-dom";
import { useProduct, useProductsWithCategory } from "../hooks/useProducts";
import Loading from "../components/Loading";
import ProductSuggestions from "../components/ProductSuggestions";
import CardContext from "../context/cart";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  media: {
    height: "auto",
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  price: {
    color: theme.palette.secondary.dark,
  },
  condition: {
    fontSize: "8px",
  },
  title: {
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  releated: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: theme.spacing(1),
  },
}));
function useProductData(productId, category) {
  const { response: product, loading: productLoading } = useProduct(productId);
  const { response: products, loading: productsLoading } = useProductsWithCategory(category);

  return {
    product,
    products,
    loading: productsLoading || productLoading,
  };
}
export default function Product() {
  const { productId, category } = useParams();
  const { product, products, loading } = useProductData(productId, category);
  const classes = useStyles();
  const { addItem } = React.useContext(CardContext);
 
  if (loading) {
    return <Loading text={`Fetching your product`} />;
  }
  return (
    <Container maxWidth={false}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container>
          <Grid item xs={6}>
            <img className={classes.media} src={product.image} alt={product.name} />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" className={classes.title}>
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h6" className={classes.price}>
              Rs. {product.price} <span className={classes.condition}>(Incuding all taxes)</span>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => addItem(product.id)}
              className={classes.button}
              startIcon={<ShoppingCartIcon />}
            >
              Add to cart
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<FavoriteIcon />}
            >
              Add to wishlist
            </Button>
            
            <Divider variant="middle" className={classes.divider} />
            <Typography gutterBottom variant="h6" className={classes.title}>
              Product description
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" className={classes.releated}>
        Related products
      </Typography>
      <Container maxWidth={false}>
        <ProductSuggestions products={products.filter(({ id }) => id !== product.id)} />
      </Container>
    </Container>
  );
}
