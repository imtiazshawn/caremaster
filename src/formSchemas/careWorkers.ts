import * as yup from "yup";

const phoneRegExp = // eslint-disable-next-line
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

const trimmer = (v: string) => v.trim();
export const careWorkerSchema = yup.object().shape({
  name: yup.string().transform(trimmer).required("Name is required"),
  // email: yup.string().email().required("Email is required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
