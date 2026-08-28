import { TextStyle } from "react-native";
import { Fonts } from "./fonts";

export const Typography = {
  hero: {
    fontFamily: Fonts.sans,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700 as TextStyle["fontWeight"],
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600 as TextStyle["fontWeight"],
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400 as TextStyle["fontWeight"],
  },
  input: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400 as TextStyle["fontWeight"],
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400 as TextStyle["fontWeight"],
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400 as TextStyle["fontWeight"],
  }
};

export type TextVariant = keyof typeof Typography;