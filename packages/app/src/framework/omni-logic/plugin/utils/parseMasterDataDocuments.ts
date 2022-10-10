/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const parseMasterDataDocuments = (documents: any[]) => {
  return documents.reduce((accum, currentValue) => {
    if (Array.isArray(currentValue?.fields)) {
      const fieldsToObject = currentValue?.fields?.reduce(
        (
          accumFields: any,
          currentValueFields: { key: string; value: unknown }
        ) => {
          accumFields = {
            ...accumFields,
            [currentValueFields.key]: currentValueFields.value,
          };
          return accumFields;
        },
        {}
      );
      accum.push(fieldsToObject);
    }
    return accum;
  }, [] as unknown[]);
};

export default parseMasterDataDocuments;
