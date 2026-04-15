
import JSEncrypt from "jsencrypt";


const public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCh12p9amFP/VNTy7pW/fH2rQYA
0Ia9ngbj+jAXc/o01XLQsHA9UVYEsRge/dsqTeleClbAmOWR+ZVWc0C5EuEmG+PM
k7DhDRSJ7pMfjZuuB2bu2pNbiPPVPER4BV6NBjeUYKSqwT5XaILh5xME4imBx66L
ObxYPQgk5A7hR7GogwIDAQAB
-----END PUBLIC KEY-----`;



export const encryptData = (data) => {
   const encryptor = new JSEncrypt();
   encryptor.setPublicKey(public_key);
   const encrypted = encryptor.encrypt(JSON.stringify(data));
   return encrypted;
};

