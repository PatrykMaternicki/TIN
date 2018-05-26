var bufferData = createBuffer();
buffer('Data');
buffer(' aequatione ');
buffer('quotcunque');
console.log(buffer());

function createBuffer() {
    return {
        bufferedTextData: ''
    }
}

function buffer(bufferedData = null) {
    if (!bufferedData) return bufferData.bufferedTextData;
    bufferData.bufferedTextData = bufferData.bufferedTextData + bufferedData;
}