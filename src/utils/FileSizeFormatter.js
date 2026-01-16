const fileSizeFormatter = (bytes, decimals = 2) => {
  
    if (!bytes || bytes === 0) return "O Byte";
    if (bytes === 1) return "1 Byte";

    const n = 1024;
    const decimalDigits = decimals > 0 ? decimals : 0;
    const unitTexts = ["Bytes", "KB", "MB"];

    const sizeUnit = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(n, sizeUnit)).toFixed(decimalDigits)) + ' ' + unitTexts[sizeUnit];

}

export { fileSizeFormatter }