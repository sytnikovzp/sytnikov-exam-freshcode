import { Outlet, useLocation } from 'react-router-dom';
// =============================================
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RegistrationFooter from '../../components/Layout/RegistrationFooter/RegistrationFooter';
import AuthHeader from '../../components/Layout/AuthHeader/AuthHeader';
// =============================================
import styles from './Layout.module.sass';

function Layout() {
  const { pathname } = useLocation();

  const isRegisterPathname = pathname === '/registration';
  const isAuthPathname = pathname === '/login' || isRegisterPathname;

  const renderHeader = () => {
    return isAuthPathname ? <AuthHeader /> : <Header />;
  };

  const renderFooter = () => {
    if (isRegisterPathname) return <RegistrationFooter />;
    if (!isAuthPathname) return <Footer />;
    return null;
  };

  return (
    <div className={styles.container}>
      {renderHeader()}
      <div className={styles.content}>
        <Outlet />
      </div>
      {renderFooter()}
    </div>
  );
}

export default Layout;
