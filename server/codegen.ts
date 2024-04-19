import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/**/*.graphql",
  require: ["tsconfig-paths/register"],
  generates: {
    "./src/": {
      //https://the-guild.dev/graphql/codegen/docs/guides/graphql-modules
      //https://github.com/darkbasic/graphql-modules-seed/blob/master/codegen.yml
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated/graphql/graphql.generated.ts",
        importBaseTypesFrom: "@generated/graphql/graphql.generated",
        filename: "generated-types/module-types.ts",
        useGraphQLModules: false,
      },
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
    },
  },
};

export default config;
