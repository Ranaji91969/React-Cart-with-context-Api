import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Fab from "@mui/material/Fab";

import { useHistory } from "react-router-dom";

import CartContext from "../context/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: theme.spacing(2),
  },
  media: {
    height: 100,
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  title: {
    padding: theme.spacing(1),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    color: theme.palette.secondary.main,
    position: "relative",
    top: theme.spacing(2),
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartButton: {
    position: "relative",
    left: 204,
    bottom: 4,
  },
}));

export default function GridItem({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const cart = React.useContext(CartContext);
  const navigateUrl = `/${product.category}/${product.id}`;

  const addCart = (e) => {
    e.preventDefault();
    cart.addItem(product.id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={(e) => history.push(navigateUrl, { category: product.category })}>
        <img className={classes.media} src={product.image} title={product.title} alt={product.title} />
        <CardContent>
          <Typography className={classes.title} variant="subtitle1">
            {product.title}
          </Typography>
          <div className={classes.footer}>
            <Typography gutterBottom variant="h6" className={classes.price}>
              Rs. {product.price}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <Fab color="secondary" aria-label="cart" className={classes.cartButton}>
        <ShoppingCartIcon onClick={(e) => addCart(e)} />
      </Fab>
    </Card>
  );
}
