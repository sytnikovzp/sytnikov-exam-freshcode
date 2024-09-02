import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

function FormInput({ classes, label, name, ...rest }) {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        const { touched, error } = meta;

        const inputClassName = classNames(classes.input, {
          [classes.notValid]: touched && error,
          [classes.valid]: touched && !error,
        });

        return (
          <div className={classes.container}>
            <input
              type="text"
              {...field}
              placeholder={label}
              className={inputClassName}
              {...rest}
            />
            <ErrorMessage
              name={name}
              component="span"
              className={classes.warning}
            />
          </div>
        );
      }}
    </Field>
  );
}

export default FormInput;
