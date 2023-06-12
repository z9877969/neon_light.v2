function makePriceCalculator({
  independentExpenses,
  symbolPrice,
  sheetMaterialPricePerMeter,
  ledStripPricePerMeter,
  materialPricePerMeter,
  costOfCuttingAndEngravingPricePerMeter,
  profitability,
}) {
  return function calculatePrice(
    widthOfSheetMaterial,
    heightOfSheetMaterial,
    symbolQuantity,
    lengthOfLedStripInMeters
  ) {
    const sheetMaterialPrice =
      widthOfSheetMaterial * heightOfSheetMaterial * sheetMaterialPricePerMeter;
    const priceForSymbols = symbolPrice * symbolQuantity;
    const ledStripPrice = ledStripPricePerMeter * lengthOfLedStripInMeters;
    const materialPrice = materialPricePerMeter * lengthOfLedStripInMeters;
    const costOfCuttingAndEngravingPrice =
      costOfCuttingAndEngravingPricePerMeter * lengthOfLedStripInMeters;

    const sum =
      sheetMaterialPrice +
      priceForSymbols +
      ledStripPrice +
      materialPrice +
      costOfCuttingAndEngravingPrice +
      independentExpenses +
      profitability;

    return sum;
  };
}

export default makePriceCalculator;

// How it use

// const independentExpenses = 410;
// const symbolPrice = 100;
// const sheetMaterialPricePerMeter = 1600;
// const ledStripPricePerMeter = 170;
// const materialPricePerMeter = 22;
// const costOfCuttingAndEngravingPricePerMeter = 42;
// const profitability = 1000;

// const calculatePrice = makePriceCalculator({
//   independentExpenses,
//   symbolPrice,
//   sheetMaterialPricePerMeter,
//   ledStripPricePerMeter,
//   materialPricePerMeter,
//   costOfCuttingAndEngravingPricePerMeter,
//   profitability,
// });

// const price = calculatePrice(2, 1, 32, 4);

// console.log(price);
