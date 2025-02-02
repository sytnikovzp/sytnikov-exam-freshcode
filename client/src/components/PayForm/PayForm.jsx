import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import Cards from 'react-credit-cards-2';
// =============================================
import Schems from '../../utils/validators/validationSchems';
// =============================================
import { changeFocusOnCard } from '../../store/slices/paymentSlice';
// =============================================
import PayInput from '../InputComponents/PayInput/PayInput';
// =============================================
import styles from './PayForm.module.sass';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PayForm({ sendRequest, isPayForOrder, back }) {
  const dispatch = useDispatch();
  const focusOnElement = useSelector((state) => state.payment.focusOnElement);

  const handleChangeFocusOnCard = (name) => {
    dispatch(changeFocusOnCard(name));
  };

  const handlePay = (values) => {
    sendRequest(values);
  };

  return (
    <div className={styles.payFormContainer}>
      <span className={styles.headerInfo}>Payment Information</span>
      <Formik
        initialValues={{
          focusOnElement: '',
          name: '',
          number: '',
          cvc: '',
          expiry: '',
          sum: '',
        }}
        onSubmit={handlePay}
        validationSchema={Schems.PaymentSchema}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;

          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  number={number || ''}
                  name={name || ''}
                  expiry={expiry || ''}
                  cvc={cvc || ''}
                  focused={focusOnElement}
                />
              </div>
              <Form id="paymentForm" className={styles.formContainer}>
                <div className={styles.bigInput}>
                  <span>Name</span>
                  <PayInput
                    name="name"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="Name"
                    changeFocus={handleChangeFocusOnCard}
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <span>Sum</span>
                    <PayInput
                      name="sum"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="Sum"
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <span>Card Number</span>
                  <PayInput
                    isInputMask
                    mask="9999 9999 9999 9999"
                    name="number"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="Card Number"
                    changeFocus={handleChangeFocusOnCard}
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <span>* Expires</span>
                    <PayInput
                      isInputMask
                      mask="99/99"
                      name="expiry"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="Expiry"
                      changeFocus={handleChangeFocusOnCard}
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <span>* Security Code</span>
                    <PayInput
                      isInputMask
                      mask="999"
                      name="cvc"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="CVC"
                      changeFocus={handleChangeFocusOnCard}
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {isPayForOrder && (
        <div className={styles.totalSum}>
          <span>Total: $100.00</span>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button form="paymentForm" className={styles.payButton} type="submit">
          <span>{isPayForOrder ? 'Pay Now' : 'Cash Out'}</span>
        </button>
        {isPayForOrder && (
          <div onClick={back} className={styles.backButton}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PayForm;
