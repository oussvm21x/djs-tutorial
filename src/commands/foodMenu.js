import { SlashCommandBuilder } from 'discord.js'


const foodMenu = new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Order food')

export default foodMenu 