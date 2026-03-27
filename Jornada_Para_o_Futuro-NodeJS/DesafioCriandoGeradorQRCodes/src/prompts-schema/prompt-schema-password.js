import chalk from "chalk";

const promptSchemaPassword = [
  {
    name: "passwordType",
    description: chalk.yellow(
      "Tipo de senha (1- Aleatoria, 2- Pronunciavel)"
    ),
    pattern: /^[1-2]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 2"),
    required: true,
  },
  {
    name: "excludeSimilar",
    description: chalk.yellow(
      "Excluir caracteres similares (0, O, 1, l, I)? (s/n)"
    ),
    pattern: /^[snSN]+$/,
    message: chalk.red.italic("Digite s ou n"),
    required: true,
  },
  {
    name: "showStrength",
    description: chalk.yellow(
      "Mostrar indicador de forca? (s/n)"
    ),
    pattern: /^[snSN]+$/,
    message: chalk.red.italic("Digite s ou n"),
    required: true,
  },
  {
    name: "copyToClipboard",
    description: chalk.yellow(
      "Copiar para area de transferencia? (s/n)"
    ),
    pattern: /^[snSN]+$/,
    message: chalk.red.italic("Digite s ou n"),
    required: true,
  },
];

export default promptSchemaPassword;