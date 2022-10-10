import * as yup from 'yup';

const typoSchema = yup.object().shape({
  fontFamily: yup.string(),
  fontStyle: yup.string(),
  fontDisplay: yup.string(),
  fontWeight: yup.number(),
});

const paletteSchema = yup.object().shape({
  light: yup.string(),
  main: yup.string().required(),
  dark: yup.string(),
  contrastText: yup.string(),
});

const themeSchema = yup.object().shape({
  spacing: yup.array().of(yup.number()),
  palette: yup.object().shape({
    type: yup.string().required(),
    primary: paletteSchema,
    secondary: paletteSchema,
    error: paletteSchema,
    warning: paletteSchema,
    info: paletteSchema,
    success: paletteSchema,
  }),
  typography: yup.object().shape({
    h1: typoSchema,
    h2: typoSchema,
    h3: typoSchema,
    h4: typoSchema,
    h5: typoSchema,
    h6: typoSchema,
    subtitle1: typoSchema,
    subtitle2: typoSchema,
    subtitle3: typoSchema,
    subtitle4: typoSchema,
    body1: typoSchema,
    body2: typoSchema,
    button: typoSchema,
    caption: typoSchema,
    overline: typoSchema,
  }),
});

export default themeSchema;
