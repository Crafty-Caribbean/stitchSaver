/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './ProgressBar.module.css';
import context from '../UserContext';

const ProgressBar = ({
  progress, id, forceUpdate,
}) => {
  const [value, setValue] = useState(progress.toString());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userContext = useContext(context);

  const updateProgress = () => {
    axios({
      method: 'PUT',
      url: `/api/users/${userContext.currentUser.userId}/projects/${id}/progress`,
      headers: {
        Authorization: `Bearer ${userContext.token}`,
      },
      data: {
        progress: Number(value),
      },
    })
      .then(() => {
        console.log('updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === '100') {
      setShowConfirmation(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateProgress();
    }, 1000);
    return () => clearTimeout(timer);
  }, [value]);

  const completed = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateProgress();
    setTimeout(forceUpdate, 100);
  };

  const cancel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValue(progress.toString());
    setShowConfirmation(false);
  };

  return (
    <div className={styles.confirmation}>
      {showConfirmation ? (
        <div className={styles.container}>
          <p className={styles.text}>completed?</p>
          <button className={styles.yes} onClick={(event) => completed(event)} type="button">✓</button>
          <button className={styles.no} onClick={(event) => cancel(event)} type="button">x</button>
        </div>
      )
        : <input className={styles.bar} type="range" min="0" max="100px" value={value} step="1" onChange={(event) => handleChange(event)} />}
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number,
  forceUpdate: PropTypes.func,
  id: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: PropTypes.number,
  forceUpdate: PropTypes.func,
  id: PropTypes.number,
};
