import React, { useEffect, useState } from "react";

function useAdmin(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    return storedIsAdmin === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin.toString());
  }, [isAdmin]);

  return [isAdmin, setIsAdmin];
}

export default useAdmin;
