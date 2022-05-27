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
  // aqui terei onde a foto está armazenada para deletar ela onde ela estiver
  const [photoPath, setPhotoPath] = useState("");

  const [image, setImage] = useState(""); //aqui terei somente o link da foto
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacter>0 de 60 caracteres</MaxCharacter>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          <Button title="Cadastrar pizza" isLoading={isLoading} />
        </Form>
      </ScrollView>
    </Container>
  );
}
