function generateWalletAddress() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let walletAddress = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        walletAddress += characters[randomIndex];
    }
    return walletAddress;
}

module.exports = generateWalletAddress;