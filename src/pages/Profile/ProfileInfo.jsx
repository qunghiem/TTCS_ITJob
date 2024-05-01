import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faFileLines } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function ProfileInfo() {
  return (
    <>
      <h3 className={cx('profile-title')}>YOUR CV IS MISSING!</h3>
      <p className={cx('profile-subtitle')}>
        Upload CV to apply for jobs faster and get attractive invitation from employers!
      </p>

      <div className={cx('profile-actions')}>
        <div className={cx('upload-cv')}>
          <input id="cv" type="file" />
          <label htmlFor="cv">
            <i>
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </i>
            <h4>Upload CV</h4>
            <p>We accept .doc .docx, .pdf files, no password protected, up to 1MB</p>
          </label>
        </div>

        <div className={cx('create-profile')} onClick={() => alert('Sorry! This function has not been developed yet.')}>
          <i>
            <FontAwesomeIcon icon={faFileLines} />
          </i>
          <h4>Create Profile</h4>
          <p>Quickly create Profile to get more job opportunities</p>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
