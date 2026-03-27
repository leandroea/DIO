import qrTerminal from "qrcode-terminal";
import QRCode from "qrcode";
import chalk from "chalk";
import fs from "fs";
import path from "path";

const errorCorrectionLevels = {
  1: "L",
  2: "M",
  3: "Q",
  4: "H",
};

function buildQRData(result) {
  const dataType = parseInt(result.dataType);

  switch (dataType) {
    case 1: // URL
      return result.link;
    case 2: // WiFi
      const encryption = result.wifiEncryption || "nopass";
      return `WIFI:T:${encryption};S:${result.ssid};P:${result.wifiPassword};;`;
    case 3: // vCard
      return `BEGIN:VCARD\nVERSION:3.0\nN:${result.vcardName}\nTEL:${result.vcardPhone}\nEMAIL:${result.vcardEmail}\nEND:VCARD`;
    case 4: // Text
    default:
      return result.link;
  }
}

async function handle(err, result) {
  if (err) {
    console.log(chalk.red("Erro na aplicacao:"), err);
    return;
  }

  try {
    const qrData = buildQRData(result);
    const outputType = parseInt(result.outputType);
    const errorCorrection = errorCorrectionLevels[parseInt(result.errorCorrection)] || "M";

    // Default colors
    const fgColor = result.fgColor || "#000000";
    const bgColor = result.bgColor || "#FFFFFF";

    const options = {
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      width: 300,
    };

    if (outputType === 1) {
      // Terminal output
      qrTerminal.generate(qrData, { small: true }, (qrcode) => {
        console.log(chalk.green("QR Code gerado com sucesso:\n"));
        console.log(qrcode);
      });
    } else {
      // Image output (PNG or JPG)
      const ext = outputType === 2 ? "png" : "jpg";
      const filename = `qrcode-${Date.now()}.${ext}`;
      const filepath = path.join(process.cwd(), filename);

      if (outputType === 2) {
        await QRCode.toFile(filepath, qrData, options);
      } else {
        await QRCode.toFile(filepath, qrData, {
          ...options,
          type: "jpg",
        });
      }

      console.log(chalk.green(`QR Code salvo com sucesso em: ${filename}`));
      console.log(chalk.cyan(`Caminho: ${filepath}`));
    }
  } catch (error) {
    console.log(chalk.red("Erro ao gerar QR Code:"), error.message);
  }
}

export default handle;
