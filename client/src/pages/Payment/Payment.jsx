import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
// =============================================
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
// =============================================
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
// =============================================
import styles from './Payment.module.sass';

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contests = useSelector((state) => state.contestCreationStore.contests);
  const error = useSelector((state) => state.payment.error);

  useEffect(() => {
    if (isEmpty(contests)) {
      navigate('/startContest', { replace: true });
    }
  }, [contests, navigate]);

  function handlePay(values) {
    const contestArray = Object.values(contests).map((contest) => ({
      ...contest,
      haveFile: !!contest.file,
    }));

    const { number, expiry, cvc } = values;
    const data = new FormData();
    contestArray.forEach((contest) => data.append('files', contest.file));
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');

    dispatch(
      pay({
        data: {
          formData: data,
        },
        navigate,
      })
    );
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleClearError() {
    dispatch(clearPaymentStore());
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.paymentContainer}>
        <span className={styles.headerLabel}>Checkout</span>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={handleClearError}
          />
        )}
        <PayForm sendRequest={handlePay} back={handleGoBack} isPayForOrder />
      </div>
      <div className={styles.orderInfoContainer}>
        <span className={styles.orderHeader}>Order Summary</span>
        <div className={styles.packageInfoContainer}>
          <span className={styles.packageName}>Package Name: Standard</span>
          <span className={styles.packagePrice}>$100 USD</span>
        </div>
        <div className={styles.resultPriceContainer}>
          <span>Total:</span>
          <span>$100.00 USD</span>
        </div>
        <a href="#">Have a promo code?</a>
      </div>
    </div>
  );
}

export default Payment;
