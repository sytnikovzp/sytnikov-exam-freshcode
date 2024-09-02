import { useCallback } from 'react';
import moment from 'moment';
// =============================================
import constants from '../../constants';
// =============================================
import styles from './ContestBox.module.sass';

function ContestBox({ data, goToExtended }) {
  const getTimeStr = useCallback(() => {
    const createdAt = moment(data.createdAt);
    const now = moment();
    const diffInHours = now.diff(createdAt, 'hours');
    const diffInDays = Math.floor(diffInHours / 24);

    let str = '';
    if (diffInDays !== 0) str = `${diffInDays}d `;
    const remainingHours = diffInHours % 24;
    if (remainingHours !== 0) str += `${remainingHours}h`;
    if (str.length === 0) str = 'less than one hour';
    return str;
  }, [data.createdAt]);

  const getPreferenceContest = useCallback(() => {
    if (data.contestType === constants.CONTEST_TYPES.NAME)
      return data.typeOfName;
    if (data.contestType === constants.CONTEST_TYPES.LOGO)
      return data.brandStyle;
    return data.typeOfTagline;
  }, [data]);

  const ucFirstLetter = useCallback(
    (string) => string.charAt(0).toUpperCase() + string.slice(1),
    []
  );

  const { id, title, contestType, prize, count } = data;

  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${constants.IMAGE_PATHS.STATIC}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img
              src={`${constants.IMAGE_PATHS.STATIC}diamond.png`}
              alt="diamond"
            />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img
              src={`${constants.IMAGE_PATHS.STATIC}entrieImage.png`}
              alt="logo"
            />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
}

export default ContestBox;
