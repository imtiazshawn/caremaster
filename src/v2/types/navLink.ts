export type NavLink = {
  route: string;
  paramKey?: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
  children?: NavLink[];
  activePatterns?: string[];
};
