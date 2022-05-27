import React, { useState } from "react";
import { ButtonBack } from "@components/ButtonBack";
import { Platform, TouchableOpacity, ScrollView } from "react-native";
import {
  Container,
  Header,
  Title,
  DeletLabel,
  Upload,
  PickeImageButton,
  Form,
  InputGroup,
  InputGroupHeader,
  MaxCharacter,
  Label,
} from "./styles";
import { Photo } from "@components/Photo";
import * as ImagePicker from "expo-image-picker";
import { InputPrice } from "@components/InputPrice";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Product() {
  const [image, setImage] = useState("");
  async function HandleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        midiaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeletLabel>Deletar</DeletLabel>
          </TouchableOpacity>
        </Header>
        <Upload>
          <Photo uri={image} />
          <PickeImageButton
            title="Carregar"
            type="secondary"
            onPress={HandleImagePicker}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacter>0 de 60 caracteres</MaxCharacter>
            </InputGroupHeader>

            <Input multiline maxLength={60} style={{ height: 80 }} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice size="P" keyboardType="numeric" />
            <InputPrice size="M" />
            <InputPrice size="G" />
          </InputGroup>

          <Button title="Cadastrar pizza" />
        </Form>
      </ScrollView>
    </Container>
  );
}
