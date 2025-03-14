import type { PermissionType } from "~applications/permissions";
import type { ModuleProperties } from "~api/module";

// permissions required by this module
const permissions: PermissionType[] = ["ASYMMETRIC_DECRYPT"];

const exampleModule: ModuleProperties = {
  // name of the function (window.arweave.wallet.getExample)
  functionName: "asymmetricDecrypt",
  permissions
};

export default exampleModule;
