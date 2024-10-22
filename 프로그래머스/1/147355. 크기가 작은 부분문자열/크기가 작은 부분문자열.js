function solution(t, p) {
    const pLength = p.length;
    return [...Array(t.length - pLength + 1).keys()]
        .filter(i => t.substring(i, i + pLength) <= p)
        .length;
}