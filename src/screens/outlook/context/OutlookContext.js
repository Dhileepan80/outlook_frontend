import { createContext, useReducer, useContext } from 'react';

const OutlookContext = createContext(null);
const OutlookDispatchContext = createContext(null);

const initialValue = {
  selectedFilter: '',
  isEmailListLoading: true,
  emailList: [],
  emailListForRender: [],
  selectedEmailId: '',
  emailBody: {},
  readEmailIds: [],
  favoritesEmailIds: [],
}

function outlookReducer(state, action) {
  switch(action.type) {
    case 'setEmails': {
      return {
        ...state,
        emailList: action.emailList,
        isEmailListLoading: false,
      }
    }
    case 'setSelectedEmailId': {
      const tmpReadIds = state.readEmailIds;

      if (!tmpReadIds.includes(action.emailId)) {
        tmpReadIds.push(action.emailId);
      }

      return {
        ...state,
        readEmailIds: tmpReadIds,
        selectedEmailId: action.emailId,
      }
    }
    case 'updateProp': {
      return {
        ...state,
        [action.key]: action.value,
      }
    }
    case 'updateFavoritesEmail': {
      const tmpFavIds = state.favoritesEmailIds;

      if (tmpFavIds.includes(action.emailId)) {
        tmpFavIds.splice(tmpFavIds.findIndex(({ id }) => id === action.emailId), 1);
      } else {
        tmpFavIds.push(action.emailId);
      }

      return {
        ...state,
        favoritesEmailIds: tmpFavIds,
      }
    }
    default: {
      throw Error(`Unknown Type : ${action.type}`);
    }
  }
}

export default function OutlookProvider({ children }) {
  const [state, dispatch] = useReducer(outlookReducer, initialValue);

  return (
    <OutlookContext.Provider value={state}>
      <OutlookDispatchContext.Provider value={dispatch}>
        {children}
      </OutlookDispatchContext.Provider>
    </OutlookContext.Provider>
  )
}

export function useOutlook(callback = (state) => state) {
  const outlookState = useContext(OutlookContext);

  return callback(outlookState);
}

export function useOutlookDispatch() {
  return useContext(OutlookDispatchContext);
}