import {
  APPLICANT_ID_PARAM_KEY,
  CLIENT_ID_PARAM_KEY,
  SCREENING_ID_PARAM_KEY,
  STAFF_ID_PARAM_KEY,
  TEMPLATE_ID_PARAM_KEY,
} from "@/shared/constants/route";
import { Layout } from "@/v2/components/Layout";
import { AppliedProfile } from "@/v2/components/careWorker/AppliedProfile";
import { AvailabilityComponent } from "@/v2/components/careWorker/Availability";
import { StaffBasicForm } from "@/v2/components/careWorker/BasicForm";
import { ScreeningProfile } from "@/v2/components/careWorker/ScreeningProfile";
import { BackgroundForm } from "@/v2/components/serviceUser/Background";
import { BasicForm } from "@/v2/components/serviceUser/BasicForm";
import { ClientPlanActivity } from "@/v2/components/serviceUser/ClientPlanActivity";
import { CouncilForm } from "@/v2/components/serviceUser/Council";
import { IdentificationForm } from "@/v2/components/serviceUser/Identification";
import { OthersForm } from "@/v2/components/serviceUser/Others";
import { RiskAssessment } from "@/v2/components/serviceUser/RiskAssesment";
import { ServiceUserRecordTab } from "@/v2/components/serviceUser/ServiceUserRecordTab";
import Calendar from "@/v2/pages/Calendar";
import { CarePlanPage } from "@/v2/pages/CarePlan";
import ClientRota from "@/v2/pages/ClientRota";
import { Clients } from "@/v2/pages/Clients";
import { Dashboard } from "@/v2/pages/Dashboard";
import { Logout } from "@/v2/pages/Logout";
import { RecordSettings } from "@/v2/pages/RecordSettings";
import { RiskAssessmentPage } from "@/v2/pages/RiskAssessment";
import SignIn from "@/v2/pages/SignIn";
import { Staff } from "@/v2/pages/Staff";
import { TemplateSettings } from "@/v2/pages/TemplateSettings";
import { Route } from "react-router-dom";

export const v2Routes = [
  <Route
    key='dashboard'
    path=''
    element={<Dashboard />}
  />,
  <Route
    key='dashboard'
    path='v2'
    element={<Dashboard />}
  />,
  <Route
    key='sign-in'
    path='signin'
    element={<SignIn />}
  />,
  <Route
    key='log-out'
    path='logout'
    element={<Logout />}
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
    key='daily-tasks'
    path='v2/docs-and-forms'
    element={<Dashboard />}
  />,
  <Route
    key='clients'
    path='v2/clients'
    element={<Clients />}
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
    key='settings/records'
    path='v2/settings/records'
    element={<RecordSettings />}
  />,
  <Route
    key='settings/profile'
    path='v2/settings/profile'
    element={<Layout></Layout>}
  />,
  <Route
    key='settings/templates'
    path='v2/settings/templates'
    element={<TemplateSettings />}
  />,
  <Route
    key='client/id/tasks'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/tasks`}
    element={<ClientPlanActivity />}
  />,
  <Route
    key='client/id/tasks'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/risk-assessment`}
    element={<RiskAssessment />}
  />,
  <Route
    key='client/id/basic'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/basic`}
    element={<BasicForm />}
  />,
  <Route
    key='staff/id/screening'
    path={`v2/staff/applied/:${APPLICANT_ID_PARAM_KEY}/*`}
    element={<AppliedProfile />}
  />,
  <Route
    key='staff/id/screening'
    path={`v2/staff/screening/:${SCREENING_ID_PARAM_KEY}/*`}
    element={<ScreeningProfile />}
  />,
  <Route
    key='client/id/identification'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/identification`}
    element={<IdentificationForm />}
  />,
  <Route
    key='client/id/background'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/background`}
    element={<BackgroundForm />}
  />,
  <Route
    key='client/id/council'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/council`}
    element={<CouncilForm />}
  />,
  <Route
    key='client/id/others'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/others`}
    element={<OthersForm />}
  />,
  <Route
    key='client/id/records'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/records`}
    element={<ServiceUserRecordTab />}
  />,
  <Route
    key='client/id/care-plan'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/care-plan`}
    element={<CarePlanPage />}
  />,
  <Route
    key='client/id/others'
    path={`v2/client/:${CLIENT_ID_PARAM_KEY}/rota`}
    element={<ClientRota />}
  />,
  <Route
    key='client/id/template'
    path={`v2/client/forms/:${CLIENT_ID_PARAM_KEY}/:${TEMPLATE_ID_PARAM_KEY}`}
    element={<RiskAssessmentPage />}
  />,
  <Route
    key='client/calendar'
    path='v2/roaster'
    element={<Calendar />}
  />,
  <Route
    key='staff/id/basic'
    path={`v2/staff/:${STAFF_ID_PARAM_KEY}/basic`}
    element={<StaffBasicForm />}
  />,
  <Route
    key='staff/id/available'
    path={`v2/staff/:${STAFF_ID_PARAM_KEY}/available`}
    element={<AvailabilityComponent />}
  />,
];
