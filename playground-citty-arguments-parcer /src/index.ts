/**
 * CLI con citty - framework declarativo para construir CLIs en TypeScript.
 *
 * A diferencia de parsear process.argv manualmente, citty usa un enfoque declarativo:
 * describes la estructura de tus comandos y argumentos con objetos de configuración,
 * y citty se encarga del parsing, validación, y generación automática de --help.
 *
 * Flujo: defineCommand() -> subCommands -> runMain() -> citty parsea argv y ejecuta el handler
 */

// citty exporta dos funciones principales:
// - defineCommand: crea un comando con su metadata, argumentos y handler
// - runMain: punto de entrada que conecta process.argv con tus comandos definidos
import { defineCommand, runMain } from "citty";
// consola es un logger con formato bonito del ecosistema unjs (colores, íconos, niveles de log)
import { consola } from "consola";

/**
 * Define un subcomando "clone" de forma declarativa.
 *
 * Comparación con tu parser manual:
 *   - En tu parser: recorrías argv token por token y clasificabas con slice/startsWith
 *   - Con citty: describes los args en un objeto y citty los parsea automáticamente
 */
const cloneCommand = defineCommand({
  // meta: información del comando para --help y versionado
  meta: {
    name: "clone",
    description: "Clone a repository",
  },
  // args: define los argumentos que acepta este comando
  // citty soporta 3 tipos: "positional", "string", y "boolean"
  args: {
    // Argumento posicional: se pasa sin flag (ej: `cli clone https://github.com/...`)
    // En tu parser manual esto iría a result.positionalArgs[]
    repo: {
      type: "positional",
      description: "The repository to clone",
      required: true,
      // valueHint aparece en la ayuda: "REPO-URL" en vez del nombre del argumento
      valueHint: "repo-url",
    },
    // Flag con valor string: se pasa como --depth 3
    // En tu parser manual esto sería: flags: { depth: { value: "3", isLongFlag: true } }
    depth: {
      type: "string",
      description: "The depth of the clone",
    },
    // Flag booleana: --verbose o -v (gracias al alias)
    // En tu parser manual: flags: { verbose: { value: true, isLongFlag: true } }
    verbose: {
      type: "boolean",
      description: "Enable verbose mode",
      // alias permite usar -v como atajo de --verbose
      // citty maneja la resolución automáticamente (algo que tu parser aún no soporta)
      alias: "v",
    },
  },
  // run: el handler que se ejecuta cuando citty resuelve que este comando fue invocado
  // citty inyecta los args ya parseados y tipados (no necesitas hacer el parsing tú)
  run: ({ args }) => {
    consola.log(`** Cloning ${args.repo}`, { ...args });
  },
});

/**
 * Comando principal (root) del CLI.
 *
 * El patrón de subCommands permite crear CLIs como git:
 *   mi-cli clone <repo>    -> ejecuta cloneCommand
 *   mi-cli --help           -> muestra ayuda generada por citty
 *
 * Internamente, citty toma argv[2] como nombre del subcomando y lo busca en este objeto.
 */
const main = defineCommand({
  meta: {
    name: "my-citty-cli",
    version: "0.0.1",
    description: "My first citty CLI",
  },
  // subCommands mapea nombres de comandos a sus definiciones
  // Esto es lo que hace que `bun run src/index.ts clone <repo>` funcione
  subCommands: {
    clone: cloneCommand,
  },
});

// runMain conecta todo: lee process.argv, resuelve el subcomando,
// parsea los argumentos según la definición, y ejecuta el handler run()
// También genera automáticamente --help y --version a partir de meta
runMain(main);
