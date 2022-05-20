import React from "react";
import { Container } from "./styles";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <Container>
      <Input
        placeholder="Email"
        type="secondary"
        autoCorrect={false}
        autoCapitalize="none" //Não coloca primeira letra maiúscula
      />
      <Input placeholder="Senha" type="secondary" secureTextEntry />
      <Button title={"Entrar"} type={"secondary"} />
    </Container>
  );
}
