import styles from './Error.module.sass';

function Error({ status, data, clearError }) {
  const getMessage = () => {
    switch (status) {
      case 404:
      case 409:
      case 406:
        return data || 'Error occurred';
      case 400:
        return 'Check the input data';
      case 403:
        return 'Bank declined transaction';
      default:
        return data;
    }
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i
        className="far fa-times-circle"
        onClick={clearError}
        role="button"
        aria-label="Close error"
      />
    </div>
  );
}

export default Error;
