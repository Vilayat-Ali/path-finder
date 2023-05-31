export const formatNumber = (number: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat('en', {
        notation: 'compact'
    });

    return formatter.format(number);
} 

export const formatCurrency = (amount: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
    });
    
    return formatter.format(amount);
}