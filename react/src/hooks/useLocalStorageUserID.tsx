import { useState, useEffect } from 'react';
/*
  Author: Samuel Torres
  Description: React Hook to store userID in local storage and state
*/
const useLocalStorageUserID = (): [string | undefined, (value: string | undefined) => void] => {
  const [userID, setUserID] = useState<string | undefined>(() => {
    const storedUserID = localStorage.getItem('userID');
    return storedUserID ? storedUserID : undefined;
  });

  useEffect(() => {
    if (userID !== undefined) {
      localStorage.setItem('userID', userID);
    } else {
      localStorage.removeItem('userID');
    }
  }, [userID]);

  return [userID, setUserID];
};

export default useLocalStorageUserID;
