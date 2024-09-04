import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// =============================================
import { clearUserError } from '../../store/slices/userSlice';
// =============================================
import Schems from '../../utils/validators/validationSchems';
// =============================================
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
// =============================================
import styles from './UpdateUserInfoForm.module.sass';

function UpdateUserInfoForm({ onSubmit, submitting }) {
  const dispatch = useDispatch();

  const { data, error } = useSelector((state) => ({
    data: state.userStore.data,
    error: state.userStore.error,
  }));

  const handleClearUserError = () => {
    dispatch(clearUserError());
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
      }}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={handleClearUserError}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="Last Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}

export default UpdateUserInfoForm;
