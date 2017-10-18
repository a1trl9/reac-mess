function test_01(arr) {
    const length = arr.length
    const result = []
    for (let i = 0; i < length; i++) {
        result.push(arr[i] + 1)
    }
    return result
}

function test_02(arr) {
    const length = arr.length
    const result = Array(length)
    for (let i = 0; i < length; i++) {
        result[i] = arr[i] + 1
    }
    return result
}

function test_03(arr) {
    const result = new Array(arr.length)
    return arr.forEach((el, index) => {
        result[index] = el + 1
    })
    return result
}

function benchmark(func, ...args) {
    start_time = Date.now()
    func(...args)
    end_time = Date.now()
    console.log(end_time - start_time)
}

test_array = []
for (let i = 0; i < 5000000; i++) {
    test_array.push(Math.floor(50 + Math.random()))
}

const result_01 = benchmark(test_01, test_array)
const result_02 = benchmark(test_02, test_array)
const result_03 = benchmark(test_03, test_array)