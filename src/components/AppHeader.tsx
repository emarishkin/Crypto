import { useEffect, useState, type FC } from "react";
import { Layout, Select, Space, Button,Modal, Drawer } from 'antd';

import { useCrypto } from "../context/crypto-context";
import { CoinInfoModal } from "./CoinInfoModal";
import { AddAssetForm } from "./AddAssetForm";


const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#04437eff'
};



export const AppHeader: FC = () => {
    
    const [select,setSelect] = useState<boolean>(false)
    const [modal,setModal] = useState<boolean>(false)
    const [coin,setCoin] = useState<any>(null)
    const [drawer,setDrawer] = useState<boolean>(false)
    const {crypto} = useCrypto()
    
    useEffect(()=>{
       const keypress = (e:any) => {
        if(e.keypress === '/'){
          setSelect(prev => !prev)
        }
       }
       document.addEventListener('keypress',keypress)
       return () => document.removeEventListener('keypress',keypress)
    },[])

    const handleSelect = (value:string) => {
      setCoin(crypto?.result.find(c => c.id === value))
      setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
          <Select
            style={{ width: '15%' }}
            value='press / to open'
            options={crypto?.result.map(coin=>(
              {
                label:coin.name,
                value:coin.id,
                icon:coin.icon
              }
            ))}
            open={select}
            onClick={()=>setSelect(prev => !prev)}
            onSelect={handleSelect}
            optionRender={(option) => (
              <Space>
                <img style={{width:20}} src={option.data.icon} alt={option.data.label}/> {option.data.label} 
              </Space>
            )}
          />
          <Button onClick={()=>setDrawer(true)} type="primary">Add Asset</Button>


          <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={modal}
            onCancel={()=>setModal(false)}
            footer={null}
          >
            <CoinInfoModal coin={coin} />
          </Modal>    
          

          <Drawer
            
          width={400}
            title="Add asset"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={()=>setDrawer(false)}
            open={drawer}
            destroyOnHidden
            
          >
            <AddAssetForm onClose={()=>setDrawer(false)}/>
          </Drawer>

        </Layout.Header>
    )
}