import React from "react";
import { useForm } from "react-hook-form";

const NotFound = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("name")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("desc", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.desc && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default NotFound;
