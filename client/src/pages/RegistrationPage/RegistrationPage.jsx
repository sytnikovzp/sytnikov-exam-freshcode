import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// =============================================
import { clearAuthError } from '../../store/slices/authSlice';
// =============================================
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
// =============================================
import styles from './RegistrationPage.module.sass';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(clearAuthError());

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <RegistrationForm navigate={navigate} />
      </div>
    </div>
  );
};

export default RegistrationPage;
