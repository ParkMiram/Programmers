function calc(diffs, times, level, limit) {
    let sum = 0;

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] <= level) sum += times[i];
        else sum += (times[i] + times[i - 1]) * (diffs[i] - level) + times[i];

        if (sum > limit) break;
    }

    return sum;
}

function solution(diffs, times, limit) {
    let start = 1, end = 100000;
    let result = end;

    while (start <= end) {
        let level = Math.floor((start + end) / 2);
        let sum = calc(diffs, times, level, limit);

        if (sum <= limit) {
            result = level;
            end = level - 1;
        } else {
            start = level + 1;
        }
    }

    return result;
}