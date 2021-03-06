const { body } = require("express-validator");
const { isUUID, isIn, isMobilePhone } = require("validator");
const moment = require("moment");

const updateProfilePhoneNumberBody = ["telephone", "cellphone"];
const updateProfileNumberBody = ["signupStep"];
const updateProfileStringArrayBody = ["projects", "employmentEquityGroups"];
const updateProfileDateBody = ["actingStartDate", "actingEndDate"];
const updateProfileOptionalLanguageBody = ["firstLanguage", "secondLanguage"];
const updateProfileLanguageBody = ["preferredLanguage"];
const updateProfileBooleanBody = ["interestedInRemote", "exFeeder"];

const updateProfileStringBody = [
  "firstName",
  "lastName",
  "team",
  "linkedin",
  "github",
  "gcconnex",
  "manager",
  "avatarColor",
];

const updateProfileEmploymentBody = ["jobTitle", "branch"];
const updateProfileUUIDArrayBody = [
  "skills",
  "mentorshipSkills",
  "competencies",
  "developmentalGoals",
  "relocationLocations",
];

const updateProfileUUIDBody = [
  "locationId",
  "careerMobilityId",
  "tenureId",
  "securityClearanceId",
  "lookingForANewJobId",
  "talentMatrixResultId",
  "groupLevelId",
  "actingLevelId",
  "employmentInfoId",
];

const updateProfileValidator = [
  updateProfileStringBody.map((i) =>
    body(i)
      .optional()
      .custom((value) => typeof value === "string" || value === null)
      .withMessage("must be a string")
  ),
  updateProfileNumberBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .toInt()
      .isNumeric()
      .withMessage("must be a number")
  ),
  updateProfilePhoneNumberBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .custom((value) => !value || isMobilePhone(value, "en-CA"))
      .withMessage("must be a valid phone number")
  ),
  updateProfileUUIDBody.map((i) =>
    body(i)
      .optional()
      .custom((value) => value === null || isUUID(value))
      .withMessage("must be a UUID or null")
  ),
  updateProfileDateBody.map((i) =>
    body(i)
      .optional()
      .custom((j) => j === null || moment(j).isValid())
      .withMessage("must be a date")
  ),
  updateProfileBooleanBody.map((i) =>
    body(i)
      .optional()
      .customSanitizer((j) => {
        switch (j) {
          case "true":
            return true;
          case "false":
            return false;
          case "null":
            return null;
          default:
            return j;
        }
      })
      .custom((j) => j === null || j === true || j === false)
      .withMessage("must be a boolean or null")
  ),
  updateProfileLanguageBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .isIn(["ENGLISH", "FRENCH"])
      .withMessage("must be 'ENGLISH' or 'FRENCH'")
  ),
  updateProfileOptionalLanguageBody.map((i) =>
    body(i)
      .optional()
      .isIn(["ENGLISH", "FRENCH", null])
      .withMessage("must be 'ENGLISH' or 'FRENCH' or null")
  ),
  updateProfileStringArrayBody.map((i) =>
    body(i)
      .optional()
      .isArray()
      .custom((array) => array.every((j) => typeof j === "string"))
      .withMessage("must be a string array")
  ),
  updateProfileUUIDArrayBody.map((i) =>
    body(i)
      .optional()
      .isArray()
      .custom((array) => array.every((j) => isUUID(j)))
      .withMessage("must be a UUID array")
  ),
  updateProfileEmploymentBody.map((i) =>
    body(i)
      .optional()
      .custom(
        (object) =>
          typeof object === "object" &&
          Object.keys(object).every((key) =>
            ["ENGLISH", "FRENCH"].includes(key)
          )
      )
      .withMessage("must be an object containing ENGLISH or/and FRENCH as keys")
  ),
  body("secondLangProfs")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isIn(i.level, ["A", "B", "C", "E", "X", "NA"]) &&
          isIn(i.proficiency, ["ORAL", "WRITING", "READING"]) &&
          ("date" in i ? i.date === null || moment(i.date).isValid() : true)
      )
    )
    .withMessage(
      "must be an array of containing { proficiency: 'ORAL' | 'WRITING' | 'READING', level: 'A' | 'B' | 'C' | 'E' | 'X' | 'NA', date?: DateTime }"
    ),
  body("educations")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isUUID(i.diplomaId) &&
          isUUID(i.schoolId) &&
          typeof i.ongoingDate === "boolean" &&
          ("startDate" in i
            ? moment(i.startDate).isValid() || i.startDate === null
            : true) &&
          ("endDate" in i
            ? moment(i.endDate).isValid() || i.endDate === null
            : true)
      )
    )
    .withMessage(
      "must be an array of containing { diplomaId: UUID, schoolId: UUID, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean }"
    ),
  body("experiences")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          typeof i.organization === "string" &&
          typeof i.jobTitle === "string" &&
          typeof i.ongoingDate === "boolean" &&
          ("description" in i ? typeof i.organization === "string" : true) &&
          ("startDate" in i ? moment(i.startDate).isValid() : true) &&
          ("endDate" in i ? moment(i.endDate).isValid() : true)
      )
    )
    .withMessage(
      "must be an array of containing { description?: string, jobTitle: string, organization: string, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean }"
    ),
  body("status")
    .optional()
    .trim()
    .isIn(["ACTIVE", "INACTIVE", "HIDDEN"])
    .withMessage("must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'"),
];

module.exports = {
  updateProfileValidator,
};
