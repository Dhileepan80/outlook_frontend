import React from 'react';
import styles from './scss/Outlook.module.scss';
import FilterPanel from './FilterPanel';
import { useOutlook } from './context/OutlookContext';
import EmailListView from './EmailListView';
import EmailBody from './EmailBody';

export default function Outlook() {
  const selectedEmailId = useOutlook((state) => state?.selectedEmailId || null);

  return (
    <div className={styles.outlookContainer}>
      <div>
        <FilterPanel />
      </div>
      <div className={styles.outlookMainPanelWrapper}>
        <div className={`${selectedEmailId ? styles.panelWithBody : styles.panelWithoutBody}`}>
          <EmailListView />
        </div>
        {selectedEmailId && (
          <div className={styles.bodyWrapper}>
            <EmailBody />
          </div>
        )}
      </div>
    </div>
  );
}
