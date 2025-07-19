import { type FC } from 'react';
import { CryptoContextProvider } from './context/crypto-context';
import { AppLayout } from './AppLayout';


const App:FC = () => {

  return (
    <>
    <CryptoContextProvider>
    <AppLayout/>
    </CryptoContextProvider>
    </>
  )
}

export default App
