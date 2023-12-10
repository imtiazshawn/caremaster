import {
  Applicant,
  ReferenceForm,
  ReferenceFormItems,
  UpdateApplicant,
} from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { CreateReference } from "$types/reference";
import { removeUndefined } from "@/Utils";
import { getApplicationStatus } from "@/helper/apply";
import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H3, H6 } from "@common/Typography";
import { FlexBox } from "@common/index";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import {
  useCreateReferenceMutation,
  useGetReferencesQuery,
  useUpdateReferenceMutation,
} from "@reducers/api/reference";
import { useSendEmailMutation } from "@reducers/api/sendEmail";
import { COLORS } from "@shared/constants/colors";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  first_referrer_name: "",
  first_referrer_email: "",
  first_referer_phone: "",
  first_referrer_passport_size_photo: "",
  second_referrer_name: "",
  second_referrer_email: "",
  second_referer_phone: "",
  second_referrer_passport_size_photo: "",
};

export const Reference = ({
  data,
  isDataLoading,
  refetch,
  isUpdateLoading,
  submitApplication,
  nextUrl,
  showNextButton = false,
  showFinishButton = false,
  isAdmin = false,
}: {
  showFinishButton?: boolean;
  isAdmin?: boolean;
  showNextButton?: boolean;
} & ProfileSectionProps<
  Applicant,
  UpdateApplicant & {
    unique_id: string;
  }
> & { submitApplication?: () => Promise<void> }) => {
  const { control, setValue, reset, handleSubmit, watch, getValues } =
    useForm<ReferenceForm>({
      defaultValues: defaultValues,
      // resolver: yupResolver(personalDetailsSchema),
    });
  const navigate = useNavigate();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const { data: refData, refetch: refetchReference } = useGetReferencesQuery(
    data?.unique_id,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [firstRef, secondRef] = refData ?? [];

  useEffect(() => {
    reset({
      first_referrer_name: firstRef?.name,
      first_referrer_email: firstRef?.email,
      first_referrer_phone: firstRef?.telephone,
      first_referrer_company: firstRef?.company,
      first_referrer_job_title: firstRef?.job_title,
      first_referrer_address: firstRef?.address,
      second_referrer_name: secondRef?.name,
      second_referrer_email: secondRef?.email,
      second_referrer_phone: secondRef?.telephone,
      second_referrer_company: secondRef?.company,
      second_referrer_job_title: secondRef?.job_title,
      second_referrer_address: secondRef?.address,
    });
  }, [firstRef, secondRef, reset]);

  const [createReference] = useCreateReferenceMutation();
  const [updateReference] = useUpdateReferenceMutation();
  const [sendEmail] = useSendEmailMutation();
  useEffect(() => {
    if (data && data.reference) {
      const formData: any = {};
      const reference = data.reference;
      ReferenceFormItems.forEach((item) => {
        formData[item] = reference[item];
      });
      reset(formData);
    }
  }, [reset, data]);

  if (isDataLoading || !data) {
    return <></>;
  }

  const status = getApplicationStatus(
    data,
    questions?.map((item) => item.id.toString()),
  );
  const handleSendEmail = async (email: string, name: string, id: number) => {
    if (firstRef) {
      sendEmail({
        email: email,
        subject: "Reference Request",
        message: `We are writing to you to request a reference for ${data?.first_name} ${data?.surname}.\n\nPlease click on the link below to complete the reference.\n\nhttp://localhost:5173/care-worker/apply/reference-verification?uid=${id}\n\nThank you for your time.\n\nKind Regards,\n\nCareMaster Team`,
      }).then(async () => {
        await updateReference({
          id,
          name,
          is_email_sent: true,
          applicant: data.id,
        });
        refetchReference();
        ShowShortMessage("Email sent successfully");
      });
    }
  };

  const personalDetailsFormTemplate: FormTemplate<ReferenceForm>[] = [
    {
      type: "column",
      items: [
        {
          type: "custom",
          component: (
            <FlexBox
              sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <H3 sx={{ textDecoration: "underline" }}>First Referrer:</H3>
              {firstRef && firstRef.is_email_sent && (
                <H3
                  sx={{
                    color: COLORS.COMPLETED,
                    padding: "2px",
                    borderWidth: "1px",
                    borderColor: COLORS.COMPLETED,
                    borderRadius: "10px",
                    paddingX: "10px",
                  }}
                >
                  Email Sent
                </H3>
              )}
            </FlexBox>
          ),
        },
        {
          type: "custom",
          component: (
            <>
              {isAdmin && (
                <FlexBox
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant='contained'
                    onClick={() =>
                      handleSendEmail(
                        getValues("first_referrer_email"),
                        getValues("first_referrer_name"),
                        firstRef?.id,
                      )
                    }
                  >
                    Send
                  </Button>
                </FlexBox>
              )}
            </>
          ),
        },
      ],
    },
    {
      type: "custom",
      component:
        isAdmin && firstRef?.comment ? (
          <FlexBox
            sx={{
              width: "100%",
              // height: "6rem",
              borderWidth: "1px",
              borderColor: COLORS.COMPLETED,
              borderRadius: "10px",
              padding: "1rem",
              flexDirection: "column",
            }}
          >
            <H6>{`Reason for leaving: ${
              firstRef?.comment.reason_for_leaving ?? ""
            }`}</H6>
            <H6>{`Summary of Duties: ${
              firstRef?.comment.summary_of_duties ?? ""
            }`}</H6>
            <H6>{`Do you refer us this person: ${
              firstRef?.comment.doYouRefer ? "Yes" : "No"
            }`}</H6>
          </FlexBox>
        ) : (
          <></>
        ),
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Name",
          name: "first_referrer_name",
          required: true,
        },
        {
          type: "text",
          label: "Email",
          name: "first_referrer_email",
        },
        {
          type: "text",
          label: "Phone",
          name: "first_referrer_phone",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Company",
          name: "first_referrer_company",
        },
        {
          type: "text",
          label: "Job Title",
          name: "first_referrer_job_title",
        },
        {
          type: "text",
          label: "Address",
          name: "first_referrer_address",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "custom",
          component: (
            <FlexBox
              sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <H3 sx={{ textDecoration: "underline" }}>Second Referrer:</H3>
              {secondRef && secondRef.is_email_sent && (
                <H3
                  sx={{
                    color: COLORS.COMPLETED,
                    borderWidth: "1px",
                    padding: "2px",
                    borderColor: COLORS.COMPLETED,
                    borderRadius: "10px",
                    paddingX: "10px",
                  }}
                >
                  Email Sent
                </H3>
              )}
            </FlexBox>
          ),
        },
        {
          type: "custom",
          component: (
            <>
              {isAdmin && (
                <FlexBox
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant='contained'
                    onClick={() =>
                      handleSendEmail(
                        getValues("second_referrer_email"),
                        getValues("second_referrer_name"),
                        secondRef?.id,
                      )
                    }
                  >
                    Send
                  </Button>
                </FlexBox>
              )}
            </>
          ),
        },
      ],
    },
    {
      type: "custom",
      component:
        isAdmin && secondRef?.comment ? (
          <FlexBox
            sx={{
              width: "100%",
              // height: "6rem",
              borderWidth: "1px",
              borderColor: COLORS.COMPLETED,
              borderRadius: "10px",
              padding: "1rem",
              flexDirection: "column",
            }}
          >
            <H6>{`Reason for leaving: ${
              secondRef?.comment.reason_for_leaving ?? ""
            }`}</H6>
            <H6>{`Summary of Duties: ${
              secondRef?.comment.summary_of_duties ?? ""
            }`}</H6>
            <H6>{`Do you refer us this person: ${
              secondRef?.comment.doYouRefer ? "Yes" : "No"
            }`}</H6>
          </FlexBox>
        ) : (
          <></>
        ),
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Name",
          name: "second_referrer_name",
          required: true,
        },
        {
          type: "text",
          label: "Email",
          name: "second_referrer_email",
        },
        {
          type: "text",
          label: "Phone",
          name: "second_referrer_phone",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Company",
          name: "second_referrer_company",
        },
        {
          type: "text",
          label: "Job Title",
          name: "second_referrer_job_title",
        },
        {
          type: "text",
          label: "Address",
          name: "second_referrer_address",
        },
      ],
    },
    {
      type: "custom",
      component: <H3 sx={{ textDecoration: "underline" }}>Kin Details:</H3>,
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Surname",
          name: "next_of_kin_surname",
        },
        {
          type: "text",
          label: "Forename",
          name: "next_of_kin_forename",
        },
        {
          type: "text",
          label: "Title",
          name: "next_of_kin_title",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Relationship",
          name: "next_of_kin_relationship",
        },
        {
          type: "text",
          label: "Contact Number",
          name: "next_of_kin_phone",
        },
        {
          type: "text",
          label: "PostCode",
          name: "next_of_kin_postcode",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Address",
          name: "next_of_kin_address",
        },
        {
          type: "custom",
          component: <></>,
        },
        {
          type: "custom",
          component: <></>,
        },
      ],
    },
  ];

  const handleFormSubmit = async (values: ReferenceForm) => {
    const { firstReferrer, secondReferrer } = extractReferrer(values, data.id);
    if (firstRef) {
      await updateReference({
        id: firstRef.id,
        ...firstReferrer,
        is_email_sent: firstRef.is_email_sent,
      });
    } else {
      await createReference({ ...firstReferrer, is_email_sent: false });
    }
    if (secondRef) {
      await updateReference({
        id: secondRef.id,
        ...secondReferrer,
        is_email_sent: secondRef.is_email_sent,
      });
    } else {
      await createReference({ ...secondReferrer, is_email_sent: false });
    }
    refetchReference();
    refetch();
    ShowShortMessage("Reference updated successfully");
  };
  return (
    <div>
      <form
        className='p-4'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <SmartForm
          template={personalDetailsFormTemplate}
          control={control}
          watch={watch}
          setValue={setValue}
          labelPosition='top'
        />
        <FlexBox
          sx={{
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isUpdateLoading}
          >
            Save
          </LoadingButton>
          {showNextButton && (
            <Button
              type='submit'
              variant='contained'
              href={nextUrl}
            >
              Next
            </Button>
          )}
          {showFinishButton && (
            <Button
              // type='submit'
              variant='contained'
              disabled={!status || status.overall === "incomplete"}
              onClick={submitApplication ?? (() => navigate(nextUrl))}
            >
              Finish
            </Button>
          )}
        </FlexBox>
      </form>
    </div>
  );
};

const extractReferrer = (values: ReferenceForm, applicantId: number) => {
  const {
    first_referrer_address,
    first_referrer_company,
    first_referrer_email,
    first_referrer_name,
    first_referrer_job_title,
    first_referrer_phone,
    second_referrer_address,
    second_referrer_company,
    second_referrer_email,
    second_referrer_name,
    second_referrer_job_title,
    second_referrer_phone,
  } = values;

  const firstReferrer: CreateReference = removeUndefined({
    email: first_referrer_email,
    name: first_referrer_name,
    telephone: first_referrer_phone,
    company: first_referrer_company,
    job_title: first_referrer_job_title,
    address: first_referrer_address,
    applicant: applicantId,
  });

  const secondReferrer: CreateReference = removeUndefined({
    email: second_referrer_email,
    name: second_referrer_name,
    telephone: second_referrer_phone,
    company: second_referrer_company,
    job_title: second_referrer_job_title,
    address: second_referrer_address,
    applicant: applicantId,
  });

  return { firstReferrer, secondReferrer };
};
