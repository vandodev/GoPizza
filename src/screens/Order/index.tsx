import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Sizes,
  Form,
  FormRow,
  InputGroup,
  Label,
  Title,
  Price,
} from "./styles";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { PIZZA_TYPES } from "@utils/pizzaTypes";

export function Order() {
  const [size, setSize] = useState("");
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
        </Header>
        <Photo source={{ uri: "https://github.com/vandodev.png" }} />

        <Form>
          <Title> Nome da pizza </Title>
          <Label> Selecione um tamanho </Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                onPress={() => setSize(item.id)}
                selected={size === item.id}
                key={item.id}
                title={item.name}
              />
            ))}
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 100000 </Price>
          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}
