import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type NavLink = {
  route: string;
  paramKey?: string;
  icon?:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | SvgIconComponent;
  image?: {
    component: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    sx?: Record<string, unknown>;
  };
  label: string;
  children?: NavLink[];
  activePatterns?: string[];
};
