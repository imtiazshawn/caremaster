import { Box, Column, Row } from "@components/common";
import { H4 } from "@components/common/Typography";
import { useEffect, useState } from "react";

import {
  PERSON_PROFILE_SEGMENTS,
  PersonProfileSegments,
  ServiceUser,
} from "$types/serviceUsers";
import { removeUndefined } from "@/Utils";
import { SmartForm } from "@common/SmartForm";
import { LoadingButton } from "@components/common/LoadingButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetServiceUserQuery,
  useUpdateServiceUserMutation,
} from "@reducers/api/serviceUsers";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  backgroundInfoForm,
  councilForm,
  identificationForm,
  othersForm,
  serviceUserForm,
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
      sx={{
        backgroundColor: "rgba(148, 163, 184, 0.14)",
        padding: 2,
        height: "67px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <H4>{currentSegment}</H4>
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={() =>
          changeExpandSegment(
            expandedSegment === currentSegment ? undefined : currentSegment,
          )
        }
      >
        {expandedSegment === currentSegment && <ExpandMoreIcon />}
        {expandedSegment !== currentSegment && <ControlPointIcon />}
      </Box>
    </Row>
  );
};

export const PersonalProfileTab = () => {
  const { id: serviceUserId } = useParams<{ id: string }>();
  const [expandedSegment, setExpandedSegment] = useState<
    PersonProfileSegments | undefined
  >(PERSON_PROFILE_SEGMENTS.SERVICE_USER);
  const { data, refetch } = useGetServiceUserQuery(serviceUserId ?? "");
  const [updateServiceUser, { isLoading }] = useUpdateServiceUserMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<ServiceUser>();

  const serviceUser = data?.response;

  useEffect(() => {
    if (serviceUser) {
      reset({ ...serviceUser });
    }
  }, [reset, serviceUser]);

  const changeExpandSegment = (segment: PersonProfileSegments | undefined) => {
    setExpandedSegment(segment);
  };

  const handleFormSubmit = async (value: ServiceUser) => {
    const updatedValue = removeUndefined({ ...value });
    if (typeof updatedValue.photo === "string") {
      delete updatedValue.photo;
    }
    await updateServiceUser(updatedValue);
    refetch();
  };

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
        <Column>
          <PersonProfileSegHeader
            currentSegment={PERSON_PROFILE_SEGMENTS.SERVICE_USER}
            expandedSegment={expandedSegment}
            changeExpandSegment={changeExpandSegment}
          />
          {expandedSegment === PERSON_PROFILE_SEGMENTS.SERVICE_USER && (
            <SmartForm
              template={serviceUserForm({ watch, setValue })}
              control={control}
              labelPosition='left'
            />
          )}
        </Column>
        <Column>
          <PersonProfileSegHeader
            currentSegment={PERSON_PROFILE_SEGMENTS.IDENTIFICATION}
            expandedSegment={expandedSegment}
            changeExpandSegment={changeExpandSegment}
          />
          {expandedSegment === PERSON_PROFILE_SEGMENTS.IDENTIFICATION && (
            <SmartForm
              template={identificationForm({ setValue, watch })}
              control={control}
              labelPosition='left'
            />
          )}
        </Column>
        <Column>
          <PersonProfileSegHeader
            currentSegment={PERSON_PROFILE_SEGMENTS.BACKGROUND}
            expandedSegment={expandedSegment}
            changeExpandSegment={changeExpandSegment}
          />
          {expandedSegment === PERSON_PROFILE_SEGMENTS.BACKGROUND && (
            <SmartForm
              template={backgroundInfoForm({ setValue })}
              control={control}
              labelPosition='left'
            />
          )}
        </Column>
        <Column>
          <PersonProfileSegHeader
            currentSegment={PERSON_PROFILE_SEGMENTS.COUNCIL}
            expandedSegment={expandedSegment}
            changeExpandSegment={changeExpandSegment}
          />
          {expandedSegment === PERSON_PROFILE_SEGMENTS.COUNCIL && (
            <SmartForm
              template={councilForm}
              control={control}
              labelPosition='left'
            />
          )}
        </Column>
        <Column>
          <PersonProfileSegHeader
            currentSegment={PERSON_PROFILE_SEGMENTS.OTHERS}
            expandedSegment={expandedSegment}
            changeExpandSegment={changeExpandSegment}
          />
          {expandedSegment === PERSON_PROFILE_SEGMENTS.OTHERS && (
            <SmartForm
              template={othersForm}
              control={control}
              labelPosition='left'
            />
          )}
        </Column>
      </Column>
    </form>
  );
};
