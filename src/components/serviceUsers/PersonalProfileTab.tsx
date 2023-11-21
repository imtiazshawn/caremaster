import { Box, Column } from "@components/common";
import { useEffect, useState } from "react";

import {
  PERSON_PROFILE_SEGMENTS,
  PersonProfileSegments,
  ServiceUser,
} from "$types/serviceUsers";
import { removeUndefined } from "@/Utils";
import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { SegHeader } from "@common/SegHeader";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { LoadingButton } from "@components/common/LoadingButton";
import { useUpdateServiceUserMutation } from "@reducers/api/serviceUsers";
import { useForm } from "react-hook-form";
import {
  backgroundInfoForm,
  councilForm,
  identificationForm,
  othersForm,
  serviceUserForm,
} from "./PersonalProfileFormTemplates";

export const PersonalProfileTab = () => {
  const [expandedSegments, setExpandedSegments] = useState<
    PersonProfileSegments[]
  >([PERSON_PROFILE_SEGMENTS.SERVICE_USER]);
  const { serviceUser, refetch } = useServiceUser();
  const [updateServiceUser, { isLoading }] = useUpdateServiceUserMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<ServiceUser>();

  useEffect(() => {
    if (serviceUser) {
      reset({ ...serviceUser });
    }
  }, [reset, serviceUser]);

  const changeExpandSegment = (segment: PersonProfileSegments | undefined) => {
    setExpandedSegments((prev) => {
      if (prev.includes(segment as PersonProfileSegments)) {
        return prev.filter((seg) => seg !== segment);
      }
      return [...prev, segment as PersonProfileSegments];
    });
  };

  const handleFormSubmit = async (value: ServiceUser) => {
    const updatedValue = removeUndefined({ ...value });
    if (typeof updatedValue.photo === "string") {
      delete updatedValue.photo;
    }
    await updateServiceUser(updatedValue);
    refetch();
  };

  const segments: {
    currentSegment: PERSON_PROFILE_SEGMENTS;
    template: FormTemplate<ServiceUser>[];
  }[] = [
    {
      currentSegment: PERSON_PROFILE_SEGMENTS.SERVICE_USER,
      template: serviceUserForm,
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENTS.IDENTIFICATION,
      template: identificationForm({ setValue, watch }),
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENTS.BACKGROUND,
      template: backgroundInfoForm({ watch, setValue }),
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENTS.COUNCIL,
      template: councilForm,
    },
    {
      currentSegment: PERSON_PROFILE_SEGMENTS.OTHERS,
      template: othersForm,
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
        {segments.map(({ currentSegment, template }) => (
          <Column key={currentSegment}>
            <SegHeader
              currentSegment={currentSegment}
              isExpanded={expandedSegments.includes(currentSegment)}
              changeExpandSegment={(segment) =>
                changeExpandSegment(segment as PERSON_PROFILE_SEGMENTS)
              }
            />
            <Box
              sx={{
                display: expandedSegments.includes(currentSegment)
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
