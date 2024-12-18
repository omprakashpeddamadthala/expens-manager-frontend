class CurrencyUtils {
    static formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }
}

export default CurrencyUtils;