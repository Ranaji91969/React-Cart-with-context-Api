import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import GridItem from "./GridItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProductGrid({ products }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={4}>
            <GridItem product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
