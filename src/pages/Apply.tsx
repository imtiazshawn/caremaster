import { DBS } from "@components/apply/DBS";
import { Documents } from "@components/apply/Documents";
import { EducationHistory } from "@components/apply/EducationHistory";
import { EmploymentHistory } from "@components/apply/EmploymentHistory";
import { EqualMonitoring } from "@components/apply/EqualMonitoring";
import { Introduction } from "@components/apply/Introduction";
import { PersonalDetails } from "@components/apply/PersonalDetails";
import { Questionnaire } from "@components/apply/Questionnaire";
import { Reference } from "@components/apply/Reference";
import { ApplicationLayout } from "@components/layout/ApplicationLayout";
import { Route, Routes } from "react-router-dom";

export const Apply = () => {
  return (
    <ApplicationLayout>
      <div className='m-8 rounded-sm p-4'>
        <Routes>
          <Route
            path='/'
            element={<Introduction />}
          />
          <Route
            path='/introduction'
            element={<Introduction />}
          />
          <Route
            path='/personal-details'
            element={<PersonalDetails />}
          />
          <Route
            path='/questionnaire'
            element={<Questionnaire />}
          />
          <Route
            path='/employment-history'
            element={<EmploymentHistory />}
          />
          <Route
            path='/education-history'
            element={<EducationHistory />}
          />
          <Route
            path='/documents'
            element={<Documents />}
          />
          <Route
            path='/reference'
            element={<Reference />}
          />
          <Route
            path='/equal-monitoring'
            element={<EqualMonitoring />}
          />
          <Route
            path='/dbs'
            element={<DBS />}
          />
        </Routes>
      </div>
    </ApplicationLayout>
  );
};
