import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

const fields = formFields.map(({ label, name, placeholder }, index) => {
  return (
    <Field
      key={index}
      label={label}
      name={name}
      placeholder={placeholder}
      type="text"
      component={SurveyField}
    />
  );
});

class SurveyForm extends Component {
  renderFields() {
    return <div>{fields}</div>;
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button
            className="btn waves-effect right waves-light"
            type="submit"
            name="action"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

//To make the form component communicate with the store,
//we need to wrap it with reduxForm()
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
