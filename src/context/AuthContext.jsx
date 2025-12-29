import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); // demo "database"
  const [user, setUser] = useState(null); // logged in user

  function register(newUser) {
    // Simple uniqueness check (optional but nice)
    const emailExists = users.some((u) => u.email === newUser.email);
    const usernameExists = users.some((u) => u.username === newUser.username);

    if (emailExists) return { ok: false, message: "Email already registered." };
    if (usernameExists) return { ok: false, message: "Username already taken." };

    setUsers((prev) => [...prev, newUser]);
    return { ok: true };
  }

  function login({ identifier, password }) {
    const found = users.find(
      (u) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    if (!found) return { ok: false, message: "Invalid login details." };

    setUser({ name: found.name, email: found.email, username: found.username });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, register, login, logout }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
