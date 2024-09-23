import './App.css';
import OutlookProvider from './screens/outlook/context/OutlookContext';
import Outlook from './screens/outlook/Outlook';

function App() {
  return (
    <OutlookProvider>
      <Outlook />
    </OutlookProvider>
  );
}

export default App;
