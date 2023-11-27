import { Applicant } from "$types/applicants";
import { CreateCareWorker } from "$types/careWorkers";
import { getRandomGeneratedPassword } from "@/helper/password";

export const getCareWorkerData = (applicant: Applicant): CreateCareWorker => {
  return {
    name: applicant.first_name,
    email: applicant.email,
    phone: applicant.phone,
    password: getRandomGeneratedPassword(),
  };
};
