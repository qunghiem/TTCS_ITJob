import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('links')}>
          <div className={cx('links-about')}>
            <h4 className={cx('title')}>About Us</h4>
            <div className={cx('items')}>
              <Link className={cx('item')} to={config.routes.home}>
                Home
              </Link>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'about-us') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'about-us')}>
                  About Us
                </Link>
              </div>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'contact-us') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'contact-us')}>
                  Contact Us
                </Link>
              </div>
              <Link className={cx('item')} to={config.routes.jobs}>
                All Jobs
              </Link>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'faq') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'faq')}>
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className={cx('links-terms')}>
            <h4 className={cx('title')}>Terms & Conditions</h4>
            <div className={cx('items')}>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'privacy-policy') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'privacy-policy')}>
                  Privacy Policy
                </Link>
              </div>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'operating-regulation') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'operating-regulation')}>
                  Operating Regulation
                </Link>
              </div>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'complaint-handling') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'complaint-handling')}>
                  Complaint Handling
                </Link>
              </div>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'term-and-conditions') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'term-and-conditions')}>
                  Terms & Conditions
                </Link>
              </div>
              <div
                onClick={() => {
                  window.location.pathname === config.routes.pending.replace(':pathname', 'press') &&
                    window.location.reload(false);
                }}
              >
                <Link className={cx('item')} to={config.routes.pending.replace(':pathname', 'press')}>
                  Press
                </Link>
              </div>
            </div>
          </div>

          <div className={cx('links-copy-right')}>
            <span className={cx('item')}>Copyright © IT VIEC JSC</span>
            <span className={cx('item')}>Tax code: 0312192258</span>
            <div className={cx('icons')}>
              <a href="https://www.facebook.com/">
                <i>
                  <FontAwesomeIcon icon={faFacebook} />
                </i>
              </a>
              <a href="https://www.linkedin.com/">
                <i>
                  <FontAwesomeIcon icon={faLinkedin} />
                </i>
              </a>
              <a href="https://www.youtube.com/">
                <i>
                  <FontAwesomeIcon icon={faYoutube} />
                </i>
              </a>
            </div>
          </div>
        </div>

        <div className={cx('info')}>
          <h4 className={cx('title')}>Want to post a job? Contact us at:</h4>
          <span className={cx('item')}>
            Ho Chi Minh: (+84) 977 460 519 - Ha Noi: (+84) 983 131 351 - Email: love@itviec.com
          </span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
