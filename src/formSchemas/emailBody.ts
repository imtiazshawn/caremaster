import * as yup from "yup";

const trimmer = (v: string) => v.trim();

export const emailBodySchema = yup.object().shape({
  subject: yup.string().transform(trimmer).required("Subject is required"),
  message: yup.string().transform(trimmer).required("Message required"),
});
