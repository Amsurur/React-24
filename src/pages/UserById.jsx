import axios from "axios";
import React, { useEffect, useState } from "react";
import { Api, ImageApi } from "../config/api";
import { useParams } from "react-router-dom";

const UserById = () => {
  const [data, setData] = useState(null);
  const { id } = useParams(); // Assuming you are using useParams to get the user ID from the URL
  const GetData = async () => {
    try {
      const { data } = await axios.get(`${Api}/${id}`); // Fetching user data by ID
      console.log(data);

      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    data && (
      <div>
        <div
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
          key={data.id}
        >
          <h1>Name: {data.name}</h1>
          <h5>Description: {data.description}</h5>
          {data.images.map((image) => {
            return (
              <img
                src={`${ImageApi}/${image.imageName}`}
                alt="User"
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default UserById;
