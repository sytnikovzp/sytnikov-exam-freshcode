import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// =============================================
import { IMAGE_PATHS } from '../../constants';

const Logo = ({ to, ...props }) => (
  <Link to={to}>
    <img {...props} />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  src: `${IMAGE_PATHS.STATIC}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
