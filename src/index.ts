import { access, mkdir, rm } from "node:fs/promises";
import { generatorHandler } from "@prisma/generator-helper";
import { getConfig, setConfig } from "./config";
import { processEnums } from "./generators/enum";
import { processInclude } from "./generators/include";
import { processOrderBy } from "./generators/orderBy";
import { processPlain } from "./generators/plain";
import { processPlainInputCreate } from "./generators/plainInputCreate";
import { processPlainInputUpdate } from "./generators/plainInputUpdate";
import {
  processRelations,
  processRelationsInputCreate,
  processRelationsInputUpdate,
} from "./generators/relations";
import { processSelect } from "./generators/select";
import { processWhere, processWhereUnique } from "./generators/where";
import { write } from "./writer";

generatorHandler({
  onManifest() {
    return {
      defaultOutput: "./prismabox",
      prettyName: "prismabox",
    };
  },
  async onGenerate(options) {
    setConfig({
      ...options.generator.config,
      // for some reason, the output is an object with a value key
      output: options.generator.output?.value,
    });

    try {
      await access(getConfig().output);
      await rm(getConfig().output, { recursive: true });
    } catch (_error) {}

    await mkdir(getConfig().output, { recursive: true });

    // TODO: Figure out if the ordering has a particular reason behind it.
    // If not reorder based on the conditions.
    processEnums(options.dmmf.datamodel.enums);
    processPlain(options.dmmf.datamodel.models);

    if (getConfig().relationModel)
      processRelations(options.dmmf.datamodel.models);

    if (getConfig().queryModel) {
      processWhere(options.dmmf.datamodel.models);
      processWhereUnique(options.dmmf.datamodel.models);
    }

    if (getConfig().inputModel) {
      processPlainInputCreate(options.dmmf.datamodel.models);
      processPlainInputUpdate(options.dmmf.datamodel.models);
    }

    if (getConfig().inputModel && getConfig().relationModel) {
      processRelationsInputCreate(options.dmmf.datamodel.models);
      processRelationsInputUpdate(options.dmmf.datamodel.models);
    }

    if (getConfig().queryModel) {
      processSelect(options.dmmf.datamodel.models);
      processInclude(options.dmmf.datamodel.models);
      processOrderBy(options.dmmf.datamodel.models);
    }

    await write();
  },
});
