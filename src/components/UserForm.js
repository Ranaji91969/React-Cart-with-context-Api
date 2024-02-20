import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
export default function UserForm({ state, handleChange }) {
  const { firstName, lastName, email } = state;
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            id="firstName"
            value={firstName}
            variant="outlined"
            size="small"
            onChange={(e) => handleChange({ name: "firstName", value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            id="lastName"
            value={lastName}
            variant="outlined"
            size="small"
            onChange={(e) => handleChange({ name: "lastName", value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            id="email"
            value={email}
            variant="outlined"
            size="small"
            onChange={(e) => handleChange({ name: "email", value: e.target.value })}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
