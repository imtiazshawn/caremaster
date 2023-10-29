import * as yup from "yup";

const trimmer = (v: string) => v.trim();
export const serviceUserSchema = yup.object().shape({
  name: yup.string().transform(trimmer).required("Name is required"),
});
