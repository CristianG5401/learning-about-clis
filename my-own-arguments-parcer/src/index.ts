/**
 * CLI Argument Parser - construido desde cero para entender cómo los CLIs procesan la entrada.
 *
 * Flujo: process.argv -> destructuring -> parseArgs() -> { command, positionalArgs, flags }
 *
 * Ejemplo: `bun run src/index.ts install react --save -v`
 *   -> command: "install", positionalArgs: ["react"], flags: { save: { value: true, isLongFlag: true }, v: { value: true, isLongFlag: false } }
 */

// process.argv siempre empieza con [binarioDelRuntime, rutaDelScript, ...argsDelUsuario]
// El destructuring descarta los dos primeros y captura el resto como argumentos reales del CLI
const [_bunBin, _scriptPath, ...args] = process.argv;

/**
 * Determina si el siguiente token después de una flag es su valor o es otra flag separada.
 * Usa el patrón "lookahead": espiar el siguiente argumento sin consumirlo.
 *
 * @param flagValue - El siguiente token en argv (puede ser un valor, otra flag, o undefined)
 * @returns `true` si la flag no tiene valor (flag booleana), o el string del valor en caso contrario
 * @throws {Error} Si flagValue es un tipo inesperado (no es string, null, ni undefined)
 */
function checkFlagValue(flagValue: unknown) {
  // No existe siguiente argumento -> la flag es booleana (ej: `--verbose` al final del input)
  if (flagValue === null || flagValue === undefined) {
    return true;
  }

  if (typeof flagValue === "string") {
    // El siguiente token empieza con "-" -> es otra flag, no un valor (ej: `--save -v`)
    if (flagValue.startsWith("-")) {
      return true;
    }

    // El siguiente token es un string normal -> es el valor de la flag (ej: `--output dist`)
    return flagValue;
  }

  throw new Error("Invalid flag value");
}

/**
 * Parsea un array de argumentos CLI en un objeto estructurado.
 * Separa la entrada en: command (primer arg), argumentos posicionales, y flags.
 *
 * @param args - Argumentos del CLI (todo lo que viene después del binario y la ruta del script)
 * @returns Objeto con command, positionalArgs[], y un record de flags
 */
function parseArgs(args: string[]) {
  const result = {
    command: args[0],
    positionalArgs: [] as string[],
    flags: {},
  };

  for (let argIndex = 0; argIndex < args.length; argIndex++) {
    // Saltar el índice 0 porque ya fue capturado como `command` arriba
    if (argIndex === 0) {
      continue;
    }

    const argValue = args[argIndex] ?? "";

    if (argValue.startsWith("-")) {
      // Detectar flag larga (--verbose) vs flag corta (-v)
      const isLongFlag = argValue.startsWith("--");

      // Remover los guiones iniciales: "-v" -> "v", "--verbose" -> "verbose"
      // El primer slice quita un guión, el segundo (solo para flags largas) quita el otro
      let flagName = argValue.slice(1);
      if (isLongFlag) {
        flagName = flagName.slice(1);
      }

      // Lookahead: revisar el siguiente token para ver si es el valor de esta flag
      const flagValue = checkFlagValue(args[argIndex + 1]);

      // Si el siguiente token fue consumido como valor, saltarlo en la siguiente iteración
      // para que no se procese de nuevo como argumento posicional
      if (typeof flagValue === "string") {
        argIndex++;
      }

      // Spread de las flags existentes para preservar las ya parseadas y agregar la nueva
      result.flags = {
        ...result.flags,
        [flagName]: {
          value: flagValue,
          isLongFlag,
        },
      };
    } else {
      // No es una flag -> es un argumento posicional (ej: "react" en `install react`)
      result.positionalArgs.push(argValue);
    }
  }

  return result;
}

console.log("Parsed arguments:", parseArgs(args));
