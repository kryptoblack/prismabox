import { getConfig } from "../../config";

export function uint8ArrayType() {
  // TODO: Cover all the methods in Type.Base
  return `import { ${getConfig().typeboxImportVariableName} } from "${getConfig().typeboxImportDependencyName}";
class TUint8ArrayType extends Type.Base<Uint8Array> {
  public override Check(value: unknown): value is Uint8Array {
    return value instanceof Uint8Array;
  }

  public override Errors(value: unknown): object[] {
    return !this.Check(value) ? [{ message: "not a Uint8Array" }] : [];
  }

  public override Clone(): TUint8ArrayType {
    return new TUint8ArrayType();
  }
}

export function ${getConfig().uint8ArrayTypeName}(): TUint8ArrayType {
  return new TUint8ArrayType();
}`;
}

export function uint8ArrayImport() {
  return `import { ${getConfig().uint8ArrayTypeName} } from "./${getConfig().uint8ArrayTypeName}${getConfig().importFileExtension}"\n`;
}
