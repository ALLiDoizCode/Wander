import type { PermissionType } from "~applications/permissions";
import type { ModuleProperties } from "~api/module";

// permissions required by this module
const permissions: PermissionType[] = ["ASYMMETRIC_ENCRYPT"];

const asymmetricEncrypt: ModuleProperties = {
  // name of the function (window.arweave.wallet.getExample)
  functionName: "asymmetricEncrypt",
  permissions
};

export default asymmetricEncrypt;
