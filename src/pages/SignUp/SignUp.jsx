import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from './SignUp.module.scss';
import config from '~/config';
import images from '~/assess/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Form from '~/components/Form';
import Modal from '~/components/Modal';
import { usersSliceActions } from '~/redux/slices';
import { useReduxSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

const inputItems = [
  {
    name: 'fullname',
    label: 'Fullname',
    type: 'text',
    id: 'fullname',
    placeholder: 'Name',
    require: true,
  },
  {
    name: 'email',
    label: 'Email',
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

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList, currentUser } = useReduxSelector();

  const [activeOverlay, setActiveOverlay] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = useCallback((newUser) => {
    if (userList.some((user) => user.email === newUser.email)) {
      setIsSuccess(false);
    } else {
      dispatch(usersSliceActions.signUp(newUser));
      setIsSuccess(true);
    }

    setActiveOverlay(true);
  }, []);

  const handleSetActiveOverlay = useCallback(setActiveOverlay, []);

  const handleDelay = useCallback(() => alert('Sorry! This function has not been developed.'), []);

  if (currentUser) {
    navigate(config.routes.home);
  } else {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('user-authentication')}>
            <h3 className={cx('header')}>
              <span>Welcome to</span>
              <Image src={images.logo_dark} alt="logo_img" />
            </h3>

            <div className={cx('content')}>
              <div className={cx('signup-form')}>
                <h2 className={cx('form-title')}>Sign Up</h2>
                <Button className={cx('form-btn')} primary xl onClick={handleDelay}>
                  <span className={cx('google-logo')}>
                    <Image src={images.google} alt="google-icon" />
                  </span>
                  <span>Sign up with Google</span>
                </Button>

                <div className={cx('separator')}>
                  <span className={cx('separator-line')}></span>
                  <span className={cx('separator-text')}>OR</span>
                  <span className={cx('separator-line')}></span>
                </div>

                <Form
                  items={inputItems}
                  handleSubmit={(data) => handleSignUp({ ...data, id: uuidv4() })}
                  submitBtn="Sign up with Email"
                />

                <div className={cx('sign-in')}>
                  <span>Already had an account? </span>
                  <Link to={config.routes.signIn}>Sign in now!</Link>
                </div>

                <div className={cx('form-note')}>
                  <span className={cx('note-title')}>Note:</span>
                  <span className={cx('note-text')}>
                    Password must contain at least 8 characters. Combination of symbols, numbers, uppercase letters,
                    lowercase letters.
                  </span>
                </div>
              </div>

              <div className={cx('sign-up_image')}>
                <Image src={images.success} alt="signup_img" />
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={isSuccess ? "Cool, you're almost done!" : 'Email account already existed!'}
          message={
            isSuccess ? "Let's sign in to search and get your dream job." : 'Please use another email to sign up.'
          }
          btn={isSuccess ? 'Sign in' : 'Sign up again'}
          action={() => {
            isSuccess ? navigate(config.routes.signIn) : setActiveOverlay(false);
          }}
          active={activeOverlay}
          setActive={handleSetActiveOverlay}
        />
      </div>
    );
  }
}

export default SignUp;
