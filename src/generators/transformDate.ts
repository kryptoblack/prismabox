import { getConfig } from "../config";

export function transformDateType() {
  return `import { ${getConfig().typeboxImportVariableName} } from "${getConfig().typeboxImportDependencyName}";
  export const ${getConfig().transformDateName} = (options?: Parameters<typeof ${getConfig().typeboxImportVariableName}.String>[0]) => ${
    getConfig().typeboxImportVariableName
  }.Codec(${getConfig().typeboxImportVariableName}.String({ format: 'date-time', ...options }))
   .Decode((value: string) => new Date(value))
   .Encode((value: Date) => value.toISOString())\n`;
}

export function transformDateImportStatement() {
  return `import { ${getConfig().transformDateName} } from "./${
    getConfig().transformDateName
  }${getConfig().importFileExtension}"\n`;
}
