const myFunctions = require('./functions.js');

test('Testing div -- basic', () => {
    const target = 4;
    const result = myFunctions.div(12, 3);
    expect(target).toBe(result);
});

test('Testing div -- divide by 1', () => {
    const target = 10;
    const result = myFunctions.div(10, 1);
    expect(target).toBe(result);
});

test('Testing div -- decimals', () => {
    const target = 2.5;
    const result = myFunctions.div(5, 2);
    expect(target).toBe(result);
});

test("Testing div -- divide by 0", () => {
    const target = Infinity
    const result = myFunctions.div(5, 0);
    expect(target).toBe(result);
});

test("Testing div -- divide 0 by 0", () => {
    const target = NaN
    const result = myFunctions.div(0, 0);
    expect(target).toBe(result);
});

test("Testing containsNumbers -- basic", () => {
    const target = true
    const result = myFunctions.containsNumbers("0");
    expect(target).toBe(result);
})

test("Testing containsNumbers -- basic larger", () => {
    const target = true
    const result = myFunctions.containsNumbers("111");
    expect(target).toBe(result);
})

test("Testing containsNumbers -- mixed", () => {
    const target = true
    const result = myFunctions.containsNumbers("a1b2");
    expect(target).toBe(result);
})

test("Testing containsNumbers -- empty", () => {
    const target = false
    const result = myFunctions.containsNumbers(" ");
    expect(target).toBe(result);
})

test("Testing containsNumbers -- no numbers", () => {
    const target = false
    const result = myFunctions.containsNumbers("aaa");
    expect(target).toBe(result);
})