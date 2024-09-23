import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import ReactParser from 'html-react-parser';
import styles from './scss/Outlook.module.scss';
import { useOutlook, useOutlookDispatch } from './context/OutlookContext';
import GlobalService from '../../globals/utils/GlobalService';
import { restBaseUrl } from '../../globals/utils/constants';

export default function EmailBody() {
  const [emailBody, selectedEmailId, emailList] = useOutlook((state) => ([state.emailBody, state.selectedEmailId, state.emailList]));
  const dispatch = useOutlookDispatch();

  const isLoading = useRef(true);

  const emailData = emailList.find(({ id }) => id === selectedEmailId);

  useEffect(() => {
    GlobalService.generalSelect(
      (respData) => {
        if (respData) {
          isLoading.current = false;
          dispatch({
            type: 'updateProp',
            key: 'emailBody',
            value: respData,
          })
        }
      }, `${restBaseUrl}?id=${selectedEmailId}`, 'GET',
    )
  }, [dispatch, selectedEmailId]);

  if (isLoading.current) return <div>Loading...</div>

  return (
    <div className={styles.emailBodyWrapper}>
      <div>
        <div className={styles.avatar}>
          {emailData.from.name.charAt(0)}
        </div>
      </div>

      <div>
        <div>
          <span>{emailData.subject}</span>
          <button
            onClick={() => {
              dispatch({
                type: 'updateFavoritesEmail',
                emailId: emailData.id,
              })
            }}
          >
            Mark as favorite
          </button>
        </div>
        <span>{moment(new Date(emailData.date)).format('d/MM/yyyy hh:mm a')}</span>

        <div>
          {ReactParser(emailBody.body)}
        </div>
      </div>
    </div>
  );
}
