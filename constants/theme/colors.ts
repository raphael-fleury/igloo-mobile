// Brand Colors
const iceBlue = '#4DA3FF';
const frostBlue = '#A8D8FF';
const arcticCyan = '#6FE7FF';
const midnightBlue = '#0E1A24';
const polarWhite = '#F8FBFF';
const polarBlue = '#0284C7';
const glacierGray = '#C7D0D9';

// Feedback Colors (cool-toned to blend with the icy palette)
const glacierMint = '#2DD4BF';
const glacierMintDark = '#5EEAD4';
const auroraAmber = '#F2A93B';
const auroraAmberDark = '#FBBF5C';
const frostCoral = '#F2555C';
const frostCoralDark = '#FF6B72';

export const Colors = {
  light: {
    background: polarWhite,
    surface: '#FFFFFF',

    default: midnightBlue,
    accent: polarBlue,
    muted: '#9FB4C8',

    border: '#E1E8EF',
    divider: '#EDF2F7',

    success: glacierMint,
    warning: auroraAmber,
    error: frostCoral
  },

  dark: {
    background: midnightBlue,
    surface: '#162634',

    default: glacierGray,
    accent: arcticCyan,
    muted: '#9FB4C8',

    border: '#223646',
    divider: '#1B2E3D',

    success: glacierMintDark,
    warning: auroraAmberDark,
    error: frostCoralDark
  },
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;