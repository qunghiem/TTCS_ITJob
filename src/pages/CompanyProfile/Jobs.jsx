import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './CompanyProfile.module.scss';
import JobItem from '~/components/JobItem';
import Button from '~/components/Button';
import Rate from '~/components/Rate';
import config from '~/config';
import { useReduxSelector } from '~/redux/selectors';
import { filtersSlice } from '~/redux/slices';

const cx = classNames.bind(styles);

function Jobs({ currentCompany = {}, setType }) {
  const dispatch = useDispatch();
  const { jobList } = useReduxSelector();
  const navigate = useNavigate();

  const currentJobList = jobList.filter((job) => job.companyId === currentCompany.id);

  const handleSearchJobs = useCallback((skill) => {
    // reset searchTextError
    dispatch(filtersSlice.actions.searchTextErrorChange(false));

    // set value for searchText & location
    dispatch(filtersSlice.actions.searchFilterChange(skill));
    dispatch(filtersSlice.actions.locationFilterChange('All Cities'));

    // navigate to job page
    navigate(config.routes.jobs);
  }, []);

  const handleDelay = useCallback(() => alert('Sorry! This function has not been developed.'), []);

  const handleSetType = useCallback(() => setType('review'), []);

  return (
    <>
      {/* left side */}
      <div className={cx('left-side')}>
        {/* company job list */}
        {currentJobList?.length > 0 && (
          <div className={cx('content-left_item')}>
            <h3 className={cx('content-title')}>{currentCompany.name} Jobs</h3>
            {currentJobList.length > 0 && currentJobList.map((job, index) => <JobItem key={index} data={job} />)}
          </div>
        )}

        {/* company overview */}
        <div className={cx('content-left_item')}>
          {currentCompany.overview && (
            <>
              <h3 className={cx('content-title')}>Overview about {currentCompany.name}</h3>
              {currentCompany.overview?.map((item, index) => (
                <div key={index}>
                  <h4 className={cx('content-subtitle')}>{item.subTitle}</h4>
                  {item.content?.map((item2, index2) => (
                    <p key={index2}>{item2}</p>
                  ))}
                </div>
              ))}
            </>
          )}

          {currentCompany.skills && (
            <>
              <h3 className={cx('content-title')}>{currentCompany.skills?.title || 'Latest Technology We Trust'}</h3>
              <div className={cx('skill-list')}>
                {currentCompany.skills.list?.map((skill, index) => (
                  <Button key={index} basic onClick={() => handleSearchJobs(skill)}>
                    {skill}
                  </Button>
                ))}
              </div>
              <ul className={cx('list-item')}>
                {currentCompany.skills.detail?.length > 1 ? (
                  currentCompany.skills.detail?.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                  <p>{currentCompany.skills.detail}</p>
                )}
              </ul>
            </>
          )}
        </div>

        {/* company benefits */}
        {currentCompany.benefit && (
          <div className={cx('content-left_item')}>
            <h3 className={cx('content-title')}>Why You'll Love Working Here</h3>
            <div className={cx('list-item', 'benefit')}>
              {currentCompany.benefit.hightlight?.map((item, index) => (
                <div key={index}>
                  <span>{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className={cx('company-photos')}>
              <img src={currentCompany.images[0]} alt="company_img" />
            </div>

            <h4 className={cx('content-subtitle')}>{currentCompany.benefit.title}</h4>
            <ul className={cx('list-item')}>
              {currentCompany.benefit.detail?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* right side */}
      {!currentCompany.review || currentCompany.review.length === 0 ? (
        <div>
          <div className={cx('content-right_item')}>
            <h3 className={cx('content-title')}>Let your voice be heard.</h3>
            <div>
              <p className={cx('review-title')}>Review {currentCompany.name} now</p>
              <Button primary xl onClick={handleDelay}>
                Write review
              </Button>
            </div>
          </div>
        </div>
      ) : currentCompany.review.length < 4 ? (
        <div>
          <div className={cx('content-right_item')}>
            <h3 className={cx('content-title')}>Top Reviews</h3>
            {currentCompany.review?.map((review, index) => (
              <div key={index} className={cx('review-content')}>
                <p className={cx('review-title')}>{review.title}</p>
                <Rate small score={review.score} background />
                <p className={cx('review-comment')}>{review.comment}</p>
              </div>
            ))}
            <Button primary xl onClick={handleDelay}>
              Write review
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={cx('content-right_item')}>
            <h3 className={cx('content-title')}>Overall Rating</h3>
            <div className={cx('overall-rating')}>
              <Rate big score={currentCompany.recommendation.overallScore} background />
              <span className={cx('overall-score')}>{currentCompany.recommendation.overallScore}</span>
            </div>
            <div className={cx('rating-overall')}>
              <div className={cx('rating-ratio')}>{currentCompany.recommendation.ratio}%</div>
              <div className={cx('rating-comment')}>Recommend working here to a friend</div>
            </div>
            <div className={cx('rating-detail')}>
              {currentCompany.recommendation.detail?.map((item, index) => (
                <div key={index} className={cx('rating-item')}>
                  <span>{item.title}</span>
                  <div className={cx('rating-item_score')}>
                    <Rate small score={item.score} />
                    <span>{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button primary xl onClick={handleSetType}>
                See all ratings and reviews
              </Button>
            </div>
          </div>

          <div className={cx('content-right_item')}>
            <h3 className={cx('content-title')}>Top Reviews</h3>
            {currentCompany.review?.slice(0, 3).map((review, index) => (
              <div key={index} className={cx('review-content')}>
                <p className={cx('review-title')}>{review.title}</p>
                <Rate small score={review.score} background />
                <p className={cx('review-comment')}>{review.comment}</p>
              </div>
            ))}
            <Button primary xl onClick={handleDelay}>
              Write review
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

Jobs.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  setType: PropTypes.func,
};

export default memo(Jobs);
