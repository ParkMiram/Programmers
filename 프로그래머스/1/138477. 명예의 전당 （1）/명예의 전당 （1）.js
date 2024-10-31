function solution(k, score) {
    const arr = [];
    const result = [];

    score.forEach(item => {
        if (arr.length < k) arr.push(item);
        else if (item > Math.min(...arr)) arr[arr.indexOf(Math.min(...arr))] = item;
        arr.sort((a, b) => b - a);
        result.push(arr.length > 0 ? Math.min(...arr) : -1);
    });

    return result;
}