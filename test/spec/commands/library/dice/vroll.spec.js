import VRoll from '../../../../../src/commands/library/dice/vtmRoll.js';
import Fakes from '../../../../fakes/index.js';

fdescribe('VRoll.execute', () => {
	const Fragments = Object.freeze({
		CRITICAL_RISK: 'At risk of *messy critical*...\n',
		FAILURE_RISK: 'At risk of *bestial failure*.\n',
	});
	describe('no dice were rolled', () => {
		it('replies with an error message', async () => {
			const interaction = Fakes.Interaction.create();
			interaction.options.getNumber
				.withArgs('white').and.returnValue(0)
				.withArgs('red').and.returnValue(0)
				.and.returnValue(undefined);

			await new VRoll().execute(interaction);

			const errorMessage = 'Bring your dice to the game next time, bro.';
			expect(interaction.reply).toHaveBeenCalledWith(errorMessage);
		});
	});
	describe(`
		2 white dice, all fails
		3 red dice, all fails,
		no difficulty
		`, () => {
		const white = 2, red = 3;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.0, 0.1, 0.2, 0.3, 0.4);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 1 2${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 3 4 5${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 0 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 0\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		2 white dice, one success and one failure,
		0 red dice,
		no difficulty
		`, () => {
		const white = 2, red = 0;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.5, 0.45);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 6 5${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining('Red');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		2 white dice, one critical success and one failure,
		0 red dice, all fails,
		no difficulty
		`, () => {
		const white = 2, red = 0;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.3, 0.99);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 4 10${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining('Red');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 2 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 2\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one success and one failure,
		no difficulty
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.24, 0.59);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 3 6${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 success', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one critical success and one failure,
		no difficulty
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.24, 0.9);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 3 10${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 2 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 2\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides a warning about critical success', () => {
			const fragment = jasmine.stringContaining(Fragments.CRITICAL_RISK);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one critical failure and one success,
		no difficulty
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.09, 0.8);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 1 9${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides a warning about critical failure', () => {
			const fragment = jasmine.stringContaining(Fragments.FAILURE_RISK);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one critical failure and one critical success,
		no difficulty
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(undefined);

			spyOn(Math, 'random').and.returnValues(0.09, 0.9);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 1 10${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 successes', () => {
			const fragment = jasmine.stringContaining('**Successes:** 2\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides a warning about critical failure', () => {
			const fragment = jasmine.stringContaining(Fragments.FAILURE_RISK);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides a warning about critical success', () => {
			const fragment = jasmine.stringContaining(Fragments.CRITICAL_RISK);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		2 white dice, one success and one failure,
		0 red dice,
		difficulty set to 2 (failure)
		`, () => {
		const white = 2, red = 0;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(2);

			spyOn(Math, 'random').and.returnValues(0.5, 0.45);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 6 5${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining('Red');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 success as a failure', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1... Challenge failed.\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		2 white dice, one success and one critical failure,
		0 red dice,
		difficulty set to 2 (failure)
		`, () => {
		const white = 2, red = 0;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(2);

			spyOn(Math, 'random').and.returnValues(0.5, 0.0);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 6 1${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining('Red');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 success as a failure', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1... Challenge failed.\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one success and one critical failure,
		difficulty set to 2 (failure)
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(2);

			spyOn(Math, 'random').and.returnValues(0.5, 0.0);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the raw red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 6 1${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 1 success as a bestial failure', () => {
			const fragment = jasmine.stringContaining('**Successes:** 1... Challenge failed. *The beast awakens.*\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		2 white dice, one success and one critical success,
		0 red dice,
		difficulty set to 2 (success)
		`, () => {
		const white = 2, red = 0;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(2);

			spyOn(Math, 'random').and.returnValues(0.8, 0.9);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}White: 9 10${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining('Red');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 3 successes as a success', () => {
			const fragment = jasmine.stringContaining('**Successes:** 3... Challenge overcome.\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
	describe(`
		0 white dice,
		2 red dice, one success and one critical success,
		difficulty set to 2 (success)
		`, () => {
		const white = 0, red = 2;
		const interaction = Fakes.Interaction.create();
		beforeAll(async () => {
			interaction.options.getNumber
				.withArgs('white').and.returnValue(white)
				.withArgs('red').and.returnValue(red)
				.and.returnValue(2);

			spyOn(Math, 'random').and.returnValues(0.8, 0.9);

			await new VRoll().execute(interaction);
		});
		it('adds a preamble summarizing the args', () => {
			const fragment = jasmine.stringContaining(`Rolling ${white} dice with ${red} hunger dice...\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the raw white rolls', () => {
			const fragment = jasmine.stringContaining('White');
			expect(interaction.reply).not.toHaveBeenCalledWith(fragment);
		});
		it('provides no red rolls', () => {
			const fragment = jasmine.stringContaining(`${'`'}Red: 9 10${'`'}\n`);
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
		it('provides the final result as 3 successes as a messy success', () => {
			const fragment = jasmine.stringContaining('**Successes:** 3... Challenge overcome... with the beast\'s *messy* help.*\n');
			expect(interaction.reply).toHaveBeenCalledWith(fragment);
		});
	});
});
