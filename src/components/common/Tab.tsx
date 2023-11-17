import { TabContext as MTabContext, TabPanel as MTabPanel } from "@mui/lab";
import { Tab as MTab, Tabs as MTabs } from "@mui/material";

export type TabProps = React.ComponentProps<typeof MTab>;
export type TabsProps = React.ComponentProps<typeof MTabs>;
export type TabContextProps = React.ComponentProps<typeof MTabContext>;
export type TabPanelProps = React.ComponentProps<typeof MTabPanel>;

export const Tab = (props: TabProps) => {
  return (
    <MTab
      {...props}
      sx={{
        fontSize: "1.25rem",
        fontWeight: "600",
        textTransform: "none",
        "&.Mui-selected": {
          color: "white",
          backgroundColor: "#929292",
        },
        ...props.sx,
      }}
    />
  );
};
export const Tabs = (props: TabsProps) => {
  return <MTabs {...props} />;
};
export const TabContext = (props: TabContextProps) => {
  return <MTabContext {...props} />;
};
export const TabPanel = (props: TabPanelProps) => {
  return <MTabPanel {...props} />;
};
