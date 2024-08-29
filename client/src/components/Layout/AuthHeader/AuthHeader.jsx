import { Link, useLocation } from 'react-router-dom';
// =============================================
import { IMAGE_PATHS } from '../../../constants';
// =============================================
import Logotype from '../../Logotype/Logotype';
// =============================================
import styles from './AuthHeader.module.sass';

const AuthHeader = () => {
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/login';

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.headerAuthPage}>
          <Logotype src={`${IMAGE_PATHS.STATIC}logo.png`} alt="logo" />
          <div className={styles.linkAuthContainer}>
            <Link
              to={isLoginPage ? '/registration' : '/login'}
              style={{ textDecoration: 'none' }}
            >
              <span>{isLoginPage ? 'Signup' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
