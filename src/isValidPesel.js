const isValidPesel = (pesel) => {
    if (!pesel) return false;
    pesel = pesel.toString();
    if (typeof pesel !== "string") return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
        sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
};

export {
    isValidPesel
}
