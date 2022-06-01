import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
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

import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "@src/@types/navigation";
import { ProductProps } from "@components/ProductCard";

import { InputPrice } from "@components/InputPrice";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Product() {
  const [photoPath, setPhotoPath] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  console.log("id do produto selecionado", id);

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

  async function handleAdd() {
    if (!name.trim()) {
      //.trim() remove os espaços
      return Alert.alert("Cadastro", "Informe o nome da pizza");
    }
    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza");
    }
    if (!image) {
      return Alert.alert("Cadastro", "Selecione uma imagem para a pizza");
    }
    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza"
      );
    }
    setIsLoading(true);

    // upload da imagem
    const fileName = new Date().getTime();
    // criei essa pasta /pizzas/ no storange firebase (antes)
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image); // e passo a imagem

    // Acesse o firebase storange  em Rules do Storage altere as regras:
    // : if request.auth != null; - para não me barrar
    const photo_url = await reference.getDownloadURL();

    // agora salva no banco
    firestore()
      .collection("pizzas")
      .add({
        name,

        //  name_insensitive altera tudo para minusculo
        // .trim() remove os espaços em branco
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        //photo_path caminho da foto salva
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert("Cadastro", "Pizza cadastrada com sucesso"))
      .catch(() => Alert.alert("Cadastro", "Não foi possivel cadastrar pizza"));
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

          <Button
            title="Cadastrar pizza"
            onPress={handleAdd}
            isLoading={isLoading}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
