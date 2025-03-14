import { randomBytes, utf8ToBytes } from "@noble/hashes/utils";
import type { BackgroundModuleFunction } from "~api/background/background-modules";
import { getActiveKeyfile } from "~wallets";
import { isLocalWallet } from "~utils/assertions";
import { freeDecryptedWallet } from "~wallets/encryption";
import { publicDecrypt, publicEncrypt } from "crypto";

/**
 * Background functionality of the module
 */
const background: BackgroundModuleFunction<string> = async (
  appData,
  plaintext: string,
  pubkeyB: string,
  nonce = randomBytes(32)
) => {
  // grab the user's keyfile
  const decryptedWallet = await getActiveKeyfile(appData);

  // ensure that the currently selected
  // wallet is not a local wallet
  isLocalWallet(decryptedWallet);

  //const keyfile = decryptedWallet.keyfile;
  let binary = utf8ToBytes(plaintext);

  // remove wallet from memory
  //freeDecryptedWallet(keyfile);
  return publicEncrypt(pubkeyB, binary);
};

export default background;
