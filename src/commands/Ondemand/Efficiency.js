'use strict';

const Command = require('../../Command.js');

/**
 * Displays the Warframe efficincy/duration Chart
 */
class Efficiency extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot  The bot object
   */
  constructor(bot) {
    super(bot, 'warframe.misc.efficiency', 'efficiency', 'Display Warframe Efficiency Chart');
    this.efficiencyChart = 'https://i.imgur.com/dT7lpW2.png';
  }

  /**
   * Run the command
   * @param {Message} message Message with a command to handle, reply to,
   *                          or perform an action based on parameters.
   */
  run(message) {
    message.channel.sendFile(this.efficiencyChart, 'efficiency.png',
                             `Operator ${message.author.toString()}, the efficiency table, at your request.`)
     .then(() => {
       if (message.deletable) {
         return message.delete(2000);
       }
       return Promise.resolve();
     }).catch(this.logger.error);
  }
}

module.exports = Efficiency;
