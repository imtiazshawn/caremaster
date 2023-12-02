import { DocumentItems, DocumentsForm } from "$types/applicants";
import { removeUndefined } from "@/Utils";
import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { FlexBox } from "@common/index";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useCreateFileUploadMutation } from "@reducers/api/fileUpload";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export const Documents = ({ id }: { id?: string }) => {
  const { control, reset, setValue, watch, handleSubmit } =
    useForm<DocumentsForm>({
      // defaultValues: defaultValues,
      // resolver: yupResolver(personalDetailsSchema),
    });
  const [searchParams] = useSearchParams();
  const uid = id ?? searchParams.get("uid");
  const {
    isLoading: isQueryLoading,
    data,
    refetch,
  } = useGetApplicantQuery(uid as string, {
    refetchOnMountOrArgChange: true,
  });
  const [updateApplicant, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();
  const [createFileUpload] = useCreateFileUploadMutation();

  useEffect(() => {
    if (data && data["documents"]) {
      const documents = data["documents"];
      reset(documents);
    }
  }, [reset, data]);

  if (isQueryLoading || !data) {
    return <></>;
  }

  const documentTemplate: FormTemplate<DocumentsForm>[] = [
    {
      type: "column",
      items: [
        {
          type: "file",
          label: "Passport",
          name: "passport",
          // required: true,
        },
        {
          type: "file",
          label: "Biometric",
          name: "biometric",
          // required: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "file",
          label: "Passport Size Photo",
          name: "passport_size_photo",
          // required: true,
        },
        {
          type: "file",
          label: "Training",
          name: "training",
          // required: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "file",
          label: "Proof of Address(1)",
          name: "proof_of_address_first",
          // required: true,
        },
        {
          type: "file",
          label: "Proof of Address(2)",
          name: "proof_of_address_second",
          // required: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "file",
          label: "Driving License",
          name: "driving_license",
          // required: true,
        },
        {
          type: "file",
          label: "Others",
          name: "others",
          // required: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "file",
          label: "CV",
          name: "cv",
          // required: true,
        },
        {
          type: "file",
          label: "DBS",
          name: "dbs",
          // required: true,
        },
      ],
    },
  ];

  const handleFormSubmit = async (values: DocumentsForm) => {
    // console.log({ values, removed: removeUndefined(values) });
    const updatedValue = removeUndefined(values);

    const uploadResult = DocumentItems.map(async (fileItem) => {
      if (
        updatedValue[fileItem] &&
        typeof updatedValue[fileItem] !== "string"
      ) {
        const file = updatedValue[fileItem] as any;
        const { data: fileUrl } = (await createFileUpload(file)) as {
          data: string;
        };
        return { fileItem, fileUrl };
      }
      return null;
    });

    const res = await Promise.all(uploadResult);
    const documents: any = { ...updatedValue };
    res.forEach((item) => {
      if (item) {
        documents[item.fileItem] = item.fileUrl;
      }
    });

    updateApplicant({
      documents: JSON.stringify(documents) as Partial<DocumentsForm>,
      email: data.email,
      unique_id: data.unique_id,
      first_name: data.first_name,
    }).then(() => {
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
          template={documentTemplate}
          control={control}
          watch={watch}
          setValue={setValue}
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
            href={`/care-worker/apply/reference?uid=${uid}`}
          >
            Next
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};
