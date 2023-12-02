import { Applicant, CreateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { Layout } from "@/v2/components/Layout";
import { StaffsRightBar } from "@/v2/components/rightbars/StaffsRightBar";
import { useStaffAppliedNavLinkProps } from "@/v2/hooks/useStaffNavLinkProps";
import { Button } from "@common/Button";
import { FlexBox } from "@common/index";
import { EducationHistory } from "@components/apply/EducationHistory";
import { EmploymentHistory } from "@components/apply/EmploymentHistory";
import { PersonalDetails } from "@components/apply/PersonalDetails";
import { Questionnaire } from "@components/apply/Questionnaire";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useApplicantId } from "@redux/hooks/useApplicantId";
import { Route, Routes } from "react-router-dom";

export const AppliedProfile = () => {
  const navbarProps = useStaffAppliedNavLinkProps();
  const uid = useApplicantId();

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
    <Layout
      sidebarProps={navbarProps}
      rightBar={StaffsRightBar}
    >
      <div className='m-8 rounded-sm p-4'>
        <FlexBox
          sx={{
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            height: "3.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <Button
            sx={{ width: "50%" }}
            variant='contained'
          >
            Send Video Meeting Request
          </Button>
          <Button
            sx={{ width: "50%" }}
            variant='contained'
          >
            Send to Screening
          </Button>
        </FlexBox>
        <Routes>
          <Route
            path='/'
            element={
              <PersonalDetails
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/questionnaire`}
              />
            }
          />
          <Route
            path='/personal-details'
            element={
              <PersonalDetails
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/questionnaire`}
              />
            }
          />
          <Route
            path='/questionnaire'
            element={
              <Questionnaire
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/employment-history`}
              />
            }
          />
          <Route
            path='/employment-history'
            element={
              <EmploymentHistory
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/education-history`}
              />
            }
          />
          <Route
            path='/education-history'
            element={
              <EducationHistory
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/documents`}
              />
            }
          />
          {/* <Route
            path='/documents'
            element={<Documents id={id} />}
          />
          <Route
            path='/reference'
            element={<Reference id={id} />}
          /> */}
          {/* <R  */}
        </Routes>
      </div>
    </Layout>
  );
};
