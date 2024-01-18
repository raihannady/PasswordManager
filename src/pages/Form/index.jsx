// import React from "react";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { callAPI } from "../../domain/api";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    provider: "",
    email: "",
    password: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await callAPI("/password", "POST", {}, {}, formData);
      console.log("berhasil");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <Header />

      <div className={classes.container}>
        <div>
          <div>
            <h1>Input User</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": { mb: 3, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-basic"
                  label="Provider"
                  type="text"
                  variant="outlined"
                  name="provider" // Add name attribute
                  value={formData.provider}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <TextField
                  required
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email" // Add name attribute
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <TextField
                  required
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password" // Add name attribute
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <Box>
                <FormControl sx={{ minWidth: "40ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, minWidth: "41.2ch" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
