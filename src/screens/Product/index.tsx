import React, { useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from "react-native";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProductNavigationProps } from "@src/@types/navigation";
import { ProductProps } from "@components/ProductCard";

import { InputPrice } from "@components/InputPrice";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type pizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [photoPath, setPhotoPath] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

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

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate("home"));
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as pizzaResponse;
          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhotoPath(product.photo_path);
        });
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={handleGoBack} />
          <Title>Cadastrar</Title>

          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeletLabel>Deletar</DeletLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>
        <Upload>
          <Photo uri={image} />
          {!id && (
            <PickeImageButton
              title="Carregar"
              type="secondary"
              onPress={HandleImagePicker}
            />
          )}
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
          {!id && (
            <Button
              title="Cadastrar pizza"
              onPress={handleAdd}
              isLoading={isLoading}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
