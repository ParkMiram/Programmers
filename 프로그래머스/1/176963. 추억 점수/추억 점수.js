function solution(name, yearning, photo) {
    const member = new Map();

    for (let i = 0; i < name.length; i++) {
        member.set(name[i], yearning[i]);
    }

    let score = 0;
    const result = [];

    photo.forEach(photo => {
        for (let i = 0; i < photo.length; i++) {
            if (member.get(photo[i]) !== undefined) score += member.get(photo[i]);
            if (i === photo.length - 1) {
                result.push(score);
                score = 0;
            }
        }
    })

    return result;
}