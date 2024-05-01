import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './SignIn.module.scss';
import config from '~/config';
import images from '~/assess/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Form from '~/components/Form';
import Modal from '~/components/Modal';
import { useReduxSelector } from '~/redux/selectors';
import { usersSlice, usersSliceActions } from '~/redux/slices';
import AutoComplete from '~/components/AutoComplete';

const cx = classNames.bind(styles);

const inputItems = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'text',
    id: 'email',
    placeholder: 'Email',
    require: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    require: true,
  },
];

function SignIn() {
  const dispatch = useDispatch();
  const { userList, currentUser, skillsSet } = useReduxSelector();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [skillsSetOverlay, setSkillsSetOverlay] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userSkillsSet, setUserSkillSet] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');

  const handleSignIn = useCallback((data) => {
    if (userList.some((user) => user.email === data.email && user.password === data.password)) {
      dispatch(usersSlice.actions.signIn(userList.find((user) => user.email === data.email).id));
      setIsSuccess(true);
    } else {
      userList.some((user) => user.email === data.email && user.password !== data.password)
        ? alert('Wrong password')
        : alert('Email account does not exist');
      setIsSuccess(false);
    }
  }, []);

  const handleAddSkill = useCallback((item) => {
    if (!userSkillsSet.includes(item) && userSkillsSet.length < 3) {
      setUserSkillSet((prev) => [...prev, item]);
      setSearchSkill('');
      inputRef.current.focus();
    } else if (userSkillsSet.length === 3) {
      alert('You can select maximum 3 skills');
    }
  }, []);

  const handleSearchJobs = () => {
    dispatch(
      usersSliceActions.updateUser({
        id: currentUser.id,
        key: 'skills',
        payload: userSkillsSet,
      }),
    );
    navigate(config.routes.home);
  };

  // show skillsSet modal for user to pick their skills
  useEffect(() => {
    if ((isSuccess && currentUser && currentUser?.skills?.length === 0) || (isSuccess && !currentUser?.skills)) {
      setSkillsSetOverlay(true);
    } else if (isSuccess && currentUser && currentUser?.skills?.length > 0) {
      navigate(config.routes.home);
    }
  }, [currentUser]);

  const handleSetSkillsSetOverlay = useCallback(setSkillsSetOverlay, []);

  const handleDelay = useCallback(() => alert('Sorry! This function has not been developed.'), []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('user-authentication')}>
          <h3 className={cx('header')}>
            <span>Welcome to</span>
            <Image src={images.logo_dark} alt="logo_img" />
          </h3>

          <div className={cx('content')}>
            <div className={cx('signin-form')}>
              <Button className={cx('form-btn')} primary xl onClick={handleDelay}>
                <span className={cx('google-logo')}>
                  <Image src={images.google} alt="google-icon" />
                </span>
                <span>Sign in with Google</span>
              </Button>

              <div className={cx('separator')}>
                <span className={cx('separator-line')}></span>
                <span className={cx('separator-text')}>OR</span>
                <span className={cx('separator-line')}></span>
              </div>

              <Form items={inputItems} handleSubmit={(data) => handleSignIn(data)} submitBtn="Sign in with Email" />

              <div className={cx('sign-up')}>
                <span>Do not have an account? </span>
                <Link to={config.routes.signUp}>Sign up now!</Link>
              </div>
            </div>

            <div className={cx('sign-in_message')}>
              <h2>Sign in to get instant access to thousands of reviews and salary information</h2>
              <ul>
                <li>
                  <FontAwesomeIcon className={cx('list-icon')} icon={faCheck} />{' '}
                  <span>View salary to help you negotiate your offer or pay rise</span>
                </li>
                <li>
                  <FontAwesomeIcon className={cx('list-icon')} icon={faCheck} />{' '}
                  <span>Find out about benefits, interview, company culture via reviews</span>
                </li>
                <li>
                  <FontAwesomeIcon className={cx('list-icon')} icon={faCheck} />{' '}
                  <span>Easy apply with only 1 click</span>
                </li>
                <li>
                  <FontAwesomeIcon className={cx('list-icon')} icon={faCheck} />{' '}
                  <span>Manage your own profile & privacy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* skills set modal */}
      <Modal
        title="Pick-up your skills (maximum 3)"
        btn="Search for jobs"
        action={isSuccess ? handleSearchJobs : () => navigate(config.routes.home)}
        active={skillsSetOverlay}
        setActive={handleSetSkillsSetOverlay}
      >
        <div className={cx('skills-set')}>
          {userSkillsSet.map((skill, index) => (
            <div key={index} className={cx('skill-item')}>
              <span>{skill}</span>
              <button
                className={cx('clear-skill')}
                onClick={() => setUserSkillSet((prev) => prev.filter((skillItem) => skillItem !== skill))}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
          <input
            className={cx('skill-input')}
            type="text"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            ref={inputRef}
            onFocus={() => setShowAutoComplete(true)}
            onBlur={() => setTimeout(() => setShowAutoComplete(false), 200)}
          />
          <AutoComplete
            className={cx('skill-list')}
            search={searchSkill}
            items={skillsSet}
            handleAdd={(skill) => handleAddSkill(skill)}
            isShow={showAutoComplete}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SignIn;
