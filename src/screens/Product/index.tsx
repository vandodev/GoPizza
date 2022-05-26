import React, { useState } from "react";
import { ButtonBack } from "@components/ButtonBack";
import { Platform, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  DeletLabel,
  Upload,
  PickeImageButton,
} from "./styles";
import { Photo } from "@components/Photo";
import * as ImagePicker from "expo-image-picker";

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
    </Container>
  );
}
