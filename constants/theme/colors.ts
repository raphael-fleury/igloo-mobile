// Brand Colors
const iceBlue = '#4DA3FF';
const frostBlue = '#A8D8FF';
const arcticCyan = '#6FE7FF';
const midnightBlue = '#0E1A24';
const polarWhite = '#F8FBFF';
const polarBlue = '#0284C7';
const glacierGray = '#C7D0D9';

export const Colors = {
  light: {
    background: polarWhite,
    surface: '#FFFFFF',

    default: midnightBlue,
    accent: polarBlue,
    muted: '#9FB4C8',

    border: '#E1E8EF',
    divider: '#EDF2F7'
  },

  dark: {
    background: midnightBlue,
    surface: '#162634',

    default: glacierGray,
    accent: arcticCyan,
    muted: '#9FB4C8',

    border: '#223646',
    divider: '#1B2E3D'
  },
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;