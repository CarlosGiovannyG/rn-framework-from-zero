import { StyleSheet } from 'react-native';
import { ThemeType } from './types/theme';
import ThemeSchema from './utils/themeSchema';

export const createTheme = (theme: ThemeType) => {
  const response = ThemeSchema.validateSync(theme);
  return response;
};


export const withStyles = (
  fn: (theme: ThemeType) => Record<string, Partial<StyleSheet.NamedStyles<any>>>
) => {
  return fn;
};
