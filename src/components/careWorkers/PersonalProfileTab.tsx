import { Box, Column, Row } from "@components/common";
import { H4 } from "@components/common/Typography";
import { useEffect, useState } from "react";

import {
  PERSON_PROFILE_SEGMENT,
  PersonProfileSegments,
  UpdateCareWorkerReq,
} from "$types/careWorkers";

import { removeUndefined } from "@/Utils";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { LoadingButton } from "@components/common/LoadingButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetCareWorkerQuery,
  useUpdateCareWorkerMutation,
} from "@reducers/api/careWorkers";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  getBackgroundForm,
  getDetailsCareWorkserForm,
  getEmergencyContactForm,
  getRoleAndAccessForm,
} from "./PersonalProfileFormTemplates";

type Props = {
  currentSegment: PersonProfileSegments;
  expandedSegment?: PersonProfileSegments;
  changeExpandSegment: (segment: PersonProfileSegments | undefined) => void;
};

const PersonProfileSegHeader = ({
  currentSegment,
  expandedSegment,
  changeExpandSegment,
}: Props) => {
  return (
    <Row
      onClick={() =>
        changeExpandSegment(
          expandedSegment === currentSegment ? undefined : currentSegment,
        )
      }
      sx={{
        cursor: "pointer",
        backgroundColor: "rgba(148, 163, 184, 0.14)",
        padding: 2,
        height: "4rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <H4>{currentSegment}</H4>
      <Box>
        {expandedSegment === currentSegment && <ExpandMoreIcon />}
        {expandedSegment !== currentSegment && <ControlPointIcon />}
      </Box>
    </Row>
  );
};

export const PersonalProfileTab = () => {
  const { id: careWorkerId } = useParams<{ id: string }>();
  const [expandedSegment, setExpandedSegment] = useState<
    PersonProfileSegments | undefined
  >(PERSON_PROFILE_SEGMENT.DETAILS);

  const { data: careWorker, refetch } = useGetCareWorkerQuery(
    careWorkerId ?? "",
  );
  const [updateCareWorker, { isLoading }] = useUpdateCareWorkerMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<UpdateCareWorkerReq>();

  useEffect(() => {
    if (careWorker) {
      reset({ ...careWorker });
    }
  }, [reset, careWorker]);

  const changeExpandSegment = (segment: PersonProfileSegments | undefined) => {
    setExpandedSegment(segment);
  };

  const handleFormSubmit = async (value: UpdateCareWorkerReq) => {
    const updatedValue = removeUndefined({ ...value });
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
      template: getDetailsCareWorkserForm({ watch, setValue }),
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
            <PersonProfileSegHeader
              currentSegment={currentSegment}
              expandedSegment={expandedSegment}
              changeExpandSegment={changeExpandSegment}
            />

            {expandedSegment === currentSegment && (
              <SmartForm
                template={template}
                control={control}
                labelPosition='left'
              />
            )}
          </Column>
        ))}
      </Column>
    </form>
  );
};
