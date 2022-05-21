import React, { createContext, useContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);
function AuthProvider({ children }: AuthProviderProps) {
  // function AuthProvider({ children }:AuthProvideProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "informe o email e a senha");
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        console.log(account);
        console.log("chegou aqui");
      })
      .catch((error) => {
        const { code } = error;
        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert("Login", "email ou senha inválido");
        } else {
          return Alert.alert("Login", "Não foi possivel realizar o login");
        }
      })
      .finally(() => setIsLogging(false));
  }

  return (
    <AuthContext.Provider value={{ signIn, isLogging }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
