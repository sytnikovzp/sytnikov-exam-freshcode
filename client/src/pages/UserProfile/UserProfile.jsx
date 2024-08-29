import { connect } from 'react-redux';
import classNames from 'classnames';
// =============================================
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';
// =============================================
import CONSTANTS from '../../constants';
// =============================================
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
// =============================================
import styles from './UserProfile.module.sass';

const UserProfile = (props) => {
  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    props.cashOut({
      number,
      expiry,
      cvc,
      sum,
    });
  };

  const {
    balance,
    role,
    profileViewMode,
    changeProfileViewMode,
    error,
    clearPaymentStore,
  } = props;
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]:
                  profileViewMode === CONSTANTS.UI_MODES.USER_INFO,
              })}
              onClick={() =>
                changeProfileViewMode(CONSTANTS.UI_MODES.USER_INFO)
              }
            >
              UserInfo
            </div>
            {role === CONSTANTS.USER_ROLES.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]:
                    profileViewMode === CONSTANTS.UI_MODES.CASHOUT,
                })}
                onClick={() =>
                  changeProfileViewMode(CONSTANTS.UI_MODES.CASHOUT)
                }
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileViewMode === CONSTANTS.UI_MODES.USER_INFO ? (
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
                    clearError={clearPaymentStore}
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
};

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data;
  const { profileViewMode } = state.userProfile;
  const { error } = state.payment;
  return {
    balance,
    role,
    profileViewMode,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cashOut: (data) => dispatch(cashOut(data)),
  changeProfileViewMode: (data) => dispatch(changeProfileViewMode(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
