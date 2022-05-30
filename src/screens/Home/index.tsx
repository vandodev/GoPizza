import React from "react";
import { TouchableOpacity } from "react-native";
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

export function Home() {
  const { COLORS } = useTheme();
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
    </Container>
  );
}
