import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// =============================================
import Router from './router';
// =============================================
import browserHistory from './browserHistory';
// =============================================
import constants from './constants';
// =============================================
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HomePage from './pages/HomePage/HomePage';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import ContestCreationPage from './pages/ContestCreationPage/ContestCreationPage';
import Layout from './pages/Layout/Layout';
// =============================================
import NotFound from './components/NotFound/NotFound';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import OnlyNotAuthorizedUserRoute from './components/Routes/OnlyNotAuthorizedUserRoute/OnlyNotAuthorizedUserRoute';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
// =============================================
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route element={<OnlyNotAuthorizedUserRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/startContest" element={<StartContestPage />} />
            <Route
              path="/startContest/nameContest"
              element={
                <ContestCreationPage
                  contestType={constants.CONTEST_TYPES.NAME}
                  title="Company Name"
                />
              }
            />
            <Route
              path="/startContest/taglineContest"
              element={
                <ContestCreationPage
                  contestType={constants.CONTEST_TYPES.TAGLINE}
                  title="TAGLINE"
                />
              }
            />
            <Route
              path="/startContest/logoContest"
              element={
                <ContestCreationPage
                  contestType={constants.CONTEST_TYPES.LOGO}
                  title="LOGO"
                />
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contest/:id" element={<ContestPage />} />
            <Route path="/account" element={<UserProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ChatContainer />
    </Router>
  );
}

export default App;
