import { ClipLoader } from 'react-spinners';
// =============================================
import styles from './Spinner.module.sass';

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      sizeUnit="px"
      // css={override}
      size={50}
      color="#46568a"
      loading
    />
  </div>
);

export default SpinnerLoader;
