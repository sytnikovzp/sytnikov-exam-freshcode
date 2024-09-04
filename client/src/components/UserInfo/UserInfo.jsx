import { useDispatch, useSelector } from 'react-redux';
// =============================================
import { updateUser } from '../../store/slices/userSlice';
import { changeEditModeOnUserProfile } from '../../store/slices/userProfileSlice';
// =============================================
import constants from '../../constants';
// =============================================
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
// =============================================
import styles from './UserInfo.module.sass';

function UserInfo() {
  const dispatch = useDispatch();

  const { data, isEdit } = useSelector((state) => ({
    data: state.userStore.data,
    isEdit: state.userProfile.isEdit,
  }));

  const updateUserData = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    dispatch(updateUser(formData));
  };

  const handleEditModeChange = () => {
    dispatch(changeEditModeOnUserProfile(!isEdit));
  };

  const { avatar, firstName, lastName, displayName, email, role, balance } =
    data;

  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <div className={styles.infoContainer}>
          <img
            src={
              avatar === 'anon.png'
                ? constants.IMAGE_PATHS.ANONYM
                : `${constants.PUBLIC_URL}${avatar}`
            }
            className={styles.avatar}
            alt="user"
          />
          <div className={styles.infoContainer}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>First Name</span>
              <span className={styles.info}>{firstName}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Last Name</span>
              <span className={styles.info}>{lastName}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Display Name</span>
              <span className={styles.info}>{displayName}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Email</span>
              <span className={styles.info}>{email}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Role</span>
              <span className={styles.info}>{role}</span>
            </div>
            {role === constants.USER_ROLES.CREATOR && (
              <div className={styles.infoBlock}>
                <span className={styles.label}>Balance</span>
                <span className={styles.info}>{`${balance}$`}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div onClick={handleEditModeChange} className={styles.buttonEdit}>
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
}

export default UserInfo;
