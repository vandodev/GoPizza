import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Container, Content } from "./styles";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Input
            placeholder="Email"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none" //Não coloca primeira letra maiúscula
          />
          <Input placeholder="Senha" type="secondary" secureTextEntry />
          <Button title={"Entrar"} type={"secondary"} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
