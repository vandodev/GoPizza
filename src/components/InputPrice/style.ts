import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import theme from "@src/theme";

export const Conteiner = styled.View`
  width: 100%;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Size = styled.View`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: 18px;
`;

export const Label = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin-left: 7px;
`;
