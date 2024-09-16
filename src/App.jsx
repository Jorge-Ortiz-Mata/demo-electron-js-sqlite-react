import { useState, useEffect } from "react";
import DailiesList from "./components/Dailies";
import DailyForm from "./components/DailyForm";

function App() {
  const [records, setRecords] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  console.log(isOnline) // Checar conectividad a internet

  useEffect(() => {
    fetchRecords(); 

    return () => {
      window.electronAPI.removeSaveRecordListeners();  
      window.electronAPI.removeGetRecordsListeners();  
    };
  }, []);

  const fetchRecords = () => {
    window.electronAPI.getRecords();

    window.electronAPI.onRecordsReceived((response) => {
      if (response.success) {
        setRecords(response.records);
      } else {
        console.error('Error al obtener los registros:', response.error);
      }
    });
  };

  return (
    <main className="flex flex-col gap-10">
      <h1 className="font-bold items-center text-3xl">Demo Electron React</h1>
      <DailyForm fetchRecords={fetchRecords} />
      {
        records.length 
        ? <DailiesList records={records} />
        : <p>No hay ningun registro actual</p>
      }
    </main>
  );
}

export default App;
