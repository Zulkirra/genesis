'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Generates void trader embeds
 */
class VoidTraderEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {VoidTrader} voidTrader - The current state of the Void Trader
   * @param {string} platform - platform
   */
  constructor(bot, voidTrader, { platform = 'pc', language = 'en' }) {
    super();

    this.color = voidTrader.active ? 0x0EC9FF : 0xff6961;

    if (voidTrader.active || voidTrader.inventory.length > 0) {
      this.fields = voidTrader.inventory.map(i => ({
        name: i.item,
        value: `${i.ducats} ducats + ${i.credits}cr`,
        inline: true,
      }));
    } else {
      this.fields = [];
    }
    this.fields.push({
      name: bot.stringManager.getString('void_trader_time', undefined, {
        language,
        replacements: {
          action: voidTrader.active ?
            bot.stringManager.getString('void_trader_departure', undefined, { language }) :
            bot.stringManager.getString('void_trader_arrival', undefined, { language }),
          location: voidTrader.location,
        },
      }),
      value: `${voidTrader.active ? voidTrader.endString : voidTrader.startString}`
        || bot.stringManager.getString('datapending', undefined, { language }),
    });
    this.title = bot.stringManager.getString('void_trader_title', undefined, { language, replacements: { platform: platform.toUpperCase() } });
    this.thumbnail = {
      url: 'http://i.imgur.com/z0wU29P.png',
    };
  }
}

module.exports = VoidTraderEmbed;
