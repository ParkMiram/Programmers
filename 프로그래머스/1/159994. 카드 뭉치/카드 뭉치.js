function solution(cards1, cards2, goal) {
    let sequence1 = 0;
    let sequence2 = 0;

    for (const item of goal) {
        if (item === cards1[sequence1]) sequence1++;
        else if (item === cards2[sequence2]) sequence2++;
        else return "No";
    }

    return "Yes";
}