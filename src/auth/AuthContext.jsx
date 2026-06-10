//to let react know if user loggedin , if yes remove buttons of login
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => {
    if (
      (typeof globalThis !== "undefined" && globalThis.__PRERENDER__) ||
      (typeof window !== "undefined" && window.__PRERENDER__)
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (
      (typeof globalThis !== "undefined" && globalThis.__PRERENDER__) ||
      (typeof window !== "undefined" && window.__PRERENDER__)
    ) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);   // user is firebase user object
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
