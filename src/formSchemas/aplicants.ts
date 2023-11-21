import * as yup from "yup";

const trimmer = (v: string) => v.trim();

export const aplicentSchema = yup.object().shape({
  first_name: yup.string().transform(trimmer).required("Name is required"),
  surname: yup.string().transform(trimmer).required("Name is required"),
  email: yup.string().email().required("Email is required"),
  postcode: yup.string().required("Post code is required"),
  address: yup.string().required("Address is required"),
});
