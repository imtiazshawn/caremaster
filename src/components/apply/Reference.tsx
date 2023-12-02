import { ReferenceForm, ReferenceFormItems } from "$types/applicants";
import { removeUndefined } from "@/Utils";
import { getApplicationStatus } from "@/helper/apply";
import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H3 } from "@common/Typography";
import { FlexBox } from "@common/index";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

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

export const Reference = () => {
  const { control, setValue, reset, handleSubmit, watch } =
    useForm<ReferenceForm>({
      defaultValues: defaultValues,
      // resolver: yupResolver(personalDetailsSchema),
    });
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const {
    isLoading: isQueryLoading,
    data,
    refetch,
  } = useGetApplicantQuery(uid as string, {
    refetchOnMountOrArgChange: true,
  });
  const [updateApplicant, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  // const [createFileUpload] = useCreateFileUploadMutation();
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

  if (isQueryLoading || !data) {
    return <></>;
  }

  const status = getApplicationStatus(
    data,
    questions?.map((item) => item.id.toString()),
  );

  const personalDetailsFormTemplate: FormTemplate<ReferenceForm>[] = [
    {
      type: "custom",
      component: <H3 sx={{ textDecoration: "underline" }}>First Referrer:</H3>,
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Name",
          name: "first_referrer_name",
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
      type: "custom",
      component: <H3 sx={{ textDecoration: "underline" }}>Second Referrer:</H3>,
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Name",
          name: "second_referrer_name",
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
          label: "Cantact Number",
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
    // console.log({ values, removed: removeUndefined(values) });
    const updatedValue = removeUndefined(values);
    // const uploadResult = ReferenceFormFileItems.map(async (fileItem) => {
    //   if (
    //     updatedValue[fileItem] &&
    //     typeof updatedValue[fileItem] !== "string"
    //   ) {
    //     const file = updatedValue[fileItem] as any;
    //     const { data: fileUrl } = (await createFileUpload(file)) as {
    //       data: string;
    //     };

    //     return { fileItem, fileUrl };
    //   }
    //   return null;
    // });

    // const res = await Promise.all(uploadResult);
    // res.forEach((item) => {
    //   if (item) {
    //     updatedValue[item.fileItem] = item.fileUrl;
    //   }
    // });
    const finalValue = {
      reference: JSON.stringify(updatedValue) as Partial<ReferenceForm>,
      email: data.email,
      unique_id: data.unique_id,
      first_name: data.first_name,
    };
    updateApplicant(finalValue).then(() => {
      refetch();
      ShowShortMessage("Saved successfully");
    });
  };

  const submitApplication = () => {
    updateApplicant({
      email: data.email,
      unique_id: data.unique_id,
      first_name: data.first_name,
      // application_status: JSON.stringify({
      //   "completed-applicant-form": true,
      // }) as any,
    });
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
          <Button
            // type='submit'
            variant='contained'
            disabled={!status || status.overall === "incomplete"}
            onClick={submitApplication}
            // href='/care-worker/apply/finished'
          >
            Finish
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};
