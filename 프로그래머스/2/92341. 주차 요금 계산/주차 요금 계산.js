function solution(fees, records) {
    const [defaultTime, basicFee, unitTime, unitPrice] = fees;

    let result = [];
    let paymentAmount = 0; // 결제 금액

    // 차 리스트
    let carList = [];
    records.forEach(record => {
        if (!carList.includes(record.split(' ')[1])) carList.push(record.split(' ')[1]);
    });

    // IN(홀수)일 때, OUT(짝수)일 때
    carList.sort((a, b) => a - b); // 차량 번호가 작은 자동차부터 정렬
    carList.forEach(car => {
        let sumInTime = 0;
        let sumOutTime = 0;
        let outYn = false; // 출차 여부

        records.forEach(cur => {
            if (car === cur.split(' ')[1]) {
                // IN 시간
                if (cur.split(' ')[2] === "IN") {
                    const inTime = (cur.split(' ')[0].split(':')[0] * 60) + Number(cur.split(' ')[0].split(':')[1]);
                    sumInTime += inTime;
                    outYn = false;
                }
                // OUT 시간
                if (cur.split(' ')[2] === "OUT") {
                    const outTime = (cur.split(' ')[0].split(':')[0] * 60) + Number(cur.split(' ')[0].split(':')[1]);
                    sumOutTime += outTime;
                    outYn = true;
                }
            }
        });

        // 출차를 안 했을 경우
        if (!outYn) sumOutTime += 1439; // 23:59 출차

        // 시간, 돈 계산
        if (sumOutTime - sumInTime > defaultTime) paymentAmount = basicFee + Math.ceil(((sumOutTime - sumInTime) - defaultTime) / unitTime) * unitPrice;
        else paymentAmount = basicFee; // 기본 요금

        // 결과
        result.push(paymentAmount);
    });

    return result;
}