export type PaletteColor<T> = {
  [P in keyof T]?: T[P];
} & {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};

export interface Typography {
  fontSize: number;
  letterSpacing?: number;
  lineHeight?: number;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

export type PaletteType<T = { [key: string]: string }> =
  | Extract<keyof T, string>
  | 'dark'
  | 'light'
  | 'main';

export interface ThemeType<CT = { [key: string]: string }> {
  spacing: number[];
  palette: {
    type: PaletteType<CT>;
    primary: PaletteColor<CT>;
    secondary: PaletteColor<CT>;
    tertiary: PaletteColor<CT>;
    statusBar: PaletteColor<CT>;
    error: PaletteColor<CT>;
    warning: PaletteColor<CT>;
    info: PaletteColor<CT>;
    success: PaletteColor<CT>;
    gray: {
      [key: string]: string;
    };
    textPrimary: PaletteColor<CT>;
    textSecondary: PaletteColor<CT>;
    textTertiary: PaletteColor<CT>;
  };
  typography?: {
    h1?: Typography;
    h2?: Typography;
    h3?: Typography;
    h4?: Typography;
    h5?: Typography;
    h6?: Typography;
    subtitle1?: Typography;
    subtitle2?: Typography;
    subtitle3?: Typography;
    subtitle4?: Typography;
    body1?: Typography;
    body2?: Typography;
    button?: Typography;
    caption?: Typography;
    overline?: Typography;
  };
}
