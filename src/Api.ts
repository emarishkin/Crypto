import { cryptoAssets, cryptoData } from "./data"


export const fakeFetchCrypto = () => {
   return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(cryptoData)
      },1)
   })
}

export const fakeAssets = () => {
   return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(cryptoAssets)
      },1)
   })
}