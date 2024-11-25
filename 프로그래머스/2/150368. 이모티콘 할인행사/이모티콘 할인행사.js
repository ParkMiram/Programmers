function solution(users, emoticons) {
    const saleRates = [40, 30, 20, 10];
    let maxJoin = 0; // 최대 플러스 서비스 가입자 수
    let maxRevenue = 0; // 최대 판매액

    // 할인율 조합
    function getSaleCombinations(index = 0, currentCombination = []) {
        // 모든 이모티콘에 대해 할인율 조합을 완료한 경우
        if (index === emoticons.length) {
            let [joinCount, revenue] = calculateResults(currentCombination);
            
            if (joinCount > maxJoin || (joinCount === maxJoin && revenue > maxRevenue)) {
                maxJoin = joinCount;
                maxRevenue = revenue;
            }
            return;
        }

        // 각 할인율에 대해 재귀 호출
        for (let i = 0; i < saleRates.length; i++) {
            // 할인율을 하나씩 선택
            getSaleCombinations(index + 1, [...currentCombination, saleRates[i]]);
        }
    }

    // 이모티콘을 구입한 사용자들을 계산하는 함수
    function calculateResults(discounts) {
        let joinCount = 0; // 플러스 서비스 가입자 수
        let totalRevenue = 0; // 총 판매액

        users.forEach(([minDiscount, minPrice]) => {
            let totalPrice = 0; // 구매한 이모티콘 총액

            emoticons.forEach((price, idx) => {
                if (discounts[idx] >= minDiscount) {
                    totalPrice += price - (price * discounts[idx] / 100);
                }
            });

            if (totalPrice >= minPrice) joinCount++; // 플러스 서비스 가입
            else totalRevenue += totalPrice; // 이모티콘 구매 총액
        });

        return [joinCount, totalRevenue];
    }

    // 탐색
    getSaleCombinations();

    return [maxJoin, maxRevenue];
}