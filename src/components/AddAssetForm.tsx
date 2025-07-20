import { Select, Space, Typography } from "antd";
import { useState, type FC } from "react";
import { useCrypto } from "../context/crypto-context";

export const AddAssetForm:FC = () => {
    
    const {crypto} = useCrypto()
    const [coin,setCoin] = useState<any>(null)

    if(!coin){
        return (
            <Select
            style={{ width: '65%' }}
            placeholder='Выбери монету'
            options={crypto?.result.map(coin=>(
              {
                label:coin.name,
                value:coin.id,
                icon:coin.icon
              }
            ))}
            onSelect={(v)=>setCoin(crypto?.result.find(c=>c.id === v))}
            optionRender={(option) => (
              <Space>
                <img style={{width:20}} src={option.data.icon} alt={option.data.label}/> {option.data.label} 
              </Space>
            )}
          />
        )
    }

    return(
        <form>
            <Typography.Title level={2} style={{margin:0}}>{coin.name}</Typography.Title>
        </form>
    )
}