import React, { useCallback } from 'react';
import styles from './scss/Outlook.module.scss';
import { useOutlook, useOutlookDispatch } from './context/OutlookContext';

export default function FilterPanel() {
  const selectedFilter = useOutlook((state) => state.selectedFilter);
  const dispatch = useOutlookDispatch();

  const getClassName = useCallback((filterName, filterNameInstate) => {
    if (filterName === filterNameInstate) return styles.activeFilter;
    return '';
  }, []);

  const upadateSelectedFilter = useCallback((filterName) => {
    dispatch({
      type: 'updateProp',
      key: 'selectedFilter',
      value: selectedFilter === filterName ? '' : filterName,
    })
  }, [dispatch, selectedFilter]);

  return (
    <div className={styles.filterPanelContainer}>
      <span>Filter By:</span>
      <span className={getClassName('unread', selectedFilter)} onClickCapture={() => upadateSelectedFilter('unread')}>Unread</span>
      <span className={getClassName('read', selectedFilter)} onClickCapture={() => upadateSelectedFilter('read')}>Read</span>
      <span className={getClassName('favorites', selectedFilter)} onClickCapture={() => upadateSelectedFilter('favorites')}>Favorites</span>
    </div>
  );
}
