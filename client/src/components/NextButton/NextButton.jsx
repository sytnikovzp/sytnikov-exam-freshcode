import styles from './NextButton.module.sass';

function NextButton({ submit }) {
  return (
    <div onClick={submit} className={styles.buttonContainer}>
      <span>Next</span>
    </div>
  );
}

export default NextButton;
