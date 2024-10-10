function second(time) {
    const [mm, ss] = time.split(':');
    return mm * 60 + Number(ss);
}

function solution(video_len, pos, op_start, op_end, commands) {
    const videoLen = second(video_len);
    let position = second(pos);
    const opStart = second(op_start);
    const opEnd = second(op_end);

    // 실행 전 오프닝 검증
    if (opStart <= position && position <= opEnd) position = opEnd;

    // commands
    commands.forEach((command) => {
        // next, prev
        position += command === "next" ? 10 : -10;
        // 시작 & 끝
        position = Math.max(0, Math.min(position, videoLen));
        // 실행 후 오프닝 검증
        if (opStart <= position && position <= opEnd) position = opEnd;
    });

    const mm = Math.floor(position / 60).toString().padStart(2, "0");
    const ss = (position - (60 * mm)).toString().padStart(2, "0");

    return mm + ":" + ss;
}