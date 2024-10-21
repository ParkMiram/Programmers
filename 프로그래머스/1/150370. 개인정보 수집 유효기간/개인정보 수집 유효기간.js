function solution(today, terms, privacies) {
    // today
    const todayFormat = today.split('.').join('');
    // term
    const termMap = Object.fromEntries(terms.map(term => term.split(' ')));

    return privacies.reduce((acc, item, index) => {
        const [expDate, expType] = item.split(' ');
        const [yy, mm, dd] = expDate.split('.').map(Number);
        const expiryMonths = Number(termMap[expType]);

        // 만료 날짜 계산
        let targetMm = mm + expiryMonths;
        let targetYy = yy + Math.floor((targetMm - 1) / 12);
        targetMm = ((targetMm - 1) % 12) + 1;

        const targetFormat = `${targetYy.toString().padStart(4, '0')}${targetMm.toString().padStart(2, '0')}${dd.toString().padStart(2, '0')}`;
        // 비교
        if (todayFormat >= targetFormat) acc.push(index + 1);
        return acc;
    }, []);
}