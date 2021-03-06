import React, { Component } from 'react';
// reduxForm is similar to connect helper in react-redux
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.createPost(values)
    // navigate to root route "/".  this has props.history due to being
    // in Route componenet in src/index.js
      .then(() => this.props.history.push('/'));

  }

  // this field argument includes event handlers
  renderField(field) {
    // equivalent to touched = field.meta.touched, error = field.meta.error
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        {/* need to put htmlFor tag on the label to help associate it with the input */}
        <label htmlFor={field.label}>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {/* touched means its been touched and focused out */}
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    // this is redux-form componenet being passed the props of the react component
    const { handleSubmit } = this.props;

    return (
      // handleSubmit verifies the fields, if no errors calls onSubmit
      // make sure to bind this to this function in the constructor
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {/* passing any property name here will have access to field arg above */}
        <Field
          label="Title"
          name="title"
          // component takes a component or a function that the Field will display
          // The Field componenet will call this function, no need to call it here
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// this will be called when form is submitted
function validate(values) {
  // values will be an object => {title: "asdf", categories: "asdf", content: "asdf"}
  // always start with const errors
  const errors = {};

  // validate the inputs from 'values'.  the name must be identical to name of Field
  // errors.title corresponds to name="title" in the componenet
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories!';
  }
  if (!values.content) {
    errors.content = 'Enter a content please!';
  }

  // If errors is empty, the form is fine to submit.
  // only if errors has any property, it will invalidate the form
  // this errors object is added to componenet as field.meta.errors
  return errors;
}

// will pass a function in reduxForm, the string for form will need to be unique
export default reduxForm({
  // validate: validate, es6
  validate,
  form: 'PostsNewForm',
})(
  connect(null, { createPost })(PostNew),
);
