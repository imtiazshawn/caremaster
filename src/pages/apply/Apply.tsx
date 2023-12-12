import { Applicant, UpdateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
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

const introDescription = `
        Welcome to the Care Master family! We're excited that you're
          interested in joining our team as a care worker. Your dedication to
          making a positive impact on the lives of others is commendable. Please
          take a moment to share your qualifications and experiences with us.
          Let's work together to create a nurturing and supportive community for
          those in need.
`;

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
    <ApplicationLayout>
      <div className='m-8 rounded-sm p-4'>
        <Routes>
          <Route
            path='/'
            element={
              <Introduction
                nextUrl={`/care-worker/apply/questionnaire?uid=${uid}`}
                description={introDescription}
              />
            }
          />
          <Route
            path='/introduction'
            element={
              <Introduction
                nextUrl={`/care-worker/apply/questionnaire?uid=${uid}`}
                description={introDescription}
              />
            }
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
          <Route
            path='/documents'
            element={
              <Documents
                {...childProps}
                nextUrl={`/care-worker/apply/reference?uid=${uid}`}
              />
            }
          />
          <Route
            path='/reference'
            element={
              <Reference
                {...childProps}
                showFinishButton={true}
                nextUrl='/care-worker/apply/finished'
              />
            }
          />
          <Route
            path='/equal-monitoring'
            element={<EqualMonitoring />}
          />
          {/* <Route
            path='/dbs'
            element={<DBS />}
          /> */}
        </Routes>
      </div>
    </ApplicationLayout>
  );
};
