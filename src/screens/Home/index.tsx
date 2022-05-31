import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Title,
  MenuHeader,
  MenuItemsNumber,
} from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Header } from "../Product/styles";
import { Search } from "@components/Search";
import happyEmoji from "@assets/happy.png";
import { ProductCard, ProductProps } from "@components/ProductCard";

export function Home() {
  const { COLORS } = useTheme();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        // console.log(data);
        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta.")
      );
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search onSearch={() => {}} onClear={() => {}} />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}
