import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        values
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated successfully");
      }
    } catch (error) {
      toast.error("Something happened");
    }
  };

  const onChangeInput = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    const { user } = auth;
    setValues(user);
  }, [auth]);

  console.log(auth);

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h1 className="title text-center">USER PROFILE</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    defaultValue={values?.name || ""}
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(e) => onChangeInput("name", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    defaultValue={values?.email || ""}
                    className="form-control"
                    placeholder="Enter your Email"
                    onChange={(e) => onChangeInput("email", e.target.value)}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    autoComplete="on"
                    className="form-control"
                    placeholder="Enter your Password"
                    onChange={(e) => onChangeInput("password", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    defaultValue={values?.phone || ""}
                    className="form-control"
                    placeholder="Enter your Phone"
                    onChange={(e) => onChangeInput("phone", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    defaultValue={values?.address || ""}
                    className="form-control"
                    placeholder="Enter your Address"
                    onChange={(e) => onChangeInput("address", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    defaultValue={values?.answer || ""}
                    className="form-control"
                    placeholder="What is Your Favorite Sport ?"
                    onChange={(e) => onChangeInput("answer", e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
