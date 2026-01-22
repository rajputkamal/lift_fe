import { createContext, useEffect, useState, useCallback } from "react";

import { getUserProfile } from "../apis/profile.js";

const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = useCallback(async () => {
    try {
      const result = await getUserProfile();
      if (result?.data) {
        setUser(result.data);
      }
    } catch (e) {
      console.error("Failed to refresh user", e);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
