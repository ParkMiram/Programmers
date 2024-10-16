function solution(players, callings) {
    const curr = new Map();

    players.forEach((name, index) => {
        curr.set(name, index);
    })

    callings.forEach(call => {
        const currIdx = curr.get(call);
        const front = players[currIdx - 1];
        // 순서 변경
        [players[currIdx - 1], players[currIdx]] = [players[currIdx], players[currIdx - 1]];
        // map에 적용
        curr.set(call, curr.get(call) - 1);
        curr.set(front, curr.get(call) + 1);
    })

    return players;
}