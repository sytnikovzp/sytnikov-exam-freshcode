import constants from '../../constants';
// =============================================
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import Spinner from '../Spinner/Spinner';
// =============================================
import styles from '../ContestForm/ContestForm.module.sass';

const OptionalSelects = (props) => {
  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case constants.CONTEST_TYPES.NAME: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="type of company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.nameStyle}
          />
        </>
      );
    }
    case constants.CONTEST_TYPES.LOGO: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Brand Style"
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case constants.CONTEST_TYPES.TAGLINE: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Type tagline"
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
  }
};

export default OptionalSelects;
