import { Applicant, UpdateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { Layout } from "@/v2/components/Layout";
import useModalHook from "@/v2/components/careWorker/useModalHook";
import { AppliedProfileRightBar } from "@/v2/components/rightbars/AppliedProfileRightBar";
import { useStaffAppliedNavLinkProps } from "@/v2/hooks/useStaffNavLinkProps";
import { Button } from "@common/Button";
import ShowShortMessage from "@common/ShortMessage";
import { FlexBox } from "@common/index";
import { Documents } from "@components/apply/Documents";
import { EducationHistory } from "@components/apply/EducationHistory";
import { EmploymentHistory } from "@components/apply/EmploymentHistory";
import { PersonalDetails } from "@components/apply/PersonalDetails";
import { Questionnaire } from "@components/apply/Questionnaire";
import { Reference } from "@components/apply/Reference";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import SendMeetingReqModal from "@components/modals/SendMeetingReqModal";
import { useAcceptApplicantMutation } from "@reducers/api/acceptApplicant";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useApplicantId } from "@redux/hooks/useApplicantId";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

export const AppliedProfile = () => {
  const modalHook = useModalHook();
  const navbarProps = useStaffAppliedNavLinkProps(() =>
    modalHook.setIsModalOpen(true),
  );
  const [isSendMeetingReqModalOpen, setIsSendMeetingReqModalOpen] =
    useState<boolean>(false);
  const uid = useApplicantId();
  const [acceptApplicant] = useAcceptApplicantMutation();
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

  const changeApplicantStatus = (value: boolean) => {
    const applicant = data;
    acceptApplicant({ unique_id: applicant.unique_id }).then(() => {
      updateApplicant({
        unique_id: applicant.unique_id,
        application_status: JSON.stringify({
          ...applicant.application_status,
          is_application_accepted: value,
        }) as any,
      }).then(() => {
        ShowShortMessage(
          value
            ? `Applicant has been sent to screening`
            : `Applicant has been rejected`,
        );
        refetch();
      });
    });
    modalHook.setIsModalOpen(false);
  };

  return (
    <Layout
      sidebarProps={navbarProps}
      rightBar={AppliedProfileRightBar}
    >
      <SendMeetingReqModal
        email={data.email}
        isOpen={isSendMeetingReqModalOpen}
        onClose={() => setIsSendMeetingReqModalOpen(false)}
      />
      <ConfirmationDialog
        title='Please confirm'
        description='Are you sure you want to send to screening?'
        isOpen={modalHook.isModalOpen}
        onOk={() => {
          changeApplicantStatus(true);
        }}
        onCancel={() => {
          modalHook.setIsModalOpen(false);
        }}
      />
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
            onClick={() => {
              setIsSendMeetingReqModalOpen(true);
            }}
          >
            Send Video Meeting Request
          </Button>
          <Button
            sx={{ width: "50%" }}
            variant='contained'
            onClick={() => {
              modalHook.setIsModalOpen(true);
            }}
          >
            {data.application_status?.is_application_accepted
              ? "Send to Screening Again"
              : "Send to Screening"}
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
          <Route
            path='/documents'
            element={
              <Documents
                {...childProps}
                nextUrl={`/v2/staff/applied/${uid}/documents`}
              />
            }
          />
          <Route
            path='/reference'
            element={
              <Reference
                {...childProps}
                isAdmin
                nextUrl={`/v2/staff/applied/${uid}/documents`}
              />
            }
          />
        </Routes>
      </div>
    </Layout>
  );
};
