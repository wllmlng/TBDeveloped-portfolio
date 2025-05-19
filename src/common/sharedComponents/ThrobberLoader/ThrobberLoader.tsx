import React from 'react';
import classNames from 'classnames';
import styles from './ThrobberLoader.module.scss';

/* Props -  <ThrobberLoader />
============================================================================= */
type Props = {
  overlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
};

/* <ThrobberLoader />
============================================================================= */
const ThrobberLoader: React.FC<Props> = ({ className, width, height=50 }: Props) => {
  return (
    <span className={classNames(styles.skeletonLoader, className)} style={{ width, height }} />
  );
};

export default ThrobberLoader;

