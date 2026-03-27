import chalk from "chalk";
import prompt from "prompt";
import handle from "./handle.js";
import promptSchemaPassword from "../../prompts-schema/prompt-schema-password.js";

async function createPassword() {
  prompt.get(promptSchemaPassword, async (err, result) => {
    if (err) {
      console.log(chalk.red("Erro na aplicacao:"), err);
      return;
    }

    try {
      const options = {
        passwordType: parseInt(result.passwordType),
        excludeSimilar: result.excludeSimilar.toLowerCase() === "s",
      };

      const { password, strength } = await handle(options);

      // Display password
      console.log(chalk.green("\nSenha gerada:"));
      console.log(chalk.bold(password));

      // Show strength indicator
      if (result.showStrength.toLowerCase() === "s") {
        const strengthColors = {
          red: chalk.red,
          yellow: chalk.yellow,
          green: chalk.green,
          cyan: chalk.cyan,
        };
        const colorFn = strengthColors[strength.color] || chalk.white;
        console.log(`\nForca: ${colorFn(strength.label)} (${strength.score}/6)`);
      }

      // Copy to clipboard
      if (result.copyToClipboard.toLowerCase() === "s") {
        try {
          const clipboardy = await import("clipboardy");
          clipboardy.default.writeSync(password);
          console.log(chalk.cyan("\nSenha copiada para a area de transferencia!"));
        } catch (clipErr) {
          console.log(chalk.yellow("\nAviso: Nao foi possivel copiar para area de transferencia."));
        }
      }

      console.log("");
    } catch (error) {
      console.log(chalk.red("Erro ao gerar senha:"), error.message);
    }
  });

  prompt.start();
}

export default createPassword;
