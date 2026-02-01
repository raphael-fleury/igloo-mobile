// Brand Colors
const iceBlue = '#4DA3FF';
const frostBlue = '#A8D8FF';
const arcticCyan = '#6FE7FF';
const midnightBlue = '#0E1A24';
const polarWhite = '#F8FBFF';
const glacierGray = '#C7D0D9';

export const Colors = {
  light: {
    /* Backgrounds */
    background: polarWhite,
    surface: '#FFFFFF',

    /* Brand / Actions */
    default: midnightBlue,
    accent: iceBlue,
    muted: '#9FB4C8',

    /* UI */
    border: '#E1E8EF',
    divider: '#EDF2F7'
  },

  dark: {
    /* Backgrounds */
    background: midnightBlue,
    surface: '#162634',

    /* Brand / Actions */
    default: glacierGray,
    accent: arcticCyan,
    muted: '#9FB4C8',

    /* UI */
    border: '#223646',
    divider: '#1B2E3D'
  },
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;