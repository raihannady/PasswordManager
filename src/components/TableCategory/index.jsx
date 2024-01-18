import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { callAPI } from "../../domain/api";
import classes from "./style.module.scss";
import { Link, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 3,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function BasicTable() {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      const response = await callAPI(`/password/?category=${category}`, "GET");
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Website</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data.provider}
                    </TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>
                      {data.category.charAt(0).toUpperCase() +
                        data.category.slice(1)}
                    </TableCell>
                    <TableCell className={classes.action}>
                      <Link to={`/detail/${data.id}`}>
                        <Button variant="contained">Detail</Button>
                      </Link>
                      <div>
                        <Button
                          className={classes.deleteButton}
                          onClick={handleOpen}
                        >
                          Delete
                        </Button>
                        <Modal
                          BackdropProps={{
                            style: {
                              backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the color and opacity as needed
                            },
                          }}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{ ...style, width: 400 }}>
                            <h2 id="parent-modal-title">Delete</h2>
                            <p id="parent-modal-description">
                              Are you sure want to delete this account?
                            </p>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                              onClick={() => {
                                callAPI(`/password/${data.id}`, "DELETE"),
                                  window.location.reload();
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Modal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
