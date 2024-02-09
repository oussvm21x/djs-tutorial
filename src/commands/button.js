import { SlashCommandBuilder } from 'discord.js'

const button = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bna a user')
    .addUserOption(
        option => option.setDescription('user to ban').setName("target").setRequired(true)
    )
    .addStringOption(
        option => option.setName('reason').setDescription('Reason to ban the user').setRequired(true)
    )



export default button