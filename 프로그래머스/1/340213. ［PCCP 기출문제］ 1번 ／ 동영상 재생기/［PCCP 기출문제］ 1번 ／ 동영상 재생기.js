function solution(video_len, pos, op_start, op_end, commands) {
    let pos_mm = parseInt(pos.split(":")[0]);
    let pos_ss = parseInt(pos.split(":")[1]);

    // (이동 전) 오프닝 구간일 경우
    const op_start_time = parseInt(op_start.split(":")[0] + op_start.split(":")[1]);
    const op_end_time = parseInt(op_end.split(":")[0] + op_end.split(":")[1]);
    const pos_time = parseInt(pos.split(":")[0] + pos.split(":")[1]);

    if (op_start_time <= pos_time && pos_time <= op_end_time) {
        pos_mm = parseInt(op_end.split(":")[0]);
        pos_ss = parseInt(op_end.split(":")[1]);
    }

    // commands 실행
    for (let i = 0; i < commands.length; i++) {
        const pos_next = pos_ss + 10;
        const pos_prev = pos_ss - 10;

        switch (commands[i]) {
            case "next":
                // 60초 이상일 경우
                if (pos_next >= 60) {
                    if (pos_next === 60) pos_ss = 0;
                    else pos_ss = pos_next - 60;
                    pos_mm++;
                }
                else pos_ss = pos_next;

                // 끝과 10초 미만의 차이일 경우
                const video_len_mm = parseInt(video_len.split(":")[0]);
                const video_len_ss = parseInt(video_len.split(":")[1]);
                if (pos_mm === video_len_mm && video_len_ss - pos_ss < 10) {
                    pos_ss = video_len_ss;
                }

                break;
            case "prev":
                // 00:10 미만일 경우
                if (pos_mm === 0 && pos_ss < 10) pos_ss = 0;
                else {
                    // 0보다 작을 경우
                    if (pos_prev < 0) {
                        pos_ss = 60 - (10 - pos_ss);
                        pos_mm--;
                    }
                    else pos_ss = pos_prev;
                }

                break;
        }

        // (이동 후) 오프닝 구간일 경우
        const op_start_mm = parseInt(op_start.split(":")[0]);
        const op_start_ss = parseInt(op_start.split(":")[1]);
        const op_end_mm = parseInt(op_end.split(":")[0]);
        const op_end_ss = parseInt(op_end.split(":")[1]);

        if (op_start_mm <= pos_mm && op_start_ss <= pos_ss) {
            if (op_end_mm >= pos_mm && op_end_ss >= pos_ss) {
                pos_mm = op_end_mm;
                pos_ss = op_end_ss;
            }
        }
    }

    // 10 미만일 경우 앞에 0 붙이기
    if (pos_mm < 10) pos_mm = "0" + pos_mm.toString();
    if (pos_ss < 10) pos_ss = "0" + pos_ss.toString();

    return pos_mm.toString() + ":" + pos_ss.toString();
}