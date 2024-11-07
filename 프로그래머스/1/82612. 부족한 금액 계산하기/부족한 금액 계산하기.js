function solution(price, money, count) {
    const totalPrice = price * count * (count + 1) / 2;
    return Math.max(0, totalPrice - money);
}