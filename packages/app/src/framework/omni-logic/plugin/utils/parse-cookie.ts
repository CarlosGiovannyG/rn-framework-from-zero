export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0]).trim()] = decodeURIComponent(v[1]).trim();

      return acc;
    }, {});

export const objectParseToCookie = (object: { [key: string]: string }) => {
  if(!object) return '';
  return Object.keys(object).reduce((accum, currentValue) => {
    accum += `${currentValue}=${object[currentValue]}; `;
    return accum;
  }, '');
};
