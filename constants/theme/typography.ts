import { Fonts } from "./fonts";

export const Typography = {
  title: {
    fontFamily: Fonts.sans,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600,
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
  },
  input: {
    fontFamily: Fonts.sans,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 400,
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  }
};

export type TextVariant = keyof typeof Typography;