import React, { useEffect, useState, useContext } from "react";

import FirebaseContext from "./index";


const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext)
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Run only on mount
    firebase.auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user);
      }else{
        setUser(null)
      }

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: user !== null && typeof user !== 'undefined',
        setUser: setUser,
      }}
    >

      {children}
   </AuthContext.Provider>
  );
}

export default AuthContext
