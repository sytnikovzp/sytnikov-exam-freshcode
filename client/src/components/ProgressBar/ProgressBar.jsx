import styles from './ProgressBar.module.sass';

function ProgressBar({ currentStep }) {
  function renderProgress() {
    return [1, 2, 3].map((count) => renderBar(count));
  }

  function renderBar(count) {
    let classOuter = styles.outerNotActive;
    let classInner = styles.innerNotActive;
    let classProgress = '';

    if (count === currentStep) {
      classOuter = styles.outerActive;
      classInner = styles.innerActive;
      classProgress = styles.progressContainer;
    } else if (count < currentStep) {
      classOuter = styles.outerComplete;
      classInner = styles.innerComplete;
    }

    return (
      <div className={classProgress} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count !== 3 && <div className={styles.lineBar} />}
        </div>
      </div>
    );
  }

  return <div className={styles.progressBarContainer}>{renderProgress()}</div>;
}

export default ProgressBar;
