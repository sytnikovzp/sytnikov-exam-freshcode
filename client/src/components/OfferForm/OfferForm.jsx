import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
// =============================================
import {
  addOffer,
  clearAddOfferError,
} from '../../store/slices/contestByIdSlice';
// =============================================
import constants from '../../constants';
// =============================================
import Schems from '../../utils/validators/validationSchems';
// =============================================
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
// =============================================
import styles from './OfferForm.module.sass';

const OfferForm = (props) => {
  const renderOfferInput = () => {
    if (props.contestType === constants.CONTEST_TYPES.LOGO) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    props.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.createOffer(data);
    resetForm();
  };

  const { valid, addOfferError, clearOfferError } = props;
  const validationSchema =
    props.contestType === constants.CONTEST_TYPES.LOGO
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {valid && (
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createOffer: (data) => dispatch(addOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
