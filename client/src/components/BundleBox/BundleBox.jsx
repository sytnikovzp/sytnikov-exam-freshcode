import constants from '../../constants';
// =============================================
import styles from './BundleBox.module.sass';

function BundleBox({ path, header, describe, setBundle }) {
  const defaultPathToImages = `${constants.IMAGE_PATHS.STATIC}contestLabels/`;

  function renderImage() {
    return path.map((image, index) => (
      <img
        src={`${defaultPathToImages}${image}`}
        key={index}
        className={styles.imgContainer}
        alt={image.replace(/.png/g, 'Contest')}
      />
    ));
  }

  function handleMouseOver() {
    const element = document.getElementById(header);
    const images = element?.querySelectorAll('img');
    images.forEach((img, index) => {
      img.src = `${defaultPathToImages}blue_${path[index]}`;
    });
  }

  function handleMouseOut() {
    const element = document.getElementById(header);
    const images = element?.querySelectorAll('img');
    images.forEach((img, index) => {
      img.src = `${defaultPathToImages}${path[index]}`;
    });
  }

  const backClass = path.length === 1 ? '' : ` ${styles.combinedBundle}`;

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => setBundle(header)}
      id={header}
      className={`${styles.bundleContainer}${backClass}`}
    >
      <div>{renderImage()}</div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
}

export default BundleBox;
