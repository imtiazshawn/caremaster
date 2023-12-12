import { Applicant, UpdateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { DBS } from "@components/apply/DBS";
import { Documents } from "@components/apply/Documents";
import { EducationHistory } from "@components/apply/EducationHistory";
import { EmploymentHistory } from "@components/apply/EmploymentHistory";
import { EqualMonitoring } from "@components/apply/EqualMonitoring";
import { Introduction } from "@components/apply/Introduction";
import { PersonalDetails } from "@components/apply/PersonalDetails";
import { Questionnaire } from "@components/apply/Questionnaire";
import { Reference } from "@components/apply/Reference";
import { Training } from "@components/apply/Training";
import { ApplicationScreeningLayout } from "@components/layout/ApplicantScreeningLayout";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { Route, Routes, useSearchParams } from "react-router-dom";

const introDescription = `
        Welcome to the Care Master family! Please complete your screening process.
`;

export const ApplicantScreening = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const {
    isLoading: isDataLoading,
    data,
    refetch,
  } = useGetApplicantQuery(uid as string, {
    refetchOnMountOrArgChange: true,
  });
  const [updateApplicant, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();

  if (!data) {
    return <></>;
  }

  const childProps: Omit<
    ProfileSectionProps<Applicant, UpdateApplicant & { unique_id: string }>,
    "nextUrl"
  > = {
    data,
    isDataLoading,
    update: updateApplicant,
    isUpdateLoading,
    refetch,
  };
  return (
    <ApplicationScreeningLayout>
      <div className='m-8 rounded-sm p-4'>
        <Routes>
          <Route
            path='/'
            element={
              <Introduction
                nextUrl={`/care-worker/screening/personal-details?uid=${uid}`}
                description={introDescription}
              />
            }
          />
          <Route
            path='/introduction'
            element={
              <Introduction
                nextUrl={`/care-worker/screening/personal-details?uid=${uid}`}
                description={introDescription}
              />
            }
          />
          <Route
            path='/personal-details'
            element={
              <PersonalDetails
                {...childProps}
                nextUrl={`/care-worker/screening/questionnaire?uid=${uid}`}
              />
            }
          />
          <Route
            path='/questionnaire'
            element={
              <Questionnaire
                {...childProps}
                nextUrl={`/care-worker/screening/employment-history?uid=${uid}`}
              />
            }
          />
          <Route
            path='/employment-history'
            element={
              <EmploymentHistory
                {...childProps}
                nextUrl={`/care-worker/screening/education-history?uid=${uid}`}
              />
            }
          />
          <Route
            path='/education-history'
            element={
              <EducationHistory
                {...childProps}
                nextUrl={`/care-worker/screening/documents?uid=${uid}`}
              />
            }
          />
          <Route
            path='/documents'
            element={
              <Documents
                {...childProps}
                nextUrl={`/care-worker/screening/reference?uid=${uid}`}
              />
            }
          />
          <Route
            path='/reference'
            element={
              <Reference
                {...childProps}
                showNextButton
                nextUrl={`/care-worker/screening/dbs?uid=${uid}`}
                // nextUrl={`/care-worker/screening/equal-monitoring?uid=${uid}`}
              />
            }
          />
          <Route
            path='/equal-monitoring'
            element={<EqualMonitoring />}
          />
          <Route
            path='/dbs'
            element={
              <DBS
                {...childProps}
                nextUrl='care-worker/apply/training'
              />
            }
          />
          <Route
            path='/training'
            element={
              <Training
                {...childProps}
                showFinishButton
                nextUrl='care-worker/apply/finished'
              />
            }
          />
        </Routes>
      </div>
    </ApplicationScreeningLayout>
  );
};
