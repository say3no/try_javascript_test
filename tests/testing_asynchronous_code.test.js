import {
    test,
    expect
} from 'jest';


function returnPromise(bool = true) {
    return new Promise((resolve, reject) => {
        if (bool === true) {
            resolve('peanut butter');
        } else if (bool === false) {
            reject('error');
        }
    });
}

async function asyncFunc(bool = true) {
    if (bool === true) {
        return 'peanut butter';
    } else if (bool === false) {
        throw 'error';
    }
}

/*
// testのcallback関数の引数をdoneにすると、done callbackが呼ばれるまで待つ。
test('the data is peanut butter', done => {
    function callback(data) {
        console.debug("aaaaaaaaaa");
        expect(data).toBe('peanut butter');
        done(); // こいつが呼ばれるのを待つ
    }
    fetchData(callback);
});
*/

// ## Promise
test('the data is peanut butter', () => {
    expect.assertions(1);
    return asyncFunc().then(data => {
        expect(data).toBe('peanut butter');
    });
});

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return asyncFunc(false).catch(e => expect(e).toMatch('error'));
});

// ## .resolves / .rejects
test('the data is peanut butter', () => {
    expect.assertions(1);
    return expect(returnPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return expect(returnPromise(false)).rejects.toMatch('error');
});

// ## Async/Await
test('the data is peanut butter', async() => {
    expect.assertions(1);
    const data = await asyncFunc();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async() => {
    expect.assertions(1);
    try {
        await asyncFunc(false);
    } catch (e) {
        expect(e).toMatch('error');
    }
});

test('the data is peanut butter', async() => {
    expect.assertions(1);
    await expect(asyncFunc()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async() => {
    expect.assertions(1);
    await expect(asyncFunc(false)).rejects.toMatch('error');
});