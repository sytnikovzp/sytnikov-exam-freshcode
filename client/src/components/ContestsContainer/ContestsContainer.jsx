import { useEffect, useCallback } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './ContestContainer.module.sass';

function ContestsContainer({ isFetching, haveMore, loadMore, children }) {
  const scrollHandler = useCallback(
    function () {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (haveMore) {
          loadMore(children.length);
        }
      }
    },
    [haveMore, loadMore, children.length]
  );

  useEffect(
    function () {
      window.addEventListener('scroll', scrollHandler);
      return function () {
        window.removeEventListener('scroll', scrollHandler);
      };
    },
    [scrollHandler]
  );

  if (!isFetching && children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  }

  return (
    <div>
      {children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default ContestsContainer;
