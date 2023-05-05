import { useState, useEffect } from "react";
/*
  Author: Samuel Torres
  Description: React Hook to store showAdminToggle boolean in local storage and state
*/
type HookReturnType = [boolean, (value: boolean) => void];

const useShowAdminToggle = (): HookReturnType => {
  const [showAdminToggle, setShowAdminToggle] = useState(
    localStorage.getItem("showAdminToggle") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("showAdminToggle", showAdminToggle.toString());
  }, [showAdminToggle]);

  return [showAdminToggle, setShowAdminToggle];
};

export default useShowAdminToggle;
