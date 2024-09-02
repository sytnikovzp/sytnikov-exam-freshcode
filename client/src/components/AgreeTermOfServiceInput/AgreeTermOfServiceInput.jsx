import { Field } from 'formik';

function AgreeTermOfServiceInput({ id, type, classes, label, ...rest }) {
  return (
    <Field {...rest}>
      {({ meta, field }) => {
        const { touched, error } = meta;

        return (
          <div>
            <div className={classes.container}>
              <input {...field} placeholder={label} id={id} type={type} />
              <label htmlFor={id}>
                By clicking this checkbox, you agree to our{' '}
                <a href="#" target="_blank" rel="noreferrer">
                  Terms of Service.
                </a>
              </label>
            </div>
            {touched && error && (
              <span className={classes.warning}>{error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default AgreeTermOfServiceInput;
