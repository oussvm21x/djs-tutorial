import { group } from 'console'
import { SlashCommandBuilder } from 'discord.js'

const permissions = new SlashCommandBuilder()
    .setName('permissions')
    .setDescription('Get or Updates permissions for a user or a role ')
    .addSubcommandGroup(
        group => group
            .setName('user')
            .setDescription('Get and updates user roles and permissions')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('get')
                    .setDescription('Get a user permissions')
                    .addUserOption(option =>
                        option
                            .setName('target')
                            .setDescription('User you want to get or updates permissions')
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('update')
                    .setDescription('Update a user permissions')
                    .addUserOption(option =>
                        option
                            .setName('target')
                            .setDescription('User you want to get or updates permissions')
                            .setRequired(true)
                    )
            )
    )
    .addSubcommandGroup(
        group => group
            .setName('role')
            .setDescription('Get and Update a role permissions')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('get')
                    .setDescription('Get a role permissions')
                    .addRoleOption(option =>
                        option
                            .setName('target')
                            .setDescription('role you want to get or updates permissions')
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('update')
                    .setDescription('Update and Update a role permissions')
                    .addRoleOption(option =>
                        option
                            .setName('target')
                            .setDescription('role you want to get or updates permissions')
                            .setRequired(true)
                    )
            )

    )

export default permissions

