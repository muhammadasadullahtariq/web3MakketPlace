import {
  Paper,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { useState, useEffect } from "react";

export const InputForm = (props) => {
  useEffect(() => {}, []);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 20,
        }}
      />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 700,
          margin: "auto",
        }}
      >
        {props.products.length > 0 ? <h1>Products</h1> : <h1>No Products</h1>}
        <Paper
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {props.products.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 20 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.products.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{product.name.toString()}</TableCell>
                      <TableCell align="right">
                        {product.price.toString()}
                      </TableCell>
                      <TableCell align="right">
                        {product.owner.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Paper>
    </Box>
  );
};
