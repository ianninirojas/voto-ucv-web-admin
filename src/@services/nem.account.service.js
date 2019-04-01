import { sha3_256 } from 'js-sha3';

const generatePublicKey = (id) => {
  const publicKey = sha3_256(id).toUpperCase();
  return publicKey;
}
export const nemAccountService = {
  generatePublicKey,
}