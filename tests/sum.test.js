const sum = require('../src/sum');

// toBe は Obejt.is(a,b) に等しい
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});