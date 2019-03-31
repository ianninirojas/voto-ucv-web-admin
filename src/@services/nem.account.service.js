// import {
//   NetworkType,
//   PublicAccount,
// } from 'nem2-sdk';

import { sha3_256 } from 'js-sha3';

const generatePublicKey = (id) => {
  const publicKey = sha3_256(id).toUpperCase();
  return publicKey;
}

// const getPublicAccountFromPublicKey = () => {
//   return PublicAccount.createFromPublicKey(publicKey, NetworkType.MIJIN_TEST);
// }

export const nemAccountService = {
  generatePublicKey,
  // getPublicAccountFromPublicKey
}