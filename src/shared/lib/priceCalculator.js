const independentExpenses = 410;
const symbolPrice = 100;
const sheetMaterialPricePerSqMeter = 1600;
const ledStripPricePerMeter = 170;
const materialPricePerMeter = 22;
const costOfCuttingAndEngravingPricePerMeter = 42;
const profitability = 1000;

class PriceCalculator {
  calculatePrice(
    widthOfSheetMaterial,
    heightOfSheetMaterial,
    symbolQuantity,
    lengthOfLedStripInMeters
  ) {
    const sheetMaterialPrice =
      widthOfSheetMaterial * heightOfSheetMaterial * sheetMaterialPricePerSqMeter;
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
  }
}

const priceCalculator = new PriceCalculator();

export default priceCalculator.calculatePrice;
