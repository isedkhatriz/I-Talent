import React from "react";
import PropTypes from "prop-types";
import ExperienceFormView from "./ExperienceFormView";

import {
  FieldPropType,
  FormInstancePropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

/**
 *  ExperienceForm(props)
 *  Controller for the ExperienceFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each experience item the user creates in the qualifications form.
 */
const ExperienceForm = ({
  form,
  fieldElement,
  removeElement,
  savedExperience,
  checkIfFormValuesChanged,
  attachmentNames,
}) => {
  return (
    <ExperienceFormView
      form={form}
      fieldElement={fieldElement}
      removeElement={removeElement}
      savedExperience={savedExperience}
      checkIfFormValuesChanged={checkIfFormValuesChanged}
      attachmentNames={attachmentNames}
    />
  );
};

ExperienceForm.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedExperience: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      startDate: PropTypes.oneOfType([PropTypes.object]),
      school: PropTypes.string,
    })
  ).isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

export default ExperienceForm;
