import React from 'react';
import styles from './scss/Outlook.module.scss';
import moment from 'moment';
import { useOutlook, useOutlookDispatch } from './context/OutlookContext';

export default function EmailCards({ emailData }) {
  const state = useOutlook();
  const dispatch = useOutlookDispatch();

  const {
    readEmailIds, selectedEmailId, favoritesEmailIds,
  } = state;

  const getClassName = (emailId) => {
    if (emailId === selectedEmailId) return styles.activeEmailCard;
    if (readEmailIds.includes(emailData.id)) {
      return styles.readEmailCard;
    }

    return '';
  };

  return (
    <div
      className={`${styles.emailCardsContainer} ${getClassName(emailData.id)}`}
      onClickCapture={() => {
        dispatch({
          type: 'setSelectedEmailId',
          emailId: emailData.id,
        });
      }}
    >
      <div>
        <div className={styles.avatar}>
          {emailData.from.name.charAt(0)}
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <span>From: <span className={styles.boldTxt}>{emailData.from.email}</span></span>

        <span>Subject: <span className={styles.boldTxt}>{emailData.subject}</span></span>

        <p>{emailData.short_description}</p>
        <span>{moment(new Date(emailData.date)).format('d/MM/yyyy hh:mm a')}</span>
        {favoritesEmailIds.includes(emailData.id) && (
          <span className={styles.favColor}>Favorite</span>
        )}
      </div>
    </div>
  );
}
