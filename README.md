# Learning About CLIs 🧪

Pequeños proyectos para entender cómo funcionan los CLIs y aprender a construirlos (lástima que este proyecto <https://github.com/HKUDS/CLI-Anything> hace CLIs solo y hace parecer este trabajo como una pérdida de tiempo).

## Los proyectos

### [my-own-arguments-parcer](./my-own-arguments-parcer/)

Parser de argumentos hecho a mano, sin librerías, solo TypeScript.

Aquí aprendí cómo `process.argv` entrega los argumentos crudos y cómo un ciclo con lookahead puede convertirlos en algo útil. No soporta aliases ni subcomandos, pero es trabajo honesto.

### [playground-citty-arguments-parcer](./playground-citty-arguments-parcer/)

Mismo concepto pero usando citty, un framework declarativo del ecosistema unjs. Describes lo que quieres y citty hace la magia: parsing, validación, `--help` gratis, aliases... todo lo que me dio pereza o no sabía cómo implementar en el anterior.

## ¿Por qué este orden?

Primero construir uno desde cero para entender el dolor. Después usar un framework y apreciar lo que resuelve.

## Stack

- **Runtime:** Bun
- **Lenguaje:** TypeScript
