import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

function PayInput({
  label,
  changeFocus,
  classes,
  isInputMask,
  mask,
  ...props
}) {
  const [field, meta] = useField(props.name);
  const { touched, error } = meta;

  const inputClassName = classNames(classes.input, {
    [classes.notValid]: touched && error,
  });

  const commonProps = {
    ...field,
    placeholder: label,
    className: inputClassName,
    onFocus: () => changeFocus(field.name),
  };

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input {...commonProps} />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {isInputMask ? (
        <InputMask mask={mask} maskChar={null} {...commonProps} />
      ) : (
        <input {...commonProps} />
      )}
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
}

export default PayInput;
