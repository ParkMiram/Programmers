function solution(name, yearning, photo) {
    const member = new Map();

    name.forEach((el, i) => {
        member.set(el, yearning[i]);
    })

    const result = photo.map(el => el.reduce((score, mem) => score + (member.get(mem) || 0), 0));

    return result;
}