import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const AuthContext = createContext({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<undefined | boolean>(
    undefined,
  );

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      setIsAuthenticated(true);
    };
    checkAuth();
  }, []);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AuthProvider;
