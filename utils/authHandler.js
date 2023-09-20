const CryptoJS = require('crypto-js')

const secretKey = process.env.SECRET_KEY
const encryptData = (data) => {
  console.log("i am in the encrypt funct");
    try {
      console.log("i got into the encryption part");
      console.log(JSON.stringify(data))
      const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
      return encryptedData;
    } catch (error) {
      console.log("error has occured in the try area");
      console.log(error)
    }
}

module.exports = {
    encryptData
}