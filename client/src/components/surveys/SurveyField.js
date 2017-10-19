//SurveyField contains logic to render a single
//label and text input
import React from "react";

export default ({ input, label, placeholder, meta: { error, touched } }) => {
  // ...input is equivalent to onchange=input.onChange ,, onBlur=input.onblur.. etc..
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px'}} placeholder={placeholder} />
      <div className="red-text" style={{ marginBottom: '20px'}}> {touched && error}</div>
    </div>
  );
};
