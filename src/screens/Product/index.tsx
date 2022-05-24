import React from "react";
import { Platform, Text } from "react-native";
import { Container } from "./styles";

export function Product() {
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text>Produto</Text>
    </Container>
  );
}
