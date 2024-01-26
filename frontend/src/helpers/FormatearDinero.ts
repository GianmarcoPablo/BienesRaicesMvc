function FormatearDinero(amount: number): string {
    // Formatea el número como dinero en dólares
    const formattedAmount: string = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);

    return formattedAmount;
}

export default FormatearDinero;