function solution(book_time) {
    const rooms = []; // 방 배열

    // 예약 시간들을 분으로 변환하여 재정렬
    book_time
        .map(([checkIn, checkOut]) => [
            Number(checkIn.split(':')[0]) * 60 + Number(checkIn.split(':')[1]),
            Number(checkOut.split(':')[0]) * 60 + Number(checkOut.split(':')[1])
        ])
        .sort((a, b) => a[0] - b[0]) // checkInTime 기준 오름차순 정렬
        .forEach(([checkInTime, checkOutTime]) => {
            // 기존 방에서 처리할 수 있는지 확인
            const availableRoomIndex = rooms.findIndex(room => room <= checkInTime);

            if (availableRoomIndex !== -1) {
                rooms[availableRoomIndex] = checkOutTime + 10; // 방 갱신 (청소 시간 포함)
            } else {
                rooms.push(checkOutTime + 10); // 새 방 추가 (청소 시간 포함)
            }
        });

    return rooms.length; // 사용된 방의 개수 반환
}