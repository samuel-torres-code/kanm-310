import { useState, useEffect } from 'react';
/*
  Author: Samuel Torres
  Description: React Hook to store showID in local storage and state
*/
const useLocalStorageShowID = (): [string | undefined, (value: string | undefined) => void] => {
  const [showID, setShowID] = useState<string | undefined>(() => {
    const storedShowID = localStorage.getItem('showID');
    return storedShowID ? storedShowID : undefined;
  });

  useEffect(() => {
    if (showID !== undefined) {
      localStorage.setItem('showID', showID);
    } else {
      localStorage.removeItem('showID');
    }
  }, [showID]);

  return [showID, setShowID];
};

export default useLocalStorageShowID;
