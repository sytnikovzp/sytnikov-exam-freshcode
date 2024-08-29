import { Outlet, useLocation } from 'react-router-dom';
// =============================================
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RegistrationFooter from '../../components/Layout/RegistrationFooter/RegistrationFooter';
import AuthHeader from '../../components/Layout/AuthHeader/AuthHeader';
// =============================================
import styles from './Layout.module.sass';

const Layout = () => {
  const { pathname } = useLocation();

  const isRegisterPathname = pathname === '/registration';
  const isAuthPathname = pathname === '/login' || isRegisterPathname;

  return (
    <div className={styles.container}>
      {isAuthPathname && <AuthHeader />}
      {!isAuthPathname && <Header />}
      <div className={styles.content}>
        <Outlet />
      </div>
      {!isAuthPathname && <Footer />}
      {isRegisterPathname && <RegistrationFooter />}
    </div>
  );
};

export default Layout;
