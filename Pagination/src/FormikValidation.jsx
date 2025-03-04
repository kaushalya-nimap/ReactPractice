import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});



const FormWithYup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  console.log('errors', errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input type="text" {...register("name")} />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      <br />

      <label>Email:</label>
      <input type="email" {...register("email")} />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      <br />

      <label>Password:</label>
      <input type="password" {...register("password")} />
      {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithYup;
