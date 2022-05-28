import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Greeting, GreetingEmoji, GreetingText } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Header } from "../Product/styles";
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
    </Container>
  );
}
