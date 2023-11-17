import * as yup from "yup";

const trimmer = (v: string) => v.trim();
export const carePlanSchema = yup.object().shape({
  title: yup
    .string()
    .transform(trimmer)
    .required("Title is required")
    .min(2, "Minimum 2 length required"),
  category_name: yup.string().transform(trimmer).required("Title is required"),
  service_user: yup.number().required("Title is required"),
  category: yup.number().required(""),
});
