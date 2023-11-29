import { NavLink } from "@/v2/types/navLink";
import { MIconButton } from "@common/IconButton";
import { Column, FlexBox } from "@common/index";
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
          my: 5,
          borderTop: "1px solid #E3E3E3",
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

  const { route, icon, label } = navLink;

  const Icon = icon;

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

  return (
    <Column>
      <Link
        key={route}
        to={link}
      >
        <MIconButton
          key={route}
          disableRipple
          sx={{
            p: "0.75rem",
            px: "2.5rem",
            borderRadius: 2,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: "100%",
            backgroundColor: "transparent",
            ...(isActive && {
              color: "#000000",
            }),
            ...(isActive && {
              fontWeight: "800",
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
            <Icon color={isActive ? "#000" : "inherit"} />
            {label}
          </FlexBox>
        </MIconButton>
      </Link>
      {navLink.children && (
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
