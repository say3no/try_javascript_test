// 環境のsetup(建築)とteadwon(ぶっこわし)
test('hogehoge', () => {
    expect(0).toBe(0);
});
/** 
// beforeAllでは、dbのcreateやtableのinsertみたいな、テストの前編通して一度しか実行しないような処理を定義するとベネ
// afterAllはもう分かるよね
beforeAll(() => {
    return initializeCityDatabase(); // Promiseを返さないとだめ
});


// beforeach , beforallは、以降行うすべてのblockに対して実行される
beforeEach(() => {
    return initializeFoodDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna)')).toBeTruthy();
});

test('city database has San Juan ', () => {
    expect(isCity('San Juan)')).toBeTruthy();
});

// scopping: 範囲分け。 decribeでblockを分けることができる。便利だね。この内側で、beforEach,afterEachを定義すればいいんだね。
describe(' matching cities to foods', () => {
    // テスト前後のsetupができる. というよりは、beforeEachはその内側でawaitをして、promise.allしているみたいなんだな。
    beforeEach(() => {
        return initializeFoodDatabase();
    });

    test('Vienna <3 sausage', () => {
        expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });
});

// Order of execution of describe and test blocks
// Jestは 実際に test が走る前に、すべての describe のハンドラが走る。 


describe('outer', () => {
    console.log('describe outer-a');

    describe('describe inner 1 ', () => {
        console.log('describe inner 1');
        test('test 1', () => {
            console.log('test for describe inner 1 ');
            expect(true).toEqual(true);
        });
    });

    console.log('describe outer-b');

    test('test 1', () => {
        console.log('test for describe outer');
        expect(true).toEqual(true);
    });

    describe('describe inner 2', () => {
        console.log('describe inner 2');
        test('test for describe inner 2', () => {
            console.log('test for describe inner 2');
            expect(false).toEqual(false);
        });
    });

    console.log('describe outer-c');
});

afterAll(() => {
    return clearCityDatabase();
})


// ## General Advice
// テストが失敗した時に最初に確かめるべきことは、そのコケたテストを単体で実行した場合に失敗するかどうかっていうこと。

test.only('this test wil be the only test that runs', () => {
    excpect(true).toBe(true);
});

// onlyのあとのやつは実行されない？
test('this test will not run ', () => {
    excpect(true).toBe(true);
});

*/