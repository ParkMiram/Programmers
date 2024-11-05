function solution(a, b, n) {
    let cola = n;
    let total = 0;

    while (cola / a >= 1) {
        const getCola = Math.trunc(cola / a) * b;
        total += getCola;
        cola = cola % a !== 0 ? (getCola) + (cola % a) : getCola;
    }

    return total;
}