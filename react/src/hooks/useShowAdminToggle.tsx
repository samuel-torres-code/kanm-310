import { useState, useEffect } from "react";

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
