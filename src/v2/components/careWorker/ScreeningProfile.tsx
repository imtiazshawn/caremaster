import { Applicant, CreateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { Layout } from "@/v2/components/Layout";
import { StaffsRightBar } from "@/v2/components/rightbars/StaffsRightBar";
import { useStaffScreeningNavLinkProps } from "@/v2/hooks/useStaffNavLinkProps";
import { Button } from "@common/Button";
import { FlexBox } from "@common/index";
import { DBS } from "@components/apply/DBS";
import { EducationHistory } from "@components/apply/EducationHistory";
import { EmploymentHistory } from "@components/apply/EmploymentHistory";
import { EqualMonitoring } from "@components/apply/EqualMonitoring";
import { PersonalDetails } from "@components/apply/PersonalDetails";
import { Questionnaire } from "@components/apply/Questionnaire";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useScreeningId } from "@redux/hooks/useScreeningId";
import { useScreening } from "@shared/hooks/useScreening";

import { Route, Routes } from "react-router-dom";

export const ScreeningProfile = () => {
  const navbarProps = useStaffScreeningNavLinkProps();
  const { refetch: refetchScreeningData, screening } = useScreening();
  const uid = useScreeningId();

  const {
    isLoading: isDataLoading,
    data,
    refetch: refetchApplicantData,
  } = useGetApplicantQuery(screening?.applicant?.unique_id as string, {
    refetchOnMountOrArgChange: true,
  });

  const refetch = async () => {
    await refetchApplicantData();
    await refetchScreeningData();
  };
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
            Assign Training
          </Button>
          <Button
            sx={{ width: "50%" }}
            variant='contained'
          >
            Confirm Applicant
          </Button>
        </FlexBox>
        <Routes>
          <Route
            path='/'
            element={
              <PersonalDetails
                {...childProps}
                nextUrl={`/v2/staff/screening/${uid}/questionnaire`}
              />
            }
          />
          <Route
            path='/personal-details'
            element={
              // <>HELLO</>
              <PersonalDetails
                {...childProps}
                nextUrl={`/v2/staff/screening/${uid}/questionnaire`}
              />
            }
          />
          <Route
            path='/questionnaire'
            element={
              <Questionnaire
                {...childProps}
                nextUrl={`/v2/staff/screening/${uid}/employment-history`}
              />
            }
          />
          <Route
            path='/employment-history'
            element={
              <EmploymentHistory
                {...childProps}
                nextUrl={`/v2/staff/screening/${uid}/education-history`}
              />
            }
          />
          <Route
            path='/education-history'
            element={
              <EducationHistory
                {...childProps}
                nextUrl={`/v2/staff/screening/${uid}/documents`}
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
    </Layout>
  );
};
