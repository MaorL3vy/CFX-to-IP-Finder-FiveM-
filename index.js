const axios = require("axios");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const chalk = require("chalk");

const rl = readline.createInterface({ input, output });

const promptUserForURL = async () => {
  const userInput = await rl.question(chalk.yellow("🔗 Please enter the CFX URL (e.g., https://cfx.re/join/xxxxxx): "));
  return userInput.trim();
};

const fetchIPFromCFX = async (url) => {
  try {
    const response = await axios.get(url, {
      validateStatus: (status) => status >= 200 && status < 300,
    });
    return response.headers["x-citizenfx-url"].replace("http://", "").replace("/", "");
  } catch (error) {
    throw new Error(`Failed to fetch IP address. Details: ${error.message}`);
  }
};

const runApp = async () => {
  try {
    console.log(chalk.green.bold("Welcome to the CFX to IP Finder!"));
    const userInput = await promptUserForURL();
    const formattedUrl = userInput.startsWith("http") ? userInput : `https://${userInput}`;

    console.log(chalk.yellow("Resolving the CFX URL to IP address..."));
    console.log(chalk.magenta("----------------------------------------"));
    const resolvedIp = await fetchIPFromCFX(formattedUrl);
    console.log(chalk.blue(`✨ CFX URL: ${formattedUrl}\n🌐 Resolved IP Address: ${resolvedIp}\n🎉 Enjoy your connection!`));
  } catch (error) {
    console.log(chalk.magenta("----------------------------------------"));
    console.log(chalk.red.bold(`❌ Error: ${error.message}`));
  } finally {
    console.log(chalk.magenta("----------------------------------------"));
    rl.close();
    console.log(chalk.green.bold("Thank you for using the CFX to IP Finder! Have a great day!"));
  }
};

runApp();
