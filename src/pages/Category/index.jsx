import React from "react";
import Header from "../../components/Header";
import TableCategory from "../../components/TableCategory";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./style.module.scss";

const Category = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Link to="/form">
          <Button variant="contained">Add User</Button>
        </Link>
      </div>

      <TableCategory />
    </>
  );
};

export default Category;
