import {
    ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder,
    ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder,
    ButtonStyle,
} from 'discord.js';


const commandInteractionHandler = async (cmdName, interaction) => {
    switch (cmdName) {
        case 'order': {
            const food = options.getString('food');
            const drink = options.getString('drink');
            await interaction.reply(`You ordered ${food} with a ${drink}!`);
            console.log("Food has been ordered!");
            break;
        }
        case 'papicho': {
            await interaction.reply('Aller milano!');
            console.log("Papicho command has been used");
            break;
        }
        case 'roles': {
            await interaction.reply('New role has been asigned to ');
            console.log("Roles command has been used");
            break;
        }
        case 'menu': {
            console.log('Menu ! ')
            const actionRow = new ActionRowBuilder().setComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('starter')
                    .setPlaceholder('Make a selection!')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Bulbasaur')
                            .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                            .setValue('bulbasaur'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Charmander')
                            .setDescription('The Fire-type Lizard Pokémon.')
                            .setValue('charmander'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Squirtle')
                            .setDescription('The Water-type Tiny Turtle Pokémon.')
                            .setValue('squirtle'),
                    )
            )
            interaction.reply(
                {
                    components: [actionRow.toJSON()]
                }
            )

        }

        case 'survey': {
            const modal = new ModalBuilder()
                .setCustomId('myModal')
                .setTitle('My Modal');

            // Add components to modal

            // Create the text input components
            const favoriteColorInput = new TextInputBuilder()
                .setCustomId('favoriteColorInput')
                // The label is the prompt the user sees for this input
                .setLabel("What's your favorite color?")
                // Short means only a single line of text
                .setStyle(TextInputStyle.Short);

            const hobbiesInput = new TextInputBuilder()
                .setCustomId('hobbiesInput')
                .setLabel("What's some of your favorite hobbies?")
                // Paragraph means multiple lines of text.
                .setStyle(TextInputStyle.Paragraph);

            // An action row only holds one text input,
            // so you need one action row per text input.
            const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
            const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);
        }
        case 'ban': {
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Confirm Ban')
                .setStyle(ButtonStyle.Danger);

            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Primary);
            const sma7lo = new ButtonBuilder()
                .setCustomId('sma7lo')
                .setLabel('Sma7lo')
                .setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(cancel, sma7lo, confirm);

            await interaction.reply({
                content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
                components: [row],
            });
        }
    }
}


export default commandInteractionHandler; 