# Playground: Citty Argument Parser

CLI de ejemplo construido con [citty](https://github.com/unjs/citty) y [consola](https://github.com/unjs/consola), del ecosistema unjs.

Proyecto de aprendizaje para explorar cómo un framework declarativo resuelve el parsing de argumentos CLI, en contraste con [my-own-arguments-parcer](../my-own-arguments-parcer/) donde se implementa desde cero.

## Enfoque declarativo vs imperativo

| Concepto                 | Parser manual (`my-own-arguments-parcer`)  | citty (este proyecto)                  |
| ------------------------ | ------------------------------------------ | -------------------------------------- |
| Argumento posicional     | Clasificar tokens que no empiezan con `-`  | `type: "positional"` en la definición  |
| Flag booleana            | Detectar con `startsWith("-")` + lookahead | `type: "boolean"` en la definición     |
| Flag con valor           | Lookahead manual al siguiente token        | `type: "string"` en la definición      |
| Alias (`-v`/`--verbose`) | No soportado                               | `alias: "v"` en la definición          |
| Subcomandos              | No soportado                               | `subCommands: { clone: cloneCommand }` |
| Ayuda (`--help`)         | No soportado                               | Generada automáticamente               |

## Uso

```bash
bun install
```

```bash
# Ejecutar el subcomando clone
bun run start -- clone https://github.com/user/repo --depth 1 -v
```

```bash
# Ver la ayuda generada automáticamente
bun run start -- --help
bun run start -- clone --help
```

## Estructura

```text
src/
└── index.ts    # Define el comando principal con subCommands y el subcomando clone
```

## Dependencias

- **[citty](https://github.com/unjs/citty)** - Framework declarativo para CLIs (parsing, validación, --help)
- **[consola](https://github.com/unjs/consola)** - Logger con formato enriquecido (colores, íconos)
