const generateRandomString = (length) => {
  const possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }
  return randomString;
};

export const generateOrderNumber = () => {
  const timestamp = new Date().getTime().toString().slice(-5);
  const randomString = generateRandomString(3);
  return timestamp + randomString;
};
