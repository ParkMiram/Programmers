function solution(bandage, health, attacks) {
    const [tryTime, second, amount] = [bandage[0], bandage[1], bandage[2]]; // [시전 시간, 초당 회복량, 추가 회복량]
    let sccCount = 0; // 시전 성공 카운트
    let stamina = health; // 현재 체력

    let [attackTime, attackDmg] = [[], []]; // [공격 시간, 피해량]
    for (const attack of attacks) {
        attackTime.push(attack[0]);
        attackDmg.push(attack[1]);
    }
    let attackCount = 0; // 공격 순서

    for (let i = 1; i <= attacks[attacks.length - 1][0]; i++) {
        if (i !== attackTime[attackCount]) {
            sccCount++;
            stamina += second;
            // 시전 시간 성공 시 회복
            if (sccCount === tryTime) {
                stamina += amount;
                sccCount = 0;
            }
        } else {
            sccCount = 0;
            stamina -= attackDmg[attackCount];
            attackCount++;
            if (stamina <= 0) {
                return -1;
            }
        }
        // 현재 체력 === 최대 체력
        if (stamina >= health) stamina = health;
    }
    return stamina;
}