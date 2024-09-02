import { Link, useLocation } from 'react-router-dom';
// =============================================
import constants from '../../../constants';
// =============================================
import Logotype from '../../Logotype/Logotype';
// =============================================
import styles from './AuthHeader.module.sass';

function AuthHeader() {
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/login';

  function renderLogotype() {
    return (
      <Logotype
        src={`${constants.IMAGE_PATHS.STATIC}logo.png`}
        alt="logo"
      />
    );
  }

  function renderAuthLink() {
    return (
      <Link
        to={isLoginPage ? '/registration' : '/login'}
        style={{ textDecoration: 'none' }}
      >
        <span>{isLoginPage ? 'Signup' : 'Login'}</span>
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.headerAuthPage}>
          {renderLogotype()}
          <div className={styles.linkAuthContainer}>
            {renderAuthLink()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthHeader;
