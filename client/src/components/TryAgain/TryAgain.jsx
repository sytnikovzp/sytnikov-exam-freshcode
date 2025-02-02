import styles from './TryAgain.module.sass';

function TryAgain(props) {
  const { getData } = props;

  return (
    <div className={styles.container}>
      <span onClick={() => getData()}>Server Error. Try again</span>
      <i className="fas fa-redo" onClick={() => getData()} />
    </div>
  );
}

export default TryAgain;
