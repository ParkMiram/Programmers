function solution(ingredient) {
    let hamburger = 0;
    let stack = [];

    ingredient.forEach(item => {
        stack.push(item);
        if (stack.length >= 4 && stack.slice(-4).join('') === '1231') {
            stack.length -= 4;  // 4개의 재료를 제거하고
            hamburger++;  // 햄버거 하나 완성
        }
    });

    return hamburger;
}