import React from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  return (
    <Paper square>
      <Tabs
        value={!location.state ? false : location.state.category}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="Menu"
      >
        <Tab
          label="men clothing"
          value="men clothing"
          component={Link}
          to={{ pathname: "/men's clothing", state: { category: "men's clothing" } }}
        />
        <Tab
          label="jewelery"
          value="jewelery"
          component={Link}
          to={{ pathname: "/jewelery", state: { category: "jewelery" } }}
        />
        <Tab
          label="electronics"
          value="electronics"
          component={Link}
          to={{ pathname: "/electronics", state: { category: "electronics" } }}
        />
        <Tab
          label="women clothing"
          value="women clothing"
          component={Link}
          to={{ pathname: "/women's clothing", state: { category: "women's clothing" } }}
        />
      </Tabs>
    </Paper>
  );
}
