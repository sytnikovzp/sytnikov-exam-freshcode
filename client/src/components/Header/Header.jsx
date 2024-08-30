import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// =============================================
import { clearUserStore, getUser } from '../../store/slices/userSlice';
// =============================================
import constants from '../../constants';
// =============================================
import withRouter from '../../hocs/withRouter';
// =============================================
import styles from './Header.module.sass';

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.navigate('/login', { replace: true });
  };

  startContests = () => {
    this.props.navigate('/startContest');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? constants.IMAGE_PATHS.ANONYM
                  : `${constants.PUBLIC_URL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
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
                <span onClick={this.logOut}>Logout</span>
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
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
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
            <span>(877)&nbsp;355-3585</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <img
            src={`${constants.IMAGE_PATHS.STATIC}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
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
                  <span>CONTESTS</span>
                  <img
                    src={`${constants.IMAGE_PATHS.STATIC}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="#">HOW IT WORKS</a>
                    </li>
                    <li>
                      <a href="#">PRICING</a>
                    </li>
                    <li>
                      <a href="#">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href="#">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="#">WINNERS</a>
                    </li>
                    <li>
                      <a href="#">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="#">BECOME A CREATIVE</a>
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
                      <a href="#">NAMES</a>
                    </li>
                    <li>
                      <a href="#">TAGLINES</a>
                    </li>
                    <li>
                      <a href="#">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="#">TESTIMONIALS</a>
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
                      <a href="#">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="#">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="#">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="#">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="#">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="#">SELL YOUR DOMAINS</a>
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
                      <a href="#">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href="#">POETIC DEVICES IN BUSINESS NAMING</a>
                    </li>
                    <li>
                      <a href="#">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="#">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.data &&
              this.props.data.role !== constants.USER_ROLES.CREATOR && (
                <div
                  className={styles.startContestBtn}
                  onClick={this.startContests}
                >
                  START CONTEST
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
