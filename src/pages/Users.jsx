import axios from "axios";
import React, { useEffect, useState } from "react";
import { Api } from "../config/api";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

// Add this before the component
const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  Description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
  Images: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});
const Users = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState(null);
  const GetData = async () => {
    try {
      const { data } = await axios.get(Api);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const { t, i18n } = useTranslation();

  // const handleChangeFile = (e) => {
  //   formik.setFieldValue("Images", e.currentTarget.files[0]);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post(Api, data);
      GetData();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div>
      <button onClick={handleOpen}>Add Modal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                required: "name is Requared",
              })}
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}
            <input
              type="text"
              {...register("desc", {
                minLength: 5,
                required: "Desc is Requared",
              })}
            />
            {errors.desc && (
              <span style={{ color: "red" }}>{errors.desc.message}</span>
            )}
            <button type="submit">Add</button>
          </form>
        </Box>
      </Modal>
      {data &&
        data.map((todo) => {
          return (
            <Link to={`user/${todo.id}`}>
              <div
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                key={todo.id}
              >
                <h1>Name: {todo.name}</h1>
                <h5>Description: {todo.desc}</h5>
                <h1>{todo.status ? t("Completed") : t("NotCompleted")}</h1>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Users;
