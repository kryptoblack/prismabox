import { getConfig } from "../../config";

export function dateType() {
  return `import { ${getConfig().typeboxImportVariableName} } from "${getConfig().typeboxImportDependencyName}"
class TDateType extends Type.Base<Date> {
  public override Check(value: unknown): value is Date {
    return value instanceof Date;
  }

  public override Errors(value: unknown): object[] {
    return !this.Check(value) ? [{ message: "not a Date" }] : [];
  }

  public override Clone(): TDateType {
    return new TDateType();
  }
}

export function ${getConfig().dateTypeName}(): TDateType {
  return new TDateType();
}`;
}

export function dateImport() {
  return `import { ${getConfig().dateTypeName} } from "./${getConfig().dateTypeName}${getConfig().importFileExtension}"\n`;
}
