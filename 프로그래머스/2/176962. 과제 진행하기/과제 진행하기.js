function solution(plans) {
    const subjects = {}; // 과목 리스트
    let onHoldSubject = []; // 중단된 과목
    let completedSubject = []; // 완료된 과목

    // 과목 정보
    plans.forEach(([subject, start, playtime]) => {
        const minutes = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
        // { 과목명 : { 시작 시간, 소요 시간 } }
        subjects[subject] = { start: minutes, playtime: Number(playtime) };
    });

    // start 값을 기준으로 오름차순 정렬
    const sortedSubjects = Object.keys(subjects)
        .sort((a, b) => subjects[a].start - subjects[b].start)
        .map(subject => ({
            subject,
            start: subjects[subject].start,
            playtime: subjects[subject].playtime
        }));

    // 현재 시간
    let finishedTime = sortedSubjects[0].start;

    // 과목을 완료하는 함수
    const complete = (subject) => {
        completedSubject.push(sortedSubjects[subject].subject);
        finishedTime += sortedSubjects[subject].playtime;
    }

    // 과목을 중단하는 함수
    const stop = (subject, nextSubject) => {
        const remainingTime = sortedSubjects[nextSubject].start - finishedTime;
        sortedSubjects[subject].playtime -= remainingTime;
        finishedTime += remainingTime;
        onHoldSubject.push(sortedSubjects[subject]);
    }

    // 과목 진행하는 함수
    const taskInProgress = (subject) => {
        if (subject === plans.length - 1
            || sortedSubjects[subject].start + sortedSubjects[subject].playtime <= sortedSubjects[subject+1].start) {
            complete(subject);
        } else {
            stop(subject, subject+1);
        }
    }

    // 과제 하나씩 처리
    for (let i = 0; i < sortedSubjects.length; i++) {
        // 현재 시간이 다음 과목 시작 시간보다 적을 경우
        if (finishedTime < sortedSubjects[i].start) {
            if (onHoldSubject.length > 0) {
                // 중단된 과목이 있을 경우
                const restartSubject = onHoldSubject.pop(); // 최근에 중단된 과목
                const subjectIdx = sortedSubjects.indexOf(restartSubject); // 과목의 index
                if (finishedTime + restartSubject.playtime <= sortedSubjects[i].start) {
                    complete(subjectIdx);
                } else {
                    stop(subjectIdx, i);
                }
            }
            // 중단된 과목이 없을 경우
            else finishedTime = sortedSubjects[i].start;
            i--;
        }
        // 현재 시간이 다음 과목 시작 시간과 같을 경우
        else taskInProgress(i);
    }

    // 남은 과목 진행
    while (onHoldSubject.length > 0) {
        completedSubject.push(onHoldSubject.pop().subject);
    }

    return completedSubject;
}