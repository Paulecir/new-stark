export const SMA = (period, data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= period - 1) {
            const slice = data.slice(i - period + 1, i + 1);
            const sum = slice.reduce((a, b) => a + b, 0);
            result.push(sum / period);
        } else {
            result.push(null); // Insuficientes dados para calcular
        }
    }
    return result;
};

export const EMA = (period, data) => {
    const multiplier = 2 / (period + 1);
    const result = [data[0]]; // Primeiro valor igual ao primeiro dado
    for (let i = 1; i < data.length; i++) {
        const value = (data[i] - result[i - 1]) * multiplier + result[i - 1];
        result.push(value);
    }
    return result;
};

export const pivotHigh = (period, data) => {
    const pivots = [];
    for (let i = data.length; i > data.length - period; i--) {
        const isPivot = data.slice(i - period, i).every(x => x < data[i]) &&
            data.slice(i + 1, i + 1 + period).every(x => x < data[i]);
        pivots.push(isPivot ? data[i] : null);
    }
    return pivots;
};

export const pivotLow = (period, data) => {
    const pivots = [];

    // for (let i = period; i < data.length - period; i++) {
    for (let i = data.length; i > data.length - period; i--) {
        const isPivot = data.slice(i - period, i).every(x => x > data[i]) &&
            data.slice(i + 1, i + 1 + period).every(x => x > data[i]);
        pivots.push(isPivot ? data[i] : null);
    }
    return pivots;
};

export const calculateChannels = (pivots, maxChannelWidth) => {
    const channels = [];
    pivots.forEach((pivot, index) => {
        if (!pivot) return;
        let low = pivot, high = pivot;
        for (let i = index; i < pivots.length; i++) {
            const point = pivots[i];
            if (!point) continue;
            const width = Math.abs(high - low);
            if (width <= maxChannelWidth) {
                low = Math.min(low, point);
                high = Math.max(high, point);
            }
        }
        channels.push({ low, high });
    });
    return channels;
};


export const calculateSRLevels = (pivotVals, channelWidth, minStrength, loopbackBars, highs, lows) => {
    const srLevels = [];

    for (let i = 0; i < pivotVals.length; i++) {
        let lo = pivotVals[i];
        let hi = lo;
        let strength = 0;

        // Verifica outros pivôs para encontrar o canal de suporte/resistência
        for (let j = 0; j < pivotVals.length; j++) {
            const pivot = pivotVals[j];
            const width = pivot <= hi ? hi - pivot : pivot - lo;

            if (width <= channelWidth) {
                if (pivot <= hi) lo = Math.min(lo, pivot);
                if (pivot > hi) hi = Math.max(hi, pivot);
                strength += 20; // Adiciona força ao canal
            }
        }

        // Adiciona força baseada em toques de preço no canal
        for (let j = 0; j < loopbackBars; j++) {
            if (
                (highs[j] <= hi && highs[j] >= lo) ||
                (lows[j] <= hi && lows[j] >= lo)
            ) {
                strength += 1;
            }
        }

        // Apenas adiciona níveis que atingem a força mínima
        if (strength >= minStrength * 20) {
            srLevels.push({ hi, lo, strength });
        }
    }

    return srLevels;
}

export const sortSRChannels = (srLevels, maxNumSR) => {
    // Ordena os níveis por força em ordem decrescente
    srLevels.sort((a, b) => b.strength - a.strength);

    // Retorna os níveis limitados ao número máximo especificado
    return srLevels.slice(0, maxNumSR).map(({ hi, lo }) => ({ hi, lo }));
}
