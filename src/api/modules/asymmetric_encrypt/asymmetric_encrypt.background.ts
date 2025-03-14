import type { BackgroundModuleFunction } from "~api/background/background-modules";
import { getActiveKeyfile } from "~wallets";
//import { isLocalWallet } from "~utils/assertions";
//import { freeDecryptedWallet } from "~wallets/encryption";
//import { publicDecrypt, publicEncrypt } from "crypto";
var jose = require("node-jose");

/**
 * Background functionality of the module
 */
const background: BackgroundModuleFunction<string> = async (
  appData,
  plaintext: string,
  pubkey: string
) => {
  const decryptedWallet = await getActiveKeyfile(appData);

  // Encrypt with public key
  const encrypted = await jose.JWE.createEncrypt({ format: "compact" }, pubkey)
    .update(plaintext)
    .final();
  console.log("Encrypted:", encrypted);

  return encrypted;
};

export default background;
