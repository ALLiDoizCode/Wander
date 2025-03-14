import type { ModuleFunction } from "~api/module";

/**
 * Foreground functionality of the module
 */
const foreground: ModuleFunction<string> = async (
  plaintext: string,
  pubkey: string
) => {
  console.log("foreground");
  return typeof plaintext === "string" ? plaintext : "";
};

export default foreground;
