import { SlashCommandBuilder } from 'discord.js'

const roles = new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Add roles')
    .addRoleOption(option => option
        .setName('options')
        .setRequired(true)
        .setDescription('Set new roles')


    )



export default roles