import React, { useEffect, useMemo } from 'react';
import { useOutlook, useOutlookDispatch } from './context/OutlookContext';
import GlobalService from '../../globals/utils/GlobalService';
import { restBaseUrl } from '../../globals/utils/constants';
import EmailCards from './EmailCards';

export default function EmailListView() {
  const state = useOutlook();
  const dispatch = useOutlookDispatch();

  const {
    isEmailListLoading, emailList, selectedFilter, readEmailIds, favoritesEmailIds,
  } = state;

  useEffect(() => {
    GlobalService.generalSelect(
      (respData) => {
        if (respData) {
          dispatch({
            type: 'setEmails',
            emailList: respData.list,
          })
        }
      }, restBaseUrl, 'GET',
    )
  }, [dispatch]);

  const filteredEmailList = useMemo(() => {
    let tmpEmailList = [...emailList];

    if (selectedFilter === 'unread') {
      tmpEmailList = tmpEmailList.filter(({ id }) => !readEmailIds.includes(id));
      tmpEmailList = tmpEmailList.filter(({ id }) => !favoritesEmailIds.includes(id));
    } else if (selectedFilter === 'read') {
      tmpEmailList = tmpEmailList.filter(({ id }) => readEmailIds.includes(id));
    } else if (selectedFilter === 'favorites') {
      tmpEmailList = tmpEmailList.filter(({ id }) => favoritesEmailIds.includes(id));
    }

    return tmpEmailList;
  }, [emailList, favoritesEmailIds, readEmailIds, selectedFilter]);

  if (isEmailListLoading) return <div>Loading...</div>

  console.log('check log', filteredEmailList)

  return (
    <>
      {filteredEmailList.map((ele) => (
        <EmailCards key={ele.id} emailData={ele} />
      ))}
    </>
  );
}
