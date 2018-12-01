// # Mock Functions
// 2つのmockの用意の仕方がある。

// forrach関数をテストするっていうケースを想像してみよう。こいつはiterableを引数にとって、ひとつずつ返すっていう関数だ。
function foreach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

// この関数をテストするために、mock 関数を用意して、期待通りのcallbackの実行が保証されたmockの状態を見てみよう。
const mockCallback = jest.fn(x => 42 + x);
foreach([0, 1], mockCallback);

// mockは呼ばれた回数やらなにやらを覚えている？
test('mock forensic', () => {
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);
});

const myMock = jest.fn();
console.log(myMock()); // undefned
console.log(myMock()); // undefned

myMock.mockReturnValueOnce(10).mockReturnValue('hoge');
console.log(myMock());
console.log(myMock());
console.log(myMock());
console.log(myMock());
console.log(myMock());
console.log(myMock());

// ## モジュールのモック
// あとでやる



// ## モックの実装
const filterTestFn = jest.fn();
filterTestFn.mockReturnValueOnce(true).mockImplementationOnce(false);

const result = [11, 12].filter(filterTestFn);
console.log(result); // 11
console.log(filterTestFn.mock.calls);


const myMockFn1 = jest.fn().mockImplementation(() => {
    return 'aaaa';
});


const myMockFn2 = jest.fn().mockImplementationOnce(() => {
    return 'bbbbbb';
}).mockImplementationOnce(() => {
    return 'ccccccc';
});

console.log(myMockFn1());
console.log(myMockFn1());
console.log(myMockFn2());
console.log(myMockFn2());
console.log(myMockFn2()); // undefined


const myMockFn3 = jest.fn(() => {
    return 'default';
}).mockImplementationOnce(() => {
    return 'temporaly function';
});

console.log(myMockFn3());
console.log(myMockFn3());
console.log(myMockFn3());
console.log(myMockFn3());

// >よくチェーンされる(そしてのために常に thisを返す必要のある)メソッドがあるケースのために
// >この実装を単純化する糖衣APIを.mockReturnThis() の形で全てのモックが備えています。
// 何を言っているのかよくわからないが、とりあえず写経すると…

const myObj = {
    myMethod: jest.fn().mockReturnThis(),
};
// したのと一緒

const otherObj = {
    myMethod: jest.fn(function() {
        return this;
    }),
};

console.log(myObj);
console.log(otherObj);

// mock名

console.log(myMockFn3());
myMockFn3.mockName('saegusa key');
console.log(myMockFn3());



// Custom Matcher
// The mock function was called at least once
test('mock function test', () => {
    expect(myMockFn3).toBeCalled();

    // The mock function was called at least once with the specified args
    //expect(myMockFn3).toBeCalledWith(arg1, arg2);

    // The last call to the mock function was called with the specified args
    //expect(myMockFn3).lastCalledWith(arg1, arg2);

    // All calls and the name of the mock is written as a snapshot
    expect(myMockFn3).toMatchSnapshot();
});