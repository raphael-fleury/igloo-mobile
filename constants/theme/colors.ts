// Brand Colors
const iceBlue = '#4DA3FF';      // Azul glacial (primário)
const frostBlue = '#A8D8FF';    // Azul claro / gelo
const arcticCyan = '#6FE7FF';   // Ciano gelado (accent)
const midnightBlue = '#0E1A24'; // Noite ártica
const polarWhite = '#F8FBFF';   // Branco neve
const glacierGray = '#C7D0D9';  // Cinza frio

export const Colors = {
  light: {
    /* Backgrounds */
    background: polarWhite,
    surface: '#FFFFFF',

    /* Brand / Actions */
    default: '#6B859C',
    accent: arcticCyan,
    muted: glacierGray,

    /* UI */
    border: '#E1E8EF',
    divider: '#EDF2F7'
  },

  dark: {
    /* Backgrounds */
    background: midnightBlue,
    surface: '#162634',

    /* Brand / Actions */
    default: '#9FB4C8',
    accent: arcticCyan,
    muted: glacierGray,

    /* UI */
    border: '#223646',
    divider: '#1B2E3D'
  },
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;