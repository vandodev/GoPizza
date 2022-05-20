import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from "./styles";

import BrandImg from "@assets/brand.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
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
          />
          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci a minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button title={"Entrar"} type={"secondary"} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}