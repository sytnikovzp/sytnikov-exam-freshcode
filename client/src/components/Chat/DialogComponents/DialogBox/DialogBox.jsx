import classNames from 'classnames';
// =============================================
import { IMAGE_PATHS, SERVER_CONFIG, CHAT_MODES } from '../../../../constants';
// =============================================
import styles from './DialogBox.module.sass';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const { favoriteList, participants, blackList, _id, text, createAt } =
    chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            _id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <img
        src={
          interlocutor.avatar === 'anon.png'
            ? IMAGE_PATHS.ANONYM
            : `${SERVER_CONFIG.PUBLIC_URL}${interlocutor.avatar}`
        }
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            onClick={(event) =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
          />
          <i
            onClick={(event) =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
                event
              )
            }
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
          />
          <i
            onClick={(event) => catalogOperation(event, _id)}
            className={classNames({
              'far fa-plus-square': chatMode !== CHAT_MODES.CATALOG,
              'fas fa-minus-circle': chatMode === CHAT_MODES.CATALOG,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
