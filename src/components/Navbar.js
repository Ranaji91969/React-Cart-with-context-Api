import React from 'react'; 
import { useContext } from 'react';

import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import CartContext from "../context/cart";
import WishlistContext from "../context/wishlistContext";

import Cart from "./Cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
}));

export default function Navbar() {
  
  const classes = useStyles();
  const { cart } = React.useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const wishlistLength = wishlist.length;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.logo} to="/">
              Deftsoft Mall(Factory Outlet)
            </Link>
          </Typography>
          <div>
            <IconButton
              aria-label="wishlist"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClickOpen}
            >
              <Badge badgeContent={wishlistLength} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClickOpen}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {open && <Cart open={open} handleClose={handleClose} />}
    </div>
  );
}
