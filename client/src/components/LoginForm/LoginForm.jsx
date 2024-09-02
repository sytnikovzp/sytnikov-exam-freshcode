import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
// =============================================
import { checkAuth, clearAuth } from '../../store/slices/authSlice';
// =============================================
import constants from '../../constants';
// =============================================
import Schems from '../../utils/validators/validationSchems';
// =============================================
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
// =============================================
import styles from './LoginForm.module.sass';

function LoginForm({ navigate }) {
  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.auth);
  const submitting = useSelector((state) => state.auth.submitting);

  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
  }, [dispatch]);

  const handleSubmit = (values) => {
    dispatch(
      checkAuth({ data: values, navigate, authMode: constants.AUTH_MODE.LOGIN })
    );
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearAuth())}
        />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
