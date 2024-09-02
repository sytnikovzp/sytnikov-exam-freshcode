import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
// =============================================
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
// =============================================
import constants from '../../constants';
// =============================================
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
// =============================================
import styles from './CustomerDashboard.module.sass';

function CustomerDashboard({ navigate }) {
  const dispatch = useDispatch();

  const { isFetching, error, contests, customerFilter, haveMore } = useSelector(
    (state) => state.contestsList
  );

  const loadMore = useCallback(
    (startFrom) => {
      dispatch(
        getContests({
          requestData: {
            limit: 8,
            offset: startFrom,
            contestStatus: customerFilter,
          },
          role: constants.USER_ROLES.CUSTOMER,
        })
      );
    },
    [dispatch, customerFilter]
  );

  const getContestsHandler = useCallback(() => {
    dispatch(
      getContests({
        requestData: {
          limit: 8,
          contestStatus: customerFilter,
        },
        role: constants.USER_ROLES.CUSTOMER,
      })
    );
  }, [dispatch, customerFilter]);

  useEffect(() => {
    getContestsHandler();
    return () => {
      dispatch(clearContestsList());
    };
  }, [getContestsHandler, dispatch]);

  useEffect(() => {
    getContestsHandler();
  }, [customerFilter, getContestsHandler]);

  const goToExtended = useCallback(
    (contestId) => {
      navigate(`/contest/${contestId}`);
    },
    [navigate]
  );

  const setContestList = useCallback(() => {
    return contests.map((contest) => (
      <ContestBox data={contest} key={contest.id} goToExtended={goToExtended} />
    ));
  }, [contests, goToExtended]);

  const tryToGetContest = useCallback(() => {
    dispatch(clearContestsList());
    getContestsHandler();
  }, [dispatch, getContestsHandler]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(constants.CONTEST_STATUS.ACTIVE))
          }
          className={classNames({
            [styles.activeFilter]:
              constants.CONTEST_STATUS.ACTIVE === customerFilter,
            [styles.filter]: constants.CONTEST_STATUS.ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(constants.CONTEST_STATUS.FINISHED))
          }
          className={classNames({
            [styles.activeFilter]:
              constants.CONTEST_STATUS.FINISHED === customerFilter,
            [styles.filter]:
              constants.CONTEST_STATUS.FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(constants.CONTEST_STATUS.PENDING))
          }
          className={classNames({
            [styles.activeFilter]:
              constants.CONTEST_STATUS.PENDING === customerFilter,
            [styles.filter]:
              constants.CONTEST_STATUS.PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            navigate={navigate}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
