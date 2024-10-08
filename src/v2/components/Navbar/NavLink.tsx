import { NavLink } from "@/v2/types/navLink";
import { MIconButton } from "@common/IconButton";
import { Column, FlexBox, Grid } from "@common/index";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { muiColors } from "@shared/constants/colors";
import { Link, useLocation, useParams } from "react-router-dom";

export const NavLinkComponent = ({
  navLink,
}: {
  navLink: NavLink | "separator" | "spacer";
}) => {
  const { pathname } = useLocation();
  const paramKey =
    (typeof navLink !== "string" && navLink.paramKey) || "random-anything";
  const { [paramKey]: paramId } = useParams();

  if (navLink === "separator") {
    return (
      <FlexBox
        sx={{
          width: "100%",
          my: 2,
        }}
      />
    );
  }

  if (navLink === "spacer") {
    return (
      <FlexBox
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

  const { route, icon, label, image } = navLink;

  const replaceParamId = (route: string, paramKey: string) => {
    return route.replace(`:${paramKey}`, String(paramId));
  };

  const replaceIds = (route: string, paramKey?: string) => {
    if (paramKey) {
      return replaceParamId(route, paramKey);
    }
    return route;
  };

  const link = replaceIds(route, paramKey);

  const isActive =
    pathname === link ||
    (pathname === "/v2" && link === "/dashboard") ||
    (link !== "/v2" && pathname.startsWith(link)) ||
    navLink.activePatterns?.some?.((pattern) => pathname.startsWith(pattern)) ||
    navLink.children?.some?.((navChild) =>
      pathname.startsWith(replaceIds(navChild.route, navChild.paramKey)),
    );

  const hasChildren = Boolean(navLink.children?.length);

  const isExpanded = hasChildren && isActive;

  let iconComponent = null;
  if (icon) {
    const Icon = icon;
    iconComponent = (
      <Icon style={{ color: isActive ? "text.primary" : "inherit" }} />
    );
  }
  if (image) {
    const Image = image.component;
    iconComponent = <Image sx={image.sx} />;
  }

  return (
    <Column
      sx={{
        ...(isExpanded && {
          backgroundColor: "#F5F5F5",
          borderRadius: 2,
        }),
      }}
    >
      <Link
        key={route}
        to={link}
      >
        <MIconButton
          key={route}
          disableRipple
          sx={{
            p: "0.2rem",
            px: "4.5rem",
            borderRadius: 0,
            width: "100%",
            backgroundColor: "transparent",
            py: 1.2,
            ...(isActive && {
              color: "text.primary",
              backgroundColor: muiColors.grey[200],
            }),
            ...(isActive && {
              fontWeight: "800",
            }),
          }}
        >
          <Grid
            sx={{
              gap: 1.5,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontSize: "1.2rem",
              gridTemplateColumns: hasChildren ? "2rem 1fr auto" : "2rem 1fr",
            }}
          >
            {iconComponent}
            <FlexBox
              sx={{ justifyContent: "flex-start", whiteSpace: "nowrap" }}
            >
              {label}
            </FlexBox>
            {hasChildren && (
              <FlexBox
                sx={{
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {isExpanded ? <ChevronRight /> : <ExpandMore />}
              </FlexBox>
            )}
          </Grid>
        </MIconButton>
      </Link>
      {navLink.children && isExpanded && (
        <Column
          sx={{
            ml: 2,
            gap: 1,
          }}
        >
          {navLink.children.map((child) => {
            return (
              <NavLinkComponent
                key={child.route}
                navLink={child}
              />
            );
          })}
        </Column>
      )}
    </Column>
  );
};
