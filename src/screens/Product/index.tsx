import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Container, Header, Title, DeletLabel } from "./styles";

export function Product() {
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeletLabel>Deletar</DeletLabel>
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
