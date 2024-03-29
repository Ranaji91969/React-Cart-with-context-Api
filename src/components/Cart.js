import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";

import CartContext from "../context/cart";
import { useSelectedProducts } from "../hooks/useProducts";

import Loading from "./Loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  button: {
    marginTop: theme.spacing(1),
  },
  buttonClear: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    float: "right",
  },
}));

function CartItem({ product }) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <img className={classes.media} src={product.image} alt={product.name} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography gutterBottom variant="h6">
          {product.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          $ {product.price}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          Quantity: {product.quantity}
        </Typography>
      </Grid>
    </Grid>
  );
}

function CartList({ products, cart, handleClose, clearAll }) {
  const classes = useStyles();
  const history = useHistory();
  if (products.length === 0)
    return (
      <Typography variant="h6">
        Your cart is empty!!! Start adding products{" "}
        <span role="img" description="aria-label">
          {" "}
          😀
        </span>
      </Typography>
    );
  const updatedProducts = products.map((product) => {
    const item = cart.find((item) => item.id === product.id);
    product.quantity = item.quantity;
    product.total = item.quantity * product.price;
    return product;
  });
  const total = updatedProducts.map((item) => item.total).reduce((prev, next) => prev + next);
  const checkout = () => {
    handleClose();
    history.push("/checkout");
  };
  const clearCart = () => {
    clearAll();
    handleClose();
  };
  return (
    <Container maxWidth="lg">
      <Typography color="secondary" variant="h6">
        ITEMS IN CART {updatedProducts.length}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} className={classes.paper}>
            {updatedProducts.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={classes.paper}>
            <Typography gutterBottom variant="subtitle1" color="primary">
              TOTAL: Rs. {total}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={checkout}
              className={classes.button}
              startIcon={<CheckIcon />}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              onClick={clearCart}
              className={classes.buttonClear}
              startIcon={<ClearAllIcon />}
            >
              Clear All
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Cart({ open, handleClose }) {
  const classes = useStyles();
  const { cart, clearAll } = React.useContext(CartContext);
  const { response: products, loading } = useSelectedProducts(cart);
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      {loading ? (
        <Loading text={"Loading your cart"} />
      ) : (
        <CartList products={products} cart={cart} clearAll={clearAll} handleClose={handleClose} />
      )}
    </Dialog>
  );
}
