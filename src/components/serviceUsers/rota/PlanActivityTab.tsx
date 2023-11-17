import { Checkbox } from "@common/Checkbox";
import { H3 } from "@common/Typography";
import { FlexBox, Grid } from "@common/index";
import { useGetCarePlansQuery } from "@reducers/api/carePlans";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type PlanActivityTabProps = {
  control: any;
  watch: UseFormWatch<any> | undefined;
  setValue: UseFormSetValue<any> | undefined;
};

export const PlanActivityTab: React.FC<PlanActivityTabProps> = ({
  setValue,
  watch,
}) => {
  const serviceUserId = useServiceUserId();
  const { data: planActivities } = useGetCarePlansQuery(serviceUserId);

  const selectedPlanActivities: number[] = watch?.("care_plans") ?? [];

  const toggleSelectedPlanActivities = (id: number) => {
    let currentPlanActivities = selectedPlanActivities;
    if (selectedPlanActivities.includes(id)) {
      currentPlanActivities = currentPlanActivities.filter(
        (item) => item !== id,
      );
    } else {
      currentPlanActivities.push(id);
    }
    setValue?.("care_plans", currentPlanActivities);
  };

  return (
    <Grid sx={{ gap: "1em", gridTemplateColumns: "1fr 1fr" }}>
      {planActivities?.map((item) => (
        <FlexBox
          key={item.id}
          sx={{
            alignItems: "center",
            boxShadow: " 1px 4px 1px #b2b2b2",
            border: "1px solid #c7c7c7",
            cursor: "pointer",
            p: "0.5em",
          }}
          onClick={() => {
            toggleSelectedPlanActivities(item.id);
          }}
        >
          <Checkbox
            size='medium'
            defaultChecked={false}
            checked={selectedPlanActivities.includes(item.id)}
            onChange={(e) => {
              toggleSelectedPlanActivities(item.id);
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <H3>{item.title}</H3>
        </FlexBox>
      ))}
    </Grid>
  );
};
