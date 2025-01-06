export const generateUID = (): string => {
  //This is a placeholder, for a production environment use a proper UUID library
  return Math.random().toString(16).substring(2, 10);
};
