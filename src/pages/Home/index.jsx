import React from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./style.module.scss";

const Home = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Link to="/form">
          <Button variant="contained">Add User</Button>
        </Link>
      </div>

      <Table />
    </>
  );
};

export default Home;
