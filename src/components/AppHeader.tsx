import type { FC } from "react";
import { Layout, Select, Space, Button } from 'antd';

import { useCrypto } from "../context/crypto-context";


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

    const {crypto} = useCrypto()

    return (
        <Layout.Header style={headerStyle}>
          <Select
            mode="multiple"
            style={{ width: '25%' }}
            value='press/to open'
            options={crypto?.result.map(coin=>(
              {
                label:coin.name,
                value:coin.id,
                icon:coin.icon
              }
            ))}
            optionRender={(option) => (
              <Space>
                <img src={option.data.icon} alt={option.data.label}/> {option.data.label} 
              </Space>
            )}
          />
          <Button type="primary">Add Asset</Button>
        </Layout.Header>
    )
}