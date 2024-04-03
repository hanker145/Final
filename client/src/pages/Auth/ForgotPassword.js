import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import apiService from "../../app/apiService";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    newpassword: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        values
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something happened");
    }
  };

  const onChangeInput = (key, value) => {
    setValues({ ...values, [key]: value });
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">
        <h1>RESET PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              required
              onChange={(e) => onChangeInput("email", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Favortie Sport"
              required
              onChange={(e) => onChangeInput("answer", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              autoComplete="on"
              className="form-control"
              placeholder="Enter your New Password"
              required
              onChange={(e) => onChangeInput("newPassword", e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
