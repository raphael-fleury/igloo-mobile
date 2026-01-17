// Brand Colors
const iceBlue = '#4DA3FF';      // Azul glacial (primário)
const frostBlue = '#A8D8FF';    // Azul claro / gelo
const arcticCyan = '#6FE7FF';   // Ciano gelado (accent)
const midnightBlue = '#0E1A24'; // Noite ártica
const polarWhite = '#F8FBFF';   // Branco neve
const glacierGray = '#C7D0D9';  // Cinza frio

export const Colors = {
  light: {
    /* Text */
    text: '#0B1F33',
    textSecondary: '#4A647A',

    /* Backgrounds */
    background: polarWhite,
    surface: '#FFFFFF',

    /* Brand / Actions */
    tint: iceBlue,
    accent: arcticCyan,

    /* UI */
    icon: '#6B859C',
    border: '#E1E8EF',
    divider: '#EDF2F7',

    /* Tabs */
    tabIconDefault: '#6B859C',
    tabIconSelected: iceBlue,
  },

  dark: {
    /* Text */
    text: '#EAF4FF',
    textSecondary: '#AFC4D6',

    /* Backgrounds */
    background: midnightBlue,
    surface: '#162634',

    /* Brand / Actions */
    tint: frostBlue,
    accent: arcticCyan,

    /* UI */
    icon: '#9FB4C8',
    border: '#223646',
    divider: '#1B2E3D',

    /* Tabs */
    tabIconDefault: '#9FB4C8',
    tabIconSelected: frostBlue,
  },
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;