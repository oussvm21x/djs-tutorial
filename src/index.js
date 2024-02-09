import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v9';

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

async function slashStarter() {
    const commands = [
        {
            name: 'order',
            description: 'Replies with ordred food!',
            options: [
                {
                    name: 'food',
                    description: 'food to order',
                    required: true,
                    type: 3,
                    choices: [
                        {
                            name: "Pizza",
                            value: "Pizza"
                        },
                        {
                            name: "Humberger",
                            value: "Humberger"
                        },
                        {
                            name: "Panini",
                            value: "Panini"
                        }
                    ]

                },
                {
                    name: 'drink',
                    description: 'drink to order',
                    required: true,
                    type: 3,
                    choices: [
                        {
                            name: "Water",
                            value: "Watar"
                        },
                        {
                            name: "Cola",
                            value: "cola"
                        },
                        {
                            name: "Coffee",
                            value: "Coffee"
                        }
                    ]
                },
                {
                    name: 'snacks',
                    description: 'snacks to order',
                    required: true,
                    type: 3,
                    choices: [
                        {
                            name: "Water",
                            value: "Watar"
                        },
                        {
                            name: "Cola",
                            value: "cola"
                        },
                        {
                            name: "Coffee",
                            value: "Coffee"
                        }
                    ]
                }
            ],

        },
        {
            name: 'papicho',
            description: 'Papicho paicho'
        }
    ];

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;


    switch (interaction.commandName) {
        case 'order': {
            const food = interaction.options.get('food').value
            const drink = interaction.options.get('drink').value
            await interaction.reply(`You ordred ${food} with a ${drink}!`);
            console.log("Food had been orderd !")
            break;
        }
        case 'papicho': {
            await interaction.reply('Aller milano!');
            console.log("Papicho command had been used")
            break;
        }
    }

});



client.login(TOKEN);
