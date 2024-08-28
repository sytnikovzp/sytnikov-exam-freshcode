import { Link, useLocation } from 'react-router-dom';
// =============================================
import { IMAGE_PATHS } from '../../../constants';
// =============================================
import Logo from '../../Logo';
// =============================================
import styles from './AuthHeader.module.sass';

const AuthHeader = () => {
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/login';

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.headerAuthPage}>
          <Logo src={`${IMAGE_PATHS.STATIC}logo.png`} alt="logo" />
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
