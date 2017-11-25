module.exports = function Jacobi(matrixA, vectorB) {
    let tempX = [];

    let norma = 1; // норма, определяемая как наибольшая разность компонент столбца иксов соседних итераций.

    const eps = 0.001; // заданная точность
    
    const vectorX = initVectorX(vectorB.length); // Начальное приближение всегда равно 1

    while (norma > eps) {
        for (let i = 0; i < vectorB.length; i++) {
            tempX[i] = vectorB[i];
            for (let j = 0; j < vectorB.length; j++) {
                if (i != j) {
                    tempX[i] -= matrixA[i][j] * vectorX[j];
                }
            }
            tempX[i] /= matrixA[i][i]
        }
        norma = Math.abs(vectorX[0] - tempX[0]);
        for (let i = 0; i < vectorB.length; i++) {
            let res = Math.abs(vectorX[i] - tempX[i]);
            if (res > norma) {
                norma = res;
            }
            vectorX[i] = parseFloat((tempX[i]).toFixed(4));
        }
    }
    return vectorX;
}

function initVectorX(length) {
    const vectorX = [];
    for (let i = 0; i < length; i++) {
        vectorX.push(1);
    }
    return vectorX;
}