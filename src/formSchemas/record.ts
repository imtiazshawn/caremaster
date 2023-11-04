import * as yup from "yup";

const trimmer = (v: string) => v.trim();
export const recordSchema = yup.object().shape({
  name: yup.string().transform(trimmer).required("Name is required"),
  fields: yup.array().of(yup.mixed()),
});
