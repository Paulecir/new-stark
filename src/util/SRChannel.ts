// Importar funções e bibliotecas necessárias

import { calculateSRLevels, EMA, pivotHigh, pivotLow, SMA, sortSRChannels } from "@/util/indicator";
import { highest, lowest } from "technicalindicators";

// const { SMA, EMA, pivotHigh, pivotLow, highest, lowest, calculateStrength, plotShape, plotLine } = require('./indicators');
// const { createArray, getPivotLevels, updateSRChannels, sortSRChannels, calculateSRLevels } = require('./helpers');

// Configurações
const settings = {
    pivotPeriod: 10,
    pivotSource: 'High/Low',
    channelWidth: 5, // Percentual
    minimumStrength: 1,
    maxSR: 6,
    loopbackPeriod: 290,
    colors: {
        resistance: 'rgba(255,0,0,0.75)',
        support: 'rgba(0,255,0,0.75)',
        inChannel: 'rgba(128,128,128,0.75)'
    },
    showPivotPoints: false,
    showBrokenSR: false,
    maSettings: {
        ma1: { enabled: false, length: 50, type: 'SMA' },
        ma2: { enabled: false, length: 200, type: 'SMA' }
    }
};

const plotLine = (...params) => {

}

const plotShape = (...params) => {

}

const data: any = []



export const SRChannel = ({ current }: any) => {

    data.push(current)

    const barIndex = data.length - 1
    if (data.length > 10000) {
        data.shift();
    }

    const { close, high, low, open } = current;

    // Variáveis de estado
    let pivotValues = [];
    let pivotLocations = [];
    let supportResistance = Array(20).fill(0);

    // Calculando as médias móveis
    const ma1 = settings.maSettings.ma1.enabled
        ? (settings.maSettings.ma1.type === 'SMA'
            ? SMA(close, settings.maSettings.ma1.length)
            : EMA(close, settings.maSettings.ma1.length))
        : null;

    const ma2 = settings.maSettings.ma2.enabled
        ? (settings.maSettings.ma2.type === 'SMA'
            ? SMA(close, settings.maSettings.ma2.length)
            : EMA(close, settings.maSettings.ma2.length))
        : null;

    // Exibir médias móveis
    if (ma1) plotLine(ma1, 'blue');
    if (ma2) plotLine(ma2, 'red');

    // Obter pivôs de alta e baixa
    const pivotSource1 = settings.pivotSource === 'High/Low' ? high : Math.max(close, open);
    const pivotSource2 = settings.pivotSource === 'High/Low' ? low : Math.min(close, open);

    let pivotHighValue: any = pivotHigh(settings.pivotPeriod, data.map(m => m.high));
    pivotHighValue = pivotHighValue.findIndex(f => f !== null)
    // const pivotHighValue = pivotHigh(pivotSource1, settings.pivotPeriod);
    let pivotLowValue: any = pivotLow(settings.pivotPeriod, data.map(m => m.low));
    pivotLowValue = pivotLowValue.findIndex(f => f !== null) || 0
    // const pivotLowValue = pivotLow(pivotSource2, settings.pivotPeriod);

    // Exibir pivôs, se necessário
    // if (settings.showPivotPoints) {
    //     plotShape(pivotHighValue, { text: 'H', style: 'labeldown', color: 'red' });
    //     plotShape(pivotLowValue, { text: 'L', style: 'labelup', color: 'lime' });
    // }

    // Cálculo da largura máxima do canal S/R
    let highestValue: any = highest({ values: data.map(m => m.high), period: data.length });
    highestValue = highestValue[0]
    let lowestValue: any = lowest({ values: data.map(m => m.low), period: data.length });
    lowestValue = lowestValue[0]
    const channelWidth = (parseFloat(highestValue) - parseFloat(lowestValue)) * settings.channelWidth / 100;

    // Armazenar os pivôs
    if (barIndex > 10 && (pivotHighValue > 0 || pivotLowValue > 0)) {

        if (pivotHighValue > 0) pivotValues.unshift(pivotHighValue);
        else if (pivotLowValue > 0) pivotValues.unshift(pivotLowValue);

        pivotLocations.unshift(barIndex);

        pivotValues = pivotValues.filter((_, i) => barIndex - pivotLocations[i] <= settings.loopbackPeriod);
        pivotLocations = pivotLocations.filter(loc => barIndex - loc <= settings.loopbackPeriod);
    }

    // Atualizar canais de suporte e resistência

    console.log("V", pivotValues)
    if (pivotHighValue || pivotLowValue) {
        const srlevels = calculateSRLevels(
            pivotValues, channelWidth, settings.minimumStrength, settings.loopbackPeriod, data.map(m => m.high), data.map(m => m.low)
        );

        supportResistance = sortSRChannels(srlevels, settings.maxSR);
    }

    // Exibir canais de suporte e resistência
    if (supportResistance) console.log("supportResistance", supportResistance);
    try {
        (supportResistance || []).forEach(([high, low], index) => {
            const color = (close >= low && close <= high)
                ? settings.colors.inChannel
                : (close > high ? settings.colors.resistance : settings.colors.support);

            plotLine([low, high], color);
        });
    } catch (err) {
        console.log("E", err)
    }


}