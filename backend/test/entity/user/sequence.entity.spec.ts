import { Sequence } from '../../../src/entity/user/sequence.entity';

describe('Sequence Entity', () => {
  it('should create an instance', () => {
    const sequence = new Sequence(1);
    expect(sequence).toBeDefined();
    expect(sequence.id).toBe(1);
  });
});
