import chalk from "chalk";

const promptSchemaQRCode = [
  {
    name: "dataType",
    description: chalk.yellow(
      "Escolha o tipo de dado (1- URL, 2- WiFi, 3- vCard, 4- Texto)"
    ),
    pattern: /^[1-4]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 4"),
    required: true,
  },
  {
    name: "link",
    description: chalk.yellow("Digite a URL ou texto para gerar o QR Code"),
  },
  {
    name: "ssid",
    description: chalk.yellow("Nome da rede WiFi (SSID)"),
  },
  {
    name: "wifiPassword",
    description: chalk.yellow("Senha do WiFi (deixe vazio se aberta)"),
  },
  {
    name: "wifiEncryption",
    description: chalk.yellow("Tipo de criptografia (WPA, WEP, nopass)"),
  },
  {
    name: "vcardName",
    description: chalk.yellow("Nome (vCard)"),
  },
  {
    name: "vcardPhone",
    description: chalk.yellow("Telefone (vCard)"),
  },
  {
    name: "vcardEmail",
    description: chalk.yellow("Email (vCard)"),
  },
  {
    name: "outputType",
    description: chalk.yellow(
      "Escolha a saida (1- Terminal, 2- PNG, 3- JPG)"
    ),
    pattern: /^[1-3]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 3"),
    required: true,
  },
  {
    name: "errorCorrection",
    description: chalk.yellow(
      "Nivel de correcao de erro (1- L, 2- M, 3- Q, 4- H)"
    ),
    pattern: /^[1-4]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 4"),
    required: true,
  },
  {
    name: "fgColor",
    description: chalk.yellow("Cor do QR (hexadecimal, ex: #000000)"),
  },
  {
    name: "bgColor",
    description: chalk.yellow("Cor de fundo (hexadecimal, ex: #FFFFFF)"),
  },
];

export default promptSchemaQRCode;
