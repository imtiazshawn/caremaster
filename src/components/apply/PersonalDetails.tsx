import {
  PersonalDetailsForm,
  PersonalDetailsFormItems,
} from "$types/applicants";
import { removeUndefined } from "@/Utils";
import { personalDetailsSchema } from "@/formSchemas/personalDetails";
import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { FlexBox } from "@common/index";
import { PostCodeComponent } from "@components/PostCodeComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export const PersonalDetails = () => {
  const { control, setValue, reset, handleSubmit } =
    useForm<PersonalDetailsForm>({
      // defaultValues: defaultValues,
      resolver: yupResolver(personalDetailsSchema),
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

  useEffect(() => {
    if (data) {
      const formData: any = {};
      PersonalDetailsFormItems.forEach((item) => {
        formData[item] = data[item];
      });
      reset(formData);
    }
  }, [reset, data]);

  if (isQueryLoading || !data) {
    return <></>;
  }
  const personalDetailsFormTemplate: FormTemplate<PersonalDetailsForm>[] = [
    {
      type: "text",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "First Name",
          name: "first_name",
          isDisabled: true,
          required: true,
        },
        {
          type: "text",
          label: "Middle Name",
          name: "middle_name",
          required: true,
        },
        {
          type: "text",
          label: "Surname",
          name: "surname",
          required: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "custom",
          component: (
            <PostCodeComponent
              labelPosition='top'
              setAddress={(address) => setValue("address", address)}
              setPostcode={(postcode) => setValue("postcode", postcode)}
            />
          ),
        },
        {
          type: "text",
          label: "Address",
          name: "address",
        },
        {
          name: "email",
          type: "text",
          label: "Email",
          isDisabled: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          name: "phone",
          type: "text",
          label: "Mobile",
        },
        {
          type: "text",
          label: "Telephone",
          name: "telephone",
        },
        {
          name: "date_of_birth",
          type: "date",
          label: "Date of Birth",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          name: "nationality",
          type: "text",
          label: "Nationality",
        },
        {
          name: "ni_number",
          type: "text",
          label: "National Insurance No.",
        },
        {
          name: "passport_number",
          type: "text",
          label: "Passport No.",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "radio-group",
          name: "has_driving_license",
          label: "Do you have a driving license?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        {
          type: "radio-group",
          name: "has_convictions_endorsements",
          label: "Do you have any convictions or endorsements?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        {
          name: "passport_expiry_date",
          type: "date",
          label: "Passport Expiry Date",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "radio-group",
          name: "is_disabled_person",
          label: "Are you a disabled person?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        {
          type: "radio-group",
          name: "has_employed_family_member",
          label: "Do you have any employed family members by Care Solution?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        {
          type: "text",
          name: "pin",
          label: "If yes the pin no.",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "custom",
          component: <></>,
        },
        {
          type: "custom",
          component: <></>,
        },
        {
          type: "date",
          name: "expiry_date",
          label: "Expiry Date",
        },
      ],
    },
  ];
  const handleFormSubmit = async (values: PersonalDetailsForm) => {
    const updatedValue = removeUndefined(values);
    updateApplicant(updatedValue).then(() => {
      refetch();
      ShowShortMessage("Saved successfully");
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
          labelPosition='top'
        />
        <FlexBox
          sx={{
            justifyContent: "flex-end",
            marginTop: "18px",
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
            type='submit'
            variant='contained'
            href={`/care-worker/apply/questionnaire?uid=${uid}`}
          >
            Next
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};
