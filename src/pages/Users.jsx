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

const Users = () => {
  const formik = useFormik({
    initialValues: {
      Images: "",
      Name: "",
      Description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.Name);
      formData.append("description", values.Description);

      formData.append("Images", values.Images);
      try {
        await axios.post(Api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        GetData();
        handleClose();
        resetForm();
      } catch (error) {
        console.error(error);
      }
      console.log(values);
      // Here you can handle the form submission, e.g., send data to the server
    },
  });
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

      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeFile = (event) => {
    formik.setFieldValue("Images", event.target.files[0]);
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
          <form onSubmit={formik.handleSubmit} action="">
            <TextField
              value={formik.values.Name}
              onChange={formik.handleChange}
              variant="outlined"
              label="Name"
              name="Name"
            />
            <TextField
              value={formik.values.Description}
              onChange={formik.handleChange}
              variant="outlined"
              label="Description"
              name="Description"
            />
            <TextField
              onChange={handleChangeFile}
              type="file"
              variant="outlined"
              label="Image"
              name="Images"
            />
            <Button type="submit">Close Child Modal</Button>
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
                <h5>Description: {todo.description}</h5>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Users;
