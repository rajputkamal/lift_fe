import { createContext, useEffect, useState } from "react";

import { getUserProfile } from "../apis/profile.js";

const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  logout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const result = await getUserProfile();
      if (result?.data) {
        setUser(result.data);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
