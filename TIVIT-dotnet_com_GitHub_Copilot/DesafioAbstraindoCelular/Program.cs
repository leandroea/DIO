using DesafioPOO.Models;

// Exemplo de uso das classes
Console.WriteLine("=== Demonstração: Abstraindo Celular ===");

var iphone = new Iphone("11999999999", "iPhone 13", "IMEI-IPHONE-1234");
iphone.Ligar();
iphone.InstalarAplicativo("WhatsApp");

var nokia = new Nokia("11888888888", "Nokia 3310", "IMEI-NOKIA-5678");
nokia.ReceberLigacao();
nokia.InstalarAplicativo("Snake");
