const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { messages } = require("powercord/webpack");

module.exports = class ReplaceSteamLinks extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "steam",
      description:
        "Replaces Steam links to open in the app for other users without Powercord.",
      usage: "{c} <url>",
      executor: (args) => {
        const regexAGlobal =
          /(https:\/\/(store\.)?steam(powered|community)\.com\/.*)/gi;
        if (args[0].search(regexAGlobal) !== -1) {
          return {
            send: true,
            result: `${args[0].replace(regexAGlobal, "steam://openurl/$1")}`,
          };
        } else {
          return {
            send: false,
            result: `Invalid Steam link: ${args[0]}`,
          };
        }
      },
    });
  }
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("steam");
  }
};
