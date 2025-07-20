import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CryptoAsset, CryptoData } from "../components/types";
import { fakeAssets, fakeFetchCrypto } from "../Api";
import { percentDifference } from "../utils";

interface EnhancedAsset extends CryptoAsset {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
}

interface CryptoContextType {
  assets: EnhancedAsset[];
  crypto: CryptoData | null;
  loading: boolean;
  addAsset: (newAsset: CryptoAsset) => void;
}

export const CryptoContext = createContext<CryptoContextType>({
  assets: [],
  crypto: null,
  loading: false,
  addAsset: () => {}
});

interface CryptoContextProviderProps {
  children: ReactNode;
}

export function CryptoContextProvider({ children }: CryptoContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [assets, setAssets] = useState<EnhancedAsset[]>([]);
  
  function mapAssets(assetsData: CryptoAsset[], cryptoObject: CryptoData) {
    return assetsData.map(asset => {
      const coin = cryptoObject.result.find(c => c.id === asset.id);
      if (!coin) {
        return {
          ...asset,
          grow: false,
          growPercent: 0,
          totalAmount: 0,
          totalProfit: 0
        };
      }
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const cryptoObject = await fakeFetchCrypto() as CryptoData;
      const assetsData = await fakeAssets() as CryptoAsset[];
      
      setAssets(mapAssets(assetsData, cryptoObject));
      setCrypto(cryptoObject);
      setLoading(false);
    }
    preload();
  }, []);  
    
  function addAsset(newAsset: CryptoAsset) {
    if (!crypto) return;
    
    const enhancedAsset = mapAssets([newAsset], crypto)[0];
    setAssets(prev => [...prev, enhancedAsset]);
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}