import * as yup from "yup";

const trimmer = (v: string) => v.trim();

export const personalDetailsSchema = yup.object().shape({
  unique_id: yup.string().required("unique_id is required"),
  title: yup.string().transform(trimmer).required("Title is required"),
  first_name: yup.string().transform(trimmer).required("Name is required"),
  middle_name: yup.string(),
  surname: yup.string().transform(trimmer).required("Surname is required"),
  email: yup.string().email().required("Email is required"),
  postcode: yup.string().required("Post code is required"),
  address: yup.string().transform(trimmer).required("Address is required"),
  telephone: yup.string().transform(trimmer).required("Telephone is required"),
  phone: yup.string().transform(trimmer).required("phone number is required"),
  date_of_birth: yup.date().required("Date of Birth is required"),
  nationality: yup.string().required("nationality is required"),
  ni_number: yup.string().required("NI number is required"),
  passport_number: yup.string().required("Passport number is required"),
  passport_expiry_date: yup.date().required("Passport expiry date is required"),
  has_driving_license: yup.boolean().required("Driving license is required"),
  has_convictions_endorsements: yup
    .boolean()
    .required("Convictions endorsements is required"),
  is_disabled_person: yup.boolean().required("Disabled person is required"),
  has_employed_family_member: yup
    .boolean()
    .required("Employed family member is required"),
  pin: yup.string(),
  expiry_date: yup.date(),
});
