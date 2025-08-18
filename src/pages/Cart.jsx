import React, { useEffect, useState } from "react";
import { API } from "../utils/config";

const Cart = () => {
  const [data, setData] = useState();

  async function getCart() {
    try {
      const { data } = await API.get("UserProfile/get-user-profiles");
      setData(data.data);
      console.log(data);
    } catch (error) {}
  }
  useEffect((e) => {
    getCart();
  }, []);
  return (
    <div>
      {data?.map((e) => {
        return <div>FirstName: {e.firstName}adad</div>;
      })}
    </div>
  );
};

export default Cart;
