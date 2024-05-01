import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './CompanyProfile.module.scss';
import Button from '~/components/Button';
import Rate from '~/components/Rate';

const cx = classNames.bind(styles);

function Review({ currentCompany = {} }) {
  const handleDelay = useCallback(() => alert('Sorry! This function has not been developed.'), []);

  return (
    <>
      {currentCompany.recommendation ? (
        <div className={cx('content-left')}>
          <div className={cx('rating-overall_left')}>
            <div className={cx('rating-item_left')}>
              <span className={cx('overall-score')}>{currentCompany.recommendation.overallScore}</span>
              <Rate big score={currentCompany.recommendation.overallScore} background />
            </div>
            <div className={cx('rating-item_left')}>
              <div className={cx('rating-ratio')}>{currentCompany.recommendation.ratio}%</div>
              <div className={cx('rating-comment')}>Recommend working here to a friend</div>
            </div>
          </div>

          <div className={cx('content-left_item')}>
            <h3 className={cx('content-title')}>
              {currentCompany.review && currentCompany.review?.length} Employee Reviews
            </h3>
            {currentCompany.review &&
              currentCompany.review?.map((item, index) => (
                <div className={cx('review-comment')} key={index}>
                  <h3 className={cx('comment-title')}>{item.title}</h3>
                  <Rate small score={item.score} />
                  <span>{item.comment}</span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className={cx('write-review')}>
          <h3 className={cx('content-title')}>Let your voice be heard.</h3>
          <div>
            <p className={cx('review-title')}>Review {currentCompany.name} now</p>
            <Button primary xl onClick={handleDelay}>
              Write review
            </Button>
          </div>
        </div>
      )}

      {!!currentCompany.recommendation && (
        <div className={cx('content-right_item')}>
          <h3 className={cx('content-title')}>Let your voice be heard.</h3>
          <div>
            <p className={cx('review-title')}>Review {currentCompany.name} now</p>
            <Button primary xl onClick={handleDelay}>
              Write review
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

Review.propTypes = {
  currentCompany: PropTypes.object.isRequired,
};

export default memo(Review);
