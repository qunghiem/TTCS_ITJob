import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faLocationDot, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './MyJobRobot.module.scss';
import PopperWrapper from '~/components/Popper/PopperWrapper';
import Button from '~/components/Button';
import { useReduxSelector } from '~/redux/selectors';
import { usersSliceActions } from '~/redux/slices';

const cx = classNames.bind(styles);

const cities = ['Ho Chi Minh', 'Ha Noi', 'Da Nang'];

function Jobs() {
  const dispatch = useDispatch();
  const { currentUser } = useReduxSelector();

  const [currentCity, setCurrentCity] = useState(currentUser.location ? currentUser.location : 'Ho Chi Minh');
  const [keyWord, setKeyWord] = useState('');
  const [activeCityOption, setActiveCityOption] = useState(false);
  const [jobRobot, setJobRobot] = useState(currentUser.jobRobot ? currentUser.jobRobot : []);

  const handleUpdateJobRobot = (newJobRobot) => {
    dispatch(
      usersSliceActions.updateUser({
        id: currentUser.id,
        key: 'jobRobot',
        payload: newJobRobot,
      }),
    );
  };

  const handleAddNewJobRobot = useCallback(() => {
    if (keyWord.trim().length === 0) {
      return;
    } else if (
      currentUser.jobRobot?.some(
        (job) => job.keyWord.trim().toLowerCase() === keyWord.toLowerCase() && job.location === currentCity,
      )
    ) {
      alert('Opps! You have already subscribed for this skill');
      return;
    } else if (currentUser.jobRobot?.length === 5) {
      alert('Opps! You can only create maximum 5 Job Robots');
      return;
    }

    const newJobRobot = [...jobRobot, { keyWord: keyWord.trim(), location: currentCity }];

    setJobRobot(newJobRobot);
    handleUpdateJobRobot(newJobRobot);
    setKeyWord('');
  }, [keyWord, currentCity]);

  const handleClearJobRobot = (keyWord, location) => {
    const newJobRobot = jobRobot.filter(
      (job) => job.keyWord.trim().toLowerCase() !== keyWord.toLowerCase() || job.location !== location,
    );

    setJobRobot(newJobRobot);
    handleUpdateJobRobot(newJobRobot);
  };

  return (
    <div className={cx('box')}>
      {/* header */}
      <header className={cx('header')}>
        <h1 className={cx('title')}>My Job Robot</h1>
        <p className={cx('subtitle')}>Add new, or delete your Job Robots here. You can create up to 5 Job Robots.</p>
      </header>

      {/* job robot list */}
      {currentUser.jobRobot && (
        <div className={cx('subscribed-list')}>
          {currentUser.jobRobot.map((item, index) => (
            <div key={index} className={cx('subscribed-item')}>
              <div className={cx('subscribed-item_child')}>
                <button className={cx('clear-btn')} onClick={() => handleClearJobRobot(item.keyWord, item.location)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <span>{item.keyWord}</span>
              </div>

              <div className={cx('subscribed-item_child', 'detail')}>
                <span>
                  <i>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </i>
                  {item.location}
                </span>

                <span className={cx('myjr-status')}>Subscribed</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* actions */}
      <div className={cx('form')}>
        <div className={cx('form-input')}>
          <i>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </i>
          <input
            type="text"
            placeholder="Keyword skill (Java, iOS, ...), Job Title..."
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </div>

        <div className={cx('form-actions')}>
          <Tippy
            render={(attrs) => (
              <div className={cx('city-container')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('city-option')} stretch>
                  {cities.map((city, index) => (
                    <span key={index} className={cx('city-item')} onClick={() => setCurrentCity(city)}>
                      {city}
                    </span>
                  ))}
                </PopperWrapper>
              </div>
            )}
            interactive
            placement="bottom"
            appendTo={document.body}
            trigger="click"
            hideOnClick="true"
            onClickOutside={(instance) => {
              instance.hide();
              setActiveCityOption(false);
            }}
          >
            <div
              className={cx('city', { active: activeCityOption })}
              onClick={() => setActiveCityOption(!activeCityOption)}
            >
              <div>
                <i className={cx('city-icon')}>
                  <FontAwesomeIcon icon={faLocationDot} />
                </i>

                <span className={cx('city-title')}>{currentCity}</span>
              </div>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </Tippy>

          <Button className={cx('myrj-btn')} primary onClick={handleAddNewJobRobot}>
            Get Jobs
          </Button>
        </div>
      </div>

      {/* more infomation */}
      <div className={cx('explanation')}>
        <p className={cx('explanation-waring')}>Don't miss your next job!</p>
        <p>Add your skill and city, then click "Get Jobs". We'll email you suitable new jobs, up to 1 email per day.</p>
      </div>
    </div>
  );
}

Jobs.propTypes = {
  children: PropTypes.node,
};

export default Jobs;
