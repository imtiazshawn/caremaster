import { Box, Column } from "@components/common";
import { useEffect, useState } from "react";

import {
  PERSON_PROFILE_SEGMENT,
  PersonProfileSegments,
  UpdateCareWorkerReq,
} from "$types/careWorkers";

import { removeUndefined } from "@/Utils";
import { useCareWorker } from "@/shared/hooks/useCareWorker";
import { SegHeader } from "@common/SegHeader";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { LoadingButton } from "@components/common/LoadingButton";
import { useUpdateCareWorkerMutation } from "@reducers/api/careWorkers";
import { useForm } from "react-hook-form";
import {
  getBackgroundForm,
  getDetailsCareWorkerForm,
  getEmergencyContactForm,
  getRoleAndAccessForm,
} from "./PersonalProfileFormTemplates";

export const PersonalProfileTab = () => {
  const [expandedSegments, setExpandedSegments] = useState<
    PersonProfileSegments[]
  >([PERSON_PROFILE_SEGMENT.DETAILS]);

  const { careWorker, refetch } = useCareWorker();
  const [updateCareWorker, { isLoading }] = useUpdateCareWorkerMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<UpdateCareWorkerReq>();

  useEffect(() => {
    if (careWorker) {
      reset({
        ...careWorker,
        name: careWorker.user.name,
        email: careWorker.user.email,
        phone: careWorker.user.phone,
      });
    }
  }, [reset, careWorker]);

  const changeExpandSegment = (segment: string | undefined) => {
    if (expandedSegments.includes(segment as PersonProfileSegments)) {
      setExpandedSegments(expandedSegments.filter((seg) => seg !== segment));
      return;
    }
    setExpandedSegments([
      ...expandedSegments,
      segment as PersonProfileSegments,
    ]);
  };

  const handleFormSubmit = async (values: UpdateCareWorkerReq) => {
    const updatedValue = removeUndefined({ ...values });
    if (typeof updatedValue.photo === "string") {
      delete updatedValue.photo;
    }
    await updateCareWorker(updatedValue);
    refetch();
  };

  const segments: {
    currentSegment: PERSON_PROFILE_SEGMENT;
    template: FormTemplate<UpdateCareWorkerReq>[];
  }[] = [
    {
      currentSegment: PERSON_PROFILE_SEGMENT.DETAILS,
      template: getDetailsCareWorkerForm(),
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENT.ROLE_AND_ACCESS_RIGHT,
      template: getRoleAndAccessForm({ watch, setValue }),
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENT.BACKGROUND,
      template: getBackgroundForm({ watch, setValue }),
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENT.EMERGENCY_CONTACT,
      template: getEmergencyContactForm(),
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Column sx={{ gap: "1em" }}>
        <LoadingButton
          sx={{
            alignSelf: "flex-end",
          }}
          type='submit'
          variant='contained'
          loading={isLoading}
        >
          Save
        </LoadingButton>
        {segments.map(({ currentSegment, template }, index) => (
          <Column key={index}>
            <SegHeader
              currentSegment={currentSegment}
              isExpanded={expandedSegments.includes(currentSegment)}
              changeExpandSegment={changeExpandSegment}
            />

            <Box
              sx={{
                display: expandedSegments.includes(
                  currentSegment as PersonProfileSegments,
                )
                  ? "block"
                  : "none",
              }}
            >
              <SmartForm
                template={template}
                control={control}
                watch={watch}
                setValue={setValue}
                labelPosition='left'
              />
            </Box>
          </Column>
        ))}
      </Column>
    </form>
  );
};
