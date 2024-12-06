function solution(fees, records) {
    const [defaultTime, basicFee, unitTime, unitPrice] = fees;
    const carRecords = {}; // 차량별 기록

    records.forEach(record => {
        const [time, carNum, status] = record.split(' '); // 시간, 차 번호, 상태
        const minutes = Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
        // { 차 번호 : { 누적 시간, 입차 시간, 출차 여부 } }
        if (!carRecords[carNum]) carRecords[carNum] = { totalTime: 0, lastInTime: 0, exited: false };

        if (status === 'IN') {
            carRecords[carNum].lastInTime = minutes; // 입차 시간 기록
            carRecords[carNum].exited = false;
        } else if (status === 'OUT') {
            carRecords[carNum].totalTime += minutes - carRecords[carNum].lastInTime;  // 출차 시 누적 시간 계산
            carRecords[carNum].lastInTime = 0;  // 출차 후에는 lastInTime 초기화
            carRecords[carNum].exited = true;
        }
    });

    // 출차하지 않았을 경우
    Object.keys(carRecords).forEach(carNum => {
        if (!carRecords[carNum].exited) {
            carRecords[carNum].totalTime += (1439 - carRecords[carNum].lastInTime);  // 23:59 출차
        }
    });

    console.log(carRecords);

    // 차량 번호 오름차순으로 정렬 후 결과 계산
    return Object.keys(carRecords).sort().map(carNum => {
        const totalTime = carRecords[carNum].totalTime;
        const overTime = totalTime - defaultTime;

        if (overTime <= 0) return basicFee; // 기본 요금
        return basicFee + Math.ceil(overTime / unitTime) * unitPrice; // 추가 요금 계산
    });
}