import EightBall from '../../../../../../src/commands/library/dice/eightball.js';
import Fakes from '../../../../../fakes/index.js';

describe('Eightball.execute', () => {
	const Param = Object.freeze({ QUESTION: 'question' });
	const EightBallResponses = Object.freeze(['Yes', 'No']);
	it('repeats the user\'s question and send an answer', async () => {
		const question = 'Will this test pass?';
		spyOn(Math, 'random').and.returnValues(0);

		const interaction = Fakes.Interaction.create();
		interaction.options
			.getString.withArgs(Param.QUESTION).and.returnValue(question);

		await new EightBall({ EightBallResponses }).execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(`Question: *${question}*\n${'`'}${EightBallResponses[0]}${'`'}`);
	});
});
