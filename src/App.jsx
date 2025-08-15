import {
  useAddImageMutation,
  useAddTodoMutation,
  useDeleteImageMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useGetTodoQuery,
} from "./api/TodoApi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React, { useState } from "react";

const App = () => {
  const [idX, setIdX] = useState(null);
  const { data, refetch, isLoading } = useGetTodoQuery();
  const [deleteImage] = useDeleteImageMutation();
  const [addImage] = useAddImageMutation();
  const { data: dataById } = useGetTodoByIdQuery(idX, { skip: !idX });
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSubmit = (e) => {

  }

  const list = (anchor) => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h1>{dataById?.data?.name}</h1>
      <h1>{dataById?.data?.description}</h1>
      {dataById?.data?.images.map((e) => {
        return (
          <div>
            <img
              width={100}
              src={`http://37.27.29.18:8001/images/${e.imageName}`}
              alt=""
            />
            <button onClick={() => deleteImage(e.id)}>delete</button>
          </div>
        );
      })}
    </Box>
  );
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  function handelSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Name", e.target["name"].value);
    formData.append("Description", e.target["desc"].value);
    formData.append("Images", e.target["images"].files[0]);
    addTodo(formData);
    e.target.reset();
  }
  return (
    <div>
      <form onSubmit={handelSubmit} action="">
        <input placeholder="Name" name="name" type="text" />
        <input placeholder="Desc" name="desc" type="text" />
        <input placeholder="Images" name="images" type="file" />
        <button type="submit">submit</button>
      </form>
      {data?.data?.map((e) => {
        return (
          <div>
            <h1>Name: {e.name}</h1>
            <h1>Desc: {e.description}</h1>
            {e.images.map((e) => {
              return (
                <img
                  src={`http://37.27.29.18:8001/images/${e.imageName}`}
                  alt=""
                />
              );
            })}
            <button onClick={() => deleteTodo(e.id)}>delete</button>
            <div>
              <React.Fragment key={"right"}>
                <Box onClick={() => setIdX(e.id)}>
                  <Button onClick={toggleDrawer("right", true)}>Info</Button>
                </Box>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
