import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../shared/formik/FormikControl";
import { LOGIN } from "../services/apiEndpoints";
import publicRequest from "../services/publicRequest";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const res = await publicRequest.post(LOGIN, values);
      //console.log('res', res.data.userDetail.data.UserId)
      const combined = `${values.username}:${values.password}`;
      // console.log('combined', combined)
      // Base64 encode the combined string
      const base64Encoded = btoa(combined);
      localStorage.setItem("UserId", res.data.userDetail.data.UserId);
      localStorage.setItem("token", base64Encoded);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Error occured in login");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              {setLoader(formik.isSubmitting)}
              <Box sx={{ mt: 1 }}>
                <FormikControl
                  control="input"
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                />
                <FormikControl
                  control="input"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={!formik.isValid}
                >
                  {loader ? (
                    <>
                      <CircularProgress size={20} color="secondary" sx={{ mr: 1 }} />
                      Signing In
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
