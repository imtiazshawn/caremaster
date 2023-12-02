import { Applicant, CreateApplicant } from "$types/applicants";
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
import { ApplicationLayout } from "@components/layout/ApplicationLayout";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { Route, Routes, useSearchParams } from "react-router-dom";

export const Apply = () => {
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
    ProfileSectionProps<Applicant, CreateApplicant & { unique_id: string }>,
    "nextUrl"
  > = {
    data,
    isDataLoading,
    update: updateApplicant,
    isUpdateLoading,
    refetch,
  };
  return (
    <ApplicationLayout>
      <div className='m-8 rounded-sm p-4'>
        <Routes>
          <Route
            path='/'
            element={<Introduction />}
          />
          <Route
            path='/introduction'
            element={<Introduction />}
          />
          <Route
            path='/personal-details'
            element={
              <PersonalDetails
                {...childProps}
                nextUrl={`/care-worker/apply/questionnaire?uid=${uid}`}
              />
            }
          />
          <Route
            path='/questionnaire'
            element={
              <Questionnaire
                {...childProps}
                nextUrl={`/care-worker/apply/employment-history?uid=${uid}`}
              />
            }
          />
          <Route
            path='/employment-history'
            element={
              <EmploymentHistory
                {...childProps}
                nextUrl={`/care-worker/apply/education-history?uid=${uid}`}
              />
            }
          />
          <Route
            path='/education-history'
            element={
              <EducationHistory
                {...childProps}
                nextUrl={`/care-worker/apply/documents?uid=${uid}`}
              />
            }
          />

          {/* TODO: We have to pass props to the following components */}
          <Route
            path='/documents'
            element={<Documents />}
          />
          <Route
            path='/reference'
            element={<Reference />}
          />
          <Route
            path='/equal-monitoring'
            element={<EqualMonitoring />}
          />
          <Route
            path='/dbs'
            element={<DBS />}
          />
        </Routes>
      </div>
    </ApplicationLayout>
  );
};
