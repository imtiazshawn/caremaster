import { SCREENING_ID_PARAM_KEY } from "@/shared/constants/route";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ApplicationStatus } from "$types/applicants";
import { CareWorkerQuestion } from "$types/careWorkerQuestions";
import { CareWorker } from "$types/careWorkers";
import { getApplicationStatus } from "@/helper/apply";
import { NavLink } from "@/v2/types/navLink";
import { COLORS } from "@shared/constants/colors";

export const getScreeningNavLinks = (
  careWorker: CareWorker,
  questions?: CareWorkerQuestion[],
): (NavLink | "separator" | "spacer")[] => {
  let status: Partial<ApplicationStatus> = {};
  if (!careWorker.applicant) {
    return [];
  }
  if (questions) {
    status = getApplicationStatus(
      careWorker.applicant,
      questions.map(({ id }) => id.toString()),
    );
  }

  return [
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/personal-details`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.personalDetails === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Personal Details",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/questionnaire`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.questionnaire === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Questionnaire",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/employment-history`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.employmentHistory === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Employment History",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/education-history`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.educationHistory === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Education History",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/documents`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.documents === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Documents",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/reference`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.references === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Reference",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/dbs`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.references === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "DBS",
    },
    {
      route: `/v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/training`,
      paramKey: SCREENING_ID_PARAM_KEY,
      image: {
        component: CheckCircleIcon,
        sx: {
          color:
            status.references === "complete"
              ? COLORS.COMPLETED
              : COLORS.INCOMPLETE,
          fontSize: 23,
        },
      },
      label: "Training",
    },

    // "spacer",
    // {
    //   route: "/v2/help-and-support",
    //   image: Message,
    //   label: "Help and Support",
    // },
    // {
    //   route: "/v2/settings",
    //   image: Settings,
    //   label: "Settings",
    // },
  ];
};
