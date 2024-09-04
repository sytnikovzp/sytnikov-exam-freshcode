import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
// =============================================
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';
// =============================================
import constants from '../../constants';
// =============================================
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
// =============================================
import styles from './UserProfile.module.sass';

function UserProfile() {
  const dispatch = useDispatch();

  const { balance, role, profileViewMode, error } = useSelector((state) => ({
    balance: state.userStore.data.balance,
    role: state.userStore.data.role,
    profileViewMode: state.userProfile.profileViewMode,
    error: state.payment.error,
  }));

  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    dispatch(cashOut({ number, expiry, cvc, sum }));
  };

  const handleProfileViewModeChange = (mode) => {
    dispatch(changeProfileViewMode(mode));
  };

  const clearError = () => {
    dispatch(clearPaymentStore());
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]:
                  profileViewMode === constants.UI_MODES.USER_INFO,
              })}
              onClick={() =>
                handleProfileViewModeChange(constants.UI_MODES.USER_INFO)
              }
            >
              UserInfo
            </div>
            {role === constants.USER_ROLES.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]:
                    profileViewMode === constants.UI_MODES.CASHOUT,
                })}
                onClick={() =>
                  handleProfileViewModeChange(constants.UI_MODES.CASHOUT)
                }
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileViewMode === constants.UI_MODES.USER_INFO ? (
          <UserInfo />
        ) : (
          <div className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <div>
                {error && (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearError}
                  />
                )}
                <PayForm sendRequest={pay} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
