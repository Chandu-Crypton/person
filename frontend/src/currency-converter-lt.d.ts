// src/types/currency-converter-lt.d.ts
declare module 'currency-converter-lt' {
    class CurrencyConverter {
      constructor();
      convert(
        amount: number,
        fromCurrency: string,
        toCurrency: string
      ): Promise<number>;
    }
  
    export default CurrencyConverter;
  }
  