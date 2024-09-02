import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// =============================================
import constants from '../../constants';

function Logotype({
  to = '/',
  src = `${constants.IMAGE_PATHS.STATIC}blue-logo.png`,
  alt = 'logo',
  ...restProps
}) {
  return (
    <Link to={to}>
      <img src={src} alt={alt} {...restProps} />
    </Link>
  );
}

Logotype.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Logotype;
