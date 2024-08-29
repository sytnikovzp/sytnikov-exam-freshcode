import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// =============================================
import { IMAGE_PATHS } from '../../constants';

const Logotype = ({ to, ...props }) => (
  <Link to={to}>
    <img {...props} />
  </Link>
);

Logotype.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logotype.defaultProps = {
  to: '/',
  src: `${IMAGE_PATHS.STATIC}blue-logo.png`,
  alt: 'logo',
};

export default Logotype;
