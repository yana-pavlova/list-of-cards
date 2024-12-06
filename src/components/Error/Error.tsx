import React from 'react';
import styles from './error.module.css';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <span className={styles.error}>{message}</span>;
};

export default Error;
