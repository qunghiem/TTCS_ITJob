import classNames from 'classnames/bind';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
  return (
    <div className={cx('wrapper')}>
      <h1>Blog Page</h1>
      <p>Not yet developed...</p>
    </div>
  );
}

export default Blog;
