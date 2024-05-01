import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './PageNotFound.module.scss';
import config from '~/config';
import Search from '~/layouts/components/Header/components/Search';
import Image from '~/components/Image';
import images from '~/assess/images';

const cx = classNames.bind(styles);

function PageNotFound() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('image')}>
          <Image src={images.success} />
        </div>
        <div className={cx('content')}>
          <h1 className={cx('title')}>Oops!</h1>
          <h2 className={cx('sub-title')}>This page has found a better job.</h2>
          <div className={cx('message')}>
            <p>We're sorry, but the page you're looking for doesn't exist.</p>
            <p>Find your own better job today!</p>
          </div>

          <Search className={cx('search')} />

          <p className={cx('message')}>
            <span>Or go back to </span>
            <Link className={cx('hightlight')} to={config.routes.home}>
              Home
            </Link>
            <span> or </span>
            <Link className={cx('hightlight')} to={config.routes.pending}>
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
