# My Own Argument Parser

Parser de argumentos CLI construido desde cero con TypeScript y Bun, sin dependencias externas.

Proyecto de aprendizaje para entender cómo herramientas como `minimist` y `yargs-parser` procesan la entrada de la terminal.

## Qué parsea

| Tipo                 | Ejemplo         | Resultado                                                 |
| -------------------- | --------------- | --------------------------------------------------------- |
| Comando              | `install`       | `command: "install"`                                      |
| Argumento posicional | `react express` | `positionalArgs: ["react", "express"]`                    |
| Flag corta booleana  | `-v`            | `flags: { v: { value: true, isLongFlag: false } }`       |
| Flag larga booleana  | `--verbose`     | `flags: { verbose: { value: true, isLongFlag: true } }`  |
| Flag con valor       | `--output dist` | `flags: { output: { value: "dist", isLongFlag: true } }` |

## Uso

```bash
bun install
```

```bash
bun run start -- install react --save -v
```

Salida:

```json
{
  "command": "install",
  "positionalArgs": ["react"],
  "flags": {
    "save": { "value": true, "isLongFlag": true },
    "v": { "value": true, "isLongFlag": false }
  }
}
```

## Cómo funciona

1. `process.argv` proporciona los argumentos crudos del CLI
2. Se descartan los dos primeros (`bunBinary`, `scriptPath`) mediante destructuring
3. `parseArgs()` recorre los argumentos restantes y los clasifica:
   - El primero es el **command**
   - Los que empiezan con `-` o `--` son **flags**
   - El resto son **argumentos posicionales**
4. `checkFlagValue()` usa un patrón **lookahead** para determinar si una flag tiene valor o es booleana
