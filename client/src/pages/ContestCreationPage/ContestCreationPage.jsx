import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// =============================================
import { saveContestToStore } from '../../store/slices/contestCreationSlice';
// =============================================
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
// =============================================
import styles from './ContestCreationPage.module.sass';

function ContestCreationPage({ contestType, title }) {
  const formRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contestCreationStore = useSelector(
    (state) => state.contestCreationStore
  );
  const bundleStore = useSelector((state) => state.bundleStore);

  const contestData = contestCreationStore.contests[contestType]
    ? contestCreationStore.contests[contestType]
    : { contestType };

  const handleSubmit = (values) => {
    dispatch(saveContestToStore({ type: contestType, info: values }));
    const route =
      bundleStore.bundle[contestType] === 'payment'
        ? '/payment'
        : `/startContest/${bundleStore.bundle[contestType]}Contest`;
    navigate(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (!bundleStore.bundle) {
      navigate('/startContest', { replace: true });
    }
  }, [bundleStore, navigate]);

  return (
    <div>
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestCreationPage;
