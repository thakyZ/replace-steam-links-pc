const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { messages } = require("powercord/webpack");

let prefix;
module.exports = class timestamp extends Plugin {
  startPlugin() {
    prefix = "\\.steam=";
    this.patchMessage();
  }
  patchMessage() {
    //Lighty made this better because he felt like it
    inject(
      "steam-link",
      messages,
      "sendMessage",
      (args) => {
        const regexAGlobal = new RegExp(
          `${prefix}(https:\/\/(store\.)?steam(powered|community)\.com\/.*)`,
          "gi"
        );
        if (args[1].content.search(regexAGlobal) !== -1) {
          args[1].content = args[1].content.replace(
            regexAGlobal,
            "steam://openurl/$1"
          );
        }
        return args;
      },
      true
    );
  }
  pluginWillUnload() {
    uninject("steam-link");
    powercord.api.settings.unregisterSettings(this.entityID);
    powercord.api.settings.unregisterSettings(this.entityID);
  }
};
