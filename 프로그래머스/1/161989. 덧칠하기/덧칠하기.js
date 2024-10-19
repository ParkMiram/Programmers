function solution(n, m, section) {
    let count = 0;
    // 마지막으로 칠한 끝의 index
    let endPoint = 0;

    for (const sec of section) {
        if (sec > endPoint) {
            count++;
            endPoint = sec + m - 1;
        }
    }

    return count;
}