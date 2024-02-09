import { SlashCommandBuilder } from 'discord.js'


const orderFood = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order food')
    .addStringOption(option =>
        option.setName('food')
            .setDescription('Dishses')
            .setRequired(true)
            .addChoices(
                { name: 'Pizza', value: 'pizza' },
                { name: 'Humberger', value: 'Humberger' },
                { name: 'Panini', value: 'Panini' },
            ))
    .addStringOption(option =>
        option.setName('drink')
            .setDescription('drinks')
            .setRequired(true)
            .addChoices(
                { name: 'CocaCola', value: 'CocaCola' },
                { name: 'Mokka', value: 'Mokka' },
                { name: 'Water', value: 'Water' },
            ))


export default orderFood 