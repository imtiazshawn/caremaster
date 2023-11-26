import { BackgroundForm } from "@/v2/components/serviceUser/Background";
import { BasicForm } from "@/v2/components/serviceUser/BasicForm";
import { CouncilForm } from "@/v2/components/serviceUser/Council";
import { IdentificationForm } from "@/v2/components/serviceUser/Identification";
import { OthersForm } from "@/v2/components/serviceUser/Others";
import Calendar from "@/v2/pages/Calendar";
import { Client } from "@/v2/pages/Client";
import ClientRota from "@/v2/pages/ClientRota";
import { Dashboard } from "@/v2/pages/Dashboard";
import { Staff } from "@/v2/pages/Staff";
import { Route } from "react-router-dom";

export const v2Routes = [
  <Route
    key='dashboard'
    path=''
    element={<Dashboard />}
  />,
  <Route
    key='dashboard'
    path='v2/dashboard'
    element={<Dashboard />}
  />,
  <Route
    key='daily-tasks'
    path='v2/daily-tasks'
    element={<Dashboard />}
  />,
  <Route
    key='clients'
    path='v2/clients'
    element={<Client />}
  />,
  <Route
    key='staff'
    path='v2/staff'
    element={<Staff />}
  />,
  <Route
    key='care-workers'
    path='v2/care-workers'
    element={<Dashboard />}
  />,
  <Route
    key='training'
    path='v2/training'
    element={<Dashboard />}
  />,
  <Route
    key='help-and-support'
    path='v2/help-and-support'
    element={<Dashboard />}
  />,
  <Route
    key='settings'
    path='v2/settings'
    element={<Dashboard />}
  />,
  <Route
    key='client/id/basic'
    path='v2/client/:id/basic'
    element={<BasicForm />}
  />,
  <Route
    key='client/id/identification'
    path='v2/client/:id/identification'
    element={<IdentificationForm />}
  />,
  <Route
    key='client/id/background'
    path='v2/client/:id/background'
    element={<BackgroundForm />}
  />,
  <Route
    key='client/id/council'
    path='v2/client/:id/council'
    element={<CouncilForm />}
  />,
  <Route
    key='client/id/others'
    path='v2/client/:id/others'
    element={<OthersForm />}
  />,
  <Route
    key='client/id/others'
    path='v2/client/:id/rota'
    element={<ClientRota />}
  />,
  <Route
    key='client/calendar'
    path='v2/calendar'
    element={<Calendar />}
  />,
];
