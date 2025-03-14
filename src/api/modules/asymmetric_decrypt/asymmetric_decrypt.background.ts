import { hexToBytes, randomBytes, utf8ToBytes } from "@noble/hashes/utils";
import type { BackgroundModuleFunction } from "~api/background/background-modules";
import { getActiveKeyfile } from "~wallets";
import { isLocalWallet } from "~utils/assertions";
import { freeDecryptedWallet } from "~wallets/encryption";
import { publicDecrypt, privateDecrypt, KeyObject } from "crypto";
var jose = require("node-jose");
/**
 * Background functionality of the module
 */
const background: BackgroundModuleFunction<string> = async (
  appData,
  encrypted: string
) => {
  // grab the user's keyfile
  const decryptedWallet = await getActiveKeyfile(appData);
  // ensure that the currently selected
  // wallet is not a local wallet
  isLocalWallet(decryptedWallet);

  const keyfile = decryptedWallet.keyfile;

  // Decrypt with private key
  const privateKey = jose.JWK.asKey(decryptedWallet);
  const decrypted = await jose.JWE.createDecrypt(privateKey).decrypt(encrypted);
  console.log("Decrypted:", decrypted.plaintext.toString());

  // remove wallet from memory
  freeDecryptedWallet(keyfile);
  return decrypted.plaintext.toString();
};

export default background;
