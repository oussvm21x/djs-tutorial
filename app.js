import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import orderFood from './src/commands/order.js'
import roles from './src/commands/roles.js'
import permissions from './src/commands/permission.js';
import foodMenu from './src/commands/foodMenu.js'
import survey from './src/commands/survey.js';
import commandInteractionHandler from './src/commandInteraction.js';
import button from './src/commands/button.js';


config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations

    ],
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.username}`);
    console.log('Bot Client ID:', client.user.id);
    await slashStarter();
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.createdAt.toString());
    console.log(message.author.tag);
});

client.on('channelCreate', (channel) => {
    console.log(`A channel was created: ${channel.name}`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const { commandName, options } = interaction;
        commandInteractionHandler(commandName, interaction)
    }
    else if (interaction.isStringSelectMenu()) {
        // const valuesList = interaction.values
        // valuesList.forEach(item => {
        //     console.log(item)
        // })
        console.log(interaction)
        interaction.reply('Hello')
    }
    else if (interaction.customId === 'myModal') {
        await interaction.reply({ content: 'Your submission was received successfully!' });
        const modalSubmitFields = interaction.fields.fields;
        modalSubmitFields.forEach((field, fieldName) => {
            console.log(`Field Name: ${fieldName}`);
            console.log(`Field Value: ${field.value}`);
        });
    }
    else if (interaction.isButton) {
        await interaction.reply({ content: 'Your submission was received successfully!' })
        const buttonValue = interaction.customId
        const commandName = interaction.message.interaction.commandName
        console.log(`Your request to ${commandName} has been sent seccessflly with the value : ${buttonValue}`)
    }
}
);

async function slashStarter() {
    const commands = [orderFood.toJSON(), roles.toJSON(), permissions.toJSON(), foodMenu.toJSON(), survey.toJSON(), button.toJSON()]
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

client.login(TOKEN);
