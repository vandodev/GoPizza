import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from "./styles";

import { useAuth } from "@hooks/auth";
// import { useAuth } from "../../hooks/auth";

import BrandImg from "@assets/brand.png";

import { Input } from "@components/Input";
// import { Button } from "@components/Button";
import { Button } from "../../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const { signIn, isLogging } = useAuth();

  function HandleSignIn() {
    signIn(email, password);
    console.log("oi");
  }
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={BrandImg} />
          <Title>Login</Title>
          <Input
            placeholder="Email"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none" //Não coloca primeira letra maiúscula
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassord}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci a minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title={"Entrar"}
            type={"secondary"}
            onPress={HandleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
