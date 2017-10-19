import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails", placeholder: "abc@def.com, 123@456.com, xyz@gg.com" }
];

const fields = FIELDS.map(({ label, name, placeholder }, index) => {
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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  errors.emails = validateEmails(values.emails || '');

  FIELDS.forEach(({ name }) => {
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
  form: "surveyForm"
})(SurveyForm);
