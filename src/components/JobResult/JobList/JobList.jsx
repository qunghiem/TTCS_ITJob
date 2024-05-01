import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './JobList.module.scss';
import CompanySpotlight from './CompanySpotlight';
import JobItem from '~/components/JobItem';
import Pagination from '~/components/Pagination';
import config from '~/config';
import { useReduxSelector } from '~/redux/selectors';
import { jobsSlice, filtersSlice } from '~/redux/slices';

const cx = classNames.bind(styles);

function JobList({ jobList: passedJobList }) {
  const dispatch = useDispatch();
  const {
    headerShrink,
    jobList,
    topCompanyList,
    currentUser,
    searchText,
    searchTextError,
    recommendedJobList,
    location,
  } = useReduxSelector();

  const [currentPage, setCurrentPage] = useState(1);
  const jobListRef = useRef();

  // pagination settings
  const showNavigateButtons = config.pagination.showNavigateButtons;
  const jobsPerPage = config.pagination.jobsPerPage;
  const totalJob = passedJobList.length;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // set current list of jobs to render
  const currentJobList =
    passedJobList.length === 0 && searchTextError
      ? recommendedJobList.slice(0, 5)
      : passedJobList.length === 0 && !searchTextError
      ? []
      : passedJobList.slice(indexOfFirstJob, indexOfLastJob);

  // set title for job list
  let title = '';
  if (window.location.pathname === config.routes.home) {
    title = `${passedJobList.length} Jobs recommended for ${currentUser.fullname}`;
  } else if (window.location.pathname === config.routes.jobs) {
    if (searchTextError && currentJobList.length > 0) {
      title = (
        <>
          <p className={cx('hightlight-text')}>Oops!</p>
          <p className={cx('result-text')}>The job you're looking for doesn't exist.</p>
          <p className={cx('result-text')}>Here are some recommended jobs for you.</p>
        </>
      );
    } else if (passedJobList.length === 0) {
      title = (
        <>
          <p className={cx('hightlight-text')}>Oops!</p>
          <p className={cx('result-text')}>The job you're looking for doesn't exist.</p>
        </>
      );
    } else {
      title = `${passedJobList.length} ${searchText ? searchText : 'IT'} jobs in ${
        location === 'All Cities' ? 'Viet Nam' : location
      }`;
    }
  }

  // reset search text error
  useEffect(() => {
    dispatch(filtersSlice.actions.searchTextErrorChange(false));
    dispatch(jobsSlice.actions.selectJob(currentJobList[0]));
  }, []);

  useEffect(() => {
    if (passedJobList.length > 0) {
      dispatch(filtersSlice.actions.searchTextErrorChange(false));
    } else {
      dispatch(filtersSlice.actions.searchTextErrorChange(true));
    }
  }, [searchText, location, passedJobList]);

  // reset selected job when changing current page
  useEffect(() => {
    if (window.screen.availWidth < 993) {
      dispatch(jobsSlice.actions.selectJob({}));
    } else if (passedJobList.length > 0) {
      dispatch(jobsSlice.actions.selectJob(currentJobList[0]));
    }
  }, [currentPage]);

  // reset currentpage, selected job, set scroll to top when changing filtered job list
  useEffect(() => {
    setCurrentPage(1);

    if (
      currentJobList.length > 0 &&
      window.location.pathname === config.routes.jobs &&
      window.screen.availWidth > 992
    ) {
      dispatch(jobsSlice.actions.selectJob(currentJobList[0]));
    }

    jobListRef.current.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [passedJobList]);

  const handleSelectJob = (job) => {
    dispatch(jobsSlice.actions.selectJob(job));
  };

  const handlePaginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    jobListRef.current.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <aside className={cx('wrapper', { shrink: headerShrink })} ref={jobListRef}>
      <h1 className={cx('title')}>{title}</h1>
      <div className={cx('job-list')}>
        {currentJobList.map((job, index) => (
          <JobItem key={index} data={job} selectJob={handleSelectJob} />
        ))}
      </div>

      <Pagination
        className={cx('job-pages')}
        currentPage={currentPage}
        totalJob={totalJob}
        jobsPerPage={jobsPerPage}
        showNavigateButtons={showNavigateButtons}
        paginate={handlePaginate}
      />

      {/* company spotlight */}
      <CompanySpotlight className={cx('company-spotlight')} topCompanyList={topCompanyList} jobList={jobList} />
    </aside>
  );
}

JobList.propTypes = {
  jobList: PropTypes.array.isRequired,
};

export default memo(JobList);
