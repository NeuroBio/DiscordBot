import Roll from '#src/commands/library/dice/roll.js';
import Fakes from '#fakes';

describe ('Roll.execute', () => {
	const Param = Object.freeze({ NDX: 'ndx' });
	const Error = Object.freeze({
		INVALID: `${'`'}ERROR: Roll request must be nDx or ndx format, where both n and x are integers.${'`'}`,
		NO_DICE: 'I rolled 0 dice for you.  *You\'re welcome.*',
		IMPOSSIBLE_DICE: 'Sorry, I left my interdimensional, sideless dice at home.',
		STUPID_DICE: 'A d1?  *Really?*  Okay, I\'ll do simple addition for you: ',
	});

	describe('rolling invalid 4.5d7', () => {
		it('throws invalid error', async () => {
			const nDx = '4.5d7';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling invalid 4d7.7', () => {
		it('throws invalid error', async () => {
			const nDx = '4d7.7';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling invalid 4x7', () => {
		it('throws invalid error', async () => {
			const nDx = '4x7';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling invalid 0d6', () => {
		it('throws funny invalid error', async () => {
			const nDx = '0d6';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.NO_DICE);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling invalid 1d0', () => {
		it('throws funny invalid error', async () => {
			const nDx = '1d0';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.IMPOSSIBLE_DICE);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling invalid 1d0', () => {
		it('throws funny invalid error', async () => {
			const nDx = '5d1';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(`${Error.STUPID_DICE}${5}.`);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('rolling 6d10', () => {
		it('returns the raw rolls', async () => {
			const nDx = '6d10';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0, 0.2, 0.4, 0.6, 0.8, 0.999);

			await new Roll().execute(interaction);
			const preamble = `Rolling *${nDx}*\n`;
			const rawRolls = `${'`'}Raw Rolls: 1 3 5 7 9 10${'`'}\n`;
			const total = `${'`'}Total: 35${'`'}\n`;
			expect(interaction.reply).toHaveBeenCalledWith(`${preamble}${rawRolls}${total}`);
		});
	});
	describe('rolling 1D6', () => {
		it('returns the raw rolls', async () => {
			const nDx = '1D6';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0.51);

			await new Roll().execute(interaction);
			const preamble = `Rolling *${nDx}*\n`;
			const rawRolls = `${'`'}Raw Rolls: 4${'`'}\n`;
			const total = `${'`'}Total: 4${'`'}\n`;
			expect(interaction.reply).toHaveBeenCalledWith(`${preamble}${rawRolls}${total}`);
		});
	});
	describe('rolling 2D20', () => {
		it('returns the raw rolls', async () => {
			const nDx = '2D20';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NDX).and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0.46, 0.73);

			await new Roll().execute(interaction);
			const preamble = `Rolling *${nDx}*\n`;
			const rawRolls = `${'`'}Raw Rolls: 10 15${'`'}\n`;
			const total = `${'`'}Total: 25${'`'}\n`;
			expect(interaction.reply).toHaveBeenCalledWith(`${preamble}${rawRolls}${total}`);
		});
	});
});