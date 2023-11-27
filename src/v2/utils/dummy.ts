type Alert = {
  title: string;
  type: "warning" | "error";
  time: string;
  description: string;
};

export const dummyAlerts: Alert[] = [
  {
    title: "Trevor Norman Mutebe",
    type: "warning",
    time: "2023-11-27 10:20",
    description:
      "Trevor Norman clocked in at 11:24 (1 hour 24 minutes late) for their 10:00 - 17:00 shift with Care solutions Recruitment Agency Ltd Care solutions Recruitment Agency Ltd",
  },
  {
    title: "ANNAH KANTONO",
    type: "warning",
    time: "2023-11-27 10:20",
    description:
      "ANNAH clocked in at 10:20 (1 hour 20 minutes late) for their 09:00 - 10:30 shift with Catherine Evans",
  },
  {
    title: "Brian Yawe",
    type: "error",
    time: "2023-11-27 10:16",
    description:
      "Brian Yawe did not clock in to their 10 AM shift with Care solutions Recruitment Agency Ltd Care solutions Recruitment Agency Ltd.",
  },
  {
    title: "MERCIRINER NABIRYO",
    type: "error",
    time: "2023-11-27 10:16",
    description:
      "MERCIRINER NABIRYO did not clock in to their 10 AM shift with Care solutions Recruitment Agency Ltd Care solutions Recruitment Agency Ltd.",
  },
  {
    title: "Trevor Norman Mutebe",
    type: "error",
    time: "2023-11-27 10:16",
    description:
      "Trevor Norman Mutebe did not clock in to their 10 AM shift with Care solutions Recruitment Agency Ltd Care solutions Recruitment Agency Ltd.",
  },
  {
    title: "ANNAH KANTONO",
    type: "error",
    time: "2023-11-27 09:16",
    description:
      "ANNAH KANTONO did not clock in to their 9 AM shift with Catherine Evans.",
  },
  {
    title: "Priscilla Kisakye",
    type: "error",
    time: "2023-11-27 09:16",
    description:
      "Priscilla Kisakye did not clock in to their 9 AM shift with Catherine Evans.",
  },
  {
    title: "Halima Dilara",
    type: "error",
    time: "2023-11-27 07:16",
    description:
      "Halima Dilara did not clock in to their 7 AM shift with Favour Abiodun.",
  },
];

export const unassignedAppointments = [
  {
    title: "Trevor Norman Mutebe",
  },
  {
    title: "ANNAH KANTONO",
  },
];
