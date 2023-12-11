import { ApplicationStatus } from "$types/applicants";
import { getApplicationStatus } from "@/helper/apply";
import { COLORS } from "@/shared/constants/colors";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { H3, Span } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import { useGetApplicantQuery } from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { Link, useLocation, useSearchParams } from "react-router-dom";
type NavLink = {
  route: string;
  label: string;
  hideIcon?: boolean;
  statusKey?: keyof ApplicationStatus;
};

const getNavLinks = (
  type: "apply" | "screening",
): (NavLink | "separator" | "spacer")[] => {
  const links: (NavLink | "separator" | "spacer")[] = [
    {
      route: `/care-worker/${type}/personal-details`,
      label: "Personal Details",
      statusKey: "personalDetails",
    },
    {
      route: `/care-worker/${type}/questionnaire`,
      label: "Questionnaire",
      statusKey: "questionnaire",
    },
    {
      route: `/care-worker/${type}/employment-history`,
      label: "Employment History",
      statusKey: "employmentHistory",
    },
    {
      route: `/care-worker/${type}/education-history`,
      label: "Education History",
      statusKey: "educationHistory",
    },
    {
      route: `/care-worker/${type}/documents`,
      label: "Documents",
      statusKey: "documents",
    },
    {
      route: `/care-worker/${type}/reference`,
      label: "Reference",
      statusKey: "references",
    },
    {
      route: `/care-worker/${type}/dbs`,
      label: "DBS",
      hideIcon: true,
    },
    {
      route: `/care-worker/${type}/training`,
      label: "Training",
      hideIcon: true,
    },
  ];
  let newLinks = links;
  if (type === "apply") {
    newLinks = links.slice(0, -2);
  }
  return newLinks;
};

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const { data: applicant } = useGetApplicantQuery(uid as string, {
    refetchOnMountOrArgChange: true,
  });
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const type = pathname.startsWith("/care-worker/screening")
    ? "screening"
    : "apply";
  const status =
    applicant && questions
      ? getApplicationStatus(
          applicant,
          questions.map(({ id }) => id.toString()),
        )
      : null;
  return (
    <Column
      sx={{
        height: "100vh",
        pb: 5,
        pt: 5,
        gap: 1,
        backgroundColor: COLORS.WHITE,
      }}
    >
      <FlexBox
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          ml: 4,
          gap: 0.6,
        }}
      >
        <Logo width='3em' />
        <H3
          fontFamily='Inter'
          color='#0F172A'
        >
          Care Master
        </H3>
      </FlexBox>
      <FlexBox
        sx={{
          width: "100%",
          mt: 3,
          borderTop: "1px solid #E3E3E3",
          mb: 3,
          opacity: 0.2,
          gap: 0,
        }}
      />

      {getNavLinks(type).map((navLink, index) => {
        if (navLink === "separator") {
          return (
            <FlexBox
              key={`${index}separator`}
              sx={{
                width: "100%",
                my: 5,
                borderTop: "1px solid #E3E3E3",
              }}
            />
          );
        }

        if (navLink === "spacer") {
          return (
            <FlexBox
              key={`${index}spacer`}
              sx={{
                flex: 1,
                flexBasis: 0,
                width: "100%",
                borderTop: "1px solid #E3E3E3",
                opacity: 0.2,
              }}
            />
          );
        }

        const { route, label, statusKey, hideIcon } = navLink;
        const isComplete =
          status && statusKey ? status[statusKey] === "complete" : false;
        const isActive =
          pathname === route ||
          (pathname === "/admin" && route === "/admin/dashboard") ||
          (route !== "/admin" && pathname.startsWith(route));

        return (
          <Link
            key={route}
            to={`${route}?uid=${uid}`}
          >
            <IconButton
              key={route}
              disableRipple
              sx={{
                p: "0.75rem",
                px: "2.5rem",
                pl: hideIcon ? "2.75rem" : "1.5rem",
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: "100%",
                backgroundColor: "transparent",
                // ":hover": {
                //   backgroundColor: "#F7F7FB",
                // },

                ...(isActive && {
                  fontWeight: "600",
                }),
              }}
            >
              <FlexBox
                sx={{
                  gap: 1.5,
                  justifyContent: "left",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "1.2rem",
                }}
              >
                {/* <Icon "#1ba81b" color={} /> */}

                {!hideIcon && (
                  <CheckCircleIcon
                    sx={{
                      color: isComplete ? COLORS.COMPLETED : COLORS.INCOMPLETE,
                      fontSize: 23,
                    }}
                  />
                )}
                <Span
                  sx={{
                    fontWeight: isActive ? "bold" : "inherit",
                    color: isActive ? COLORS.BLUE : "inherit",
                    marginLeft: hideIcon ? "20px" : "inherit",
                  }}
                >
                  {label}
                </Span>
                {route === "/messages" && (
                  <FlexBox className='h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm text-white'>
                    13
                  </FlexBox>
                )}
              </FlexBox>
            </IconButton>
          </Link>
        );
      })}
    </Column>
  );
};
