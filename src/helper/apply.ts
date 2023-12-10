import {
  Applicant,
  ApplicationStatus,
  DBSFormItems,
  DocumentItems,
  PersonalDetailsFormItemsCompulsory,
  ReferenceFormItems,
} from "$types/applicants";

export const getApplicationStatus = (
  applicant: Applicant,
  questionnaireIds?: string[],
): ApplicationStatus => {
  const personalDetailsStatus = PersonalDetailsFormItemsCompulsory.every(
    (item) => {
      return (
        applicant[item] !== null &&
        applicant[item] !== undefined &&
        applicant[item] !== ""
      );
    },
  )
    ? "complete"
    : "incomplete";
  const answers = applicant.interview_answers;

  const questionnaireStatus =
    answers &&
    questionnaireIds?.every(
      (id) => typeof answers[id] === "string" && answers[id] !== "",
    ) &&
    applicant.experience &&
    applicant.experience !== ""
      ? "complete"
      : "incomplete";

  const employmentHistory = applicant.employment_history;
  const employmentHistoryStatus =
    Array.isArray(employmentHistory) && employmentHistory.length > 0
      ? "complete"
      : "incomplete";

  const educationHistory = applicant.qualification;
  const educationHistoryStatus =
    Array.isArray(educationHistory) && educationHistory.length > 0
      ? "complete"
      : "incomplete";

  const references = applicant.reference;
  const referencesStatus =
    references &&
    ReferenceFormItems.every(
      (item) => typeof references[item] === "string" && references[item] !== "",
    )
      ? "complete"
      : "incomplete";

  const documents = applicant.documents;
  const documentStatus = DocumentItems.every(
    (item) => documents && typeof documents[item] === "string",
  )
    ? "complete"
    : "incomplete";

  const overallStatus =
    personalDetailsStatus === "complete" &&
    questionnaireStatus === "complete" &&
    employmentHistoryStatus === "complete" &&
    referencesStatus === "complete" &&
    educationHistoryStatus === "complete" &&
    documentStatus === "complete";

  const dbs = applicant.dbs;
  const dbsStatus = DBSFormItems.every(
    (item) => dbs && typeof dbs[item] === "string",
  )
    ? "complete"
    : "incomplete";

  const total = 6;
  const completedCount = [
    personalDetailsStatus,
    questionnaireStatus,
    employmentHistoryStatus,
    referencesStatus,
    educationHistoryStatus,
    documentStatus,
  ].filter((status) => status === "complete").length;

  return {
    overall: overallStatus ? "complete" : "incomplete",
    personalDetails: personalDetailsStatus,
    questionnaire: questionnaireStatus,
    employmentHistory: employmentHistoryStatus,
    references: referencesStatus,
    educationHistory: educationHistoryStatus,
    documents: documentStatus,
    completedCount,
    total,
    dbs: dbsStatus,
  };
};
