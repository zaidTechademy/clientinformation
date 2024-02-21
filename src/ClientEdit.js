import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Box } from "@mui/material";
import "./ClientEdit.css";

const ClientEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(`http://localhost:3004/clients/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const validationSchema = Yup.object().shape({
    companyname: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
      .required("Company Name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyname: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.put(`http://localhost:3004/clients/${id}`, values);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item>
        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <Box style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                id="name"
                name="companyname"
                label="Name"
                variant="outlined"
                value={formik.values.companyname}
                onChange={formik.handleChange}
                error={formik.errors.companyname && formik.touched.companyname}
                helperText={formik.touched.companyname && formik.errors.companyname}
              />
            </Box>
            <Box style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone && formik.touched.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              className="update-btn"
            >
              Update
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                className="cancel-btn"
              >
                Cancel
              </Button>
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default ClientEdit;
