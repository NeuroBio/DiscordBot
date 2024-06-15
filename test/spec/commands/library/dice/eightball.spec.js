import EightBall from '../../../../../src/commands/library/dice/eightball.js';
import Fakes from '../../../../fakes/index.js';

describe('eightball.execute', () => {
	const EightBallResponses = Object.freeze(['Yes', 'No']);

	it('repeats the user\'s question and send an answer', () => {
		const question = 'Will this test pass?';
		spyOn(Math, 'random').and.returnValues(0);
		const interaction = Fakes.Interaction.create();
		interaction.options.getString.and.returnValue(question);
		new EightBall({ EightBallResponses }).execute(interaction);

		expect(interaction.reply).toHaveBeenCalledWith(`Question: ${question}\n${EightBallResponses[0]}`);
	});
});
