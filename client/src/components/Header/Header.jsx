import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// =============================================
import { clearUserStore, getUser } from '../../store/slices/userSlice';
// =============================================
import constants from '../../constants';
// =============================================
import styles from './Header.module.sass';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userStore.data);
  const isFetching = useSelector((state) => state.userStore.isFetching);

  useEffect(() => {
    if (!data) {
      dispatch(getUser());
    }
  }, [data, dispatch]);

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    navigate('/login', { replace: true });
  };

  const startContests = () => {
    navigate('/startContest');
  };

  const renderLoginButtons = () => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                data.avatar === 'anon.png'
                  ? constants.IMAGE_PATHS.ANONYM
                  : `${constants.PUBLIC_URL}${data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img
              src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logOut();
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <img
            src={`${constants.IMAGE_PATHS.STATIC}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>Login</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>Sign Up</span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="#">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${constants.IMAGE_PATHS.STATIC}phone.png`} alt="phone" />
          <a href="tel:+8773553585">
            <span>(877)&nbsp;355-3585</span>
          </a>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src={`${constants.IMAGE_PATHS.STATIC}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>

        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>Name Ideas</span>
                <img
                  src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Beauty</a>
                  </li>
                  <li>
                    <a href="#">Consulting</a>
                  </li>
                  <li>
                    <a href="#">E-Commerce</a>
                  </li>
                  <li>
                    <a href="#">Fashion & Clothing</a>
                  </li>
                  <li>
                    <a href="#">Finance</a>
                  </li>
                  <li>
                    <a href="#">Real Estate</a>
                  </li>
                  <li>
                    <a href="#">Tech</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Contests</span>
                <img
                  src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">How It Works</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">Agency Service</a>
                  </li>
                  <li>
                    <a href="#">Active Contests</a>
                  </li>
                  <li>
                    <a href="#">Winners</a>
                  </li>
                  <li>
                    <a href="#">Leaderboard</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Become A Creative</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img
                  src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Names</a>
                  </li>
                  <li>
                    <a href="#">Taglines</a>
                  </li>
                  <li>
                    <a href="#">Logos</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Testimonials</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img
                  src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Popular Names</a>
                  </li>
                  <li>
                    <a href="#">Short Names</a>
                  </li>
                  <li>
                    <a href="#">Intriguing Names</a>
                  </li>
                  <li>
                    <a href="#">Names By Category</a>
                  </li>
                  <li>
                    <a href="#">Visual Name Search</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Sell Your Domains</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img
                  src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Ultimate Naming Guide</a>
                  </li>
                  <li>
                    <a href="#">Poetic Devices In Business Naming</a>
                  </li>
                  <li>
                    <a href="#">Crowded Bar Theory</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">All Articles</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {data && data.role !== constants.USER_ROLES.CREATOR && (
            <div className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
