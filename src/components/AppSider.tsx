import { useEffect, useState, type FC } from "react";
import { ArrowDownOutlined, ArrowUpOutlined,LoadingOutlined  } from '@ant-design/icons';
import { Layout,Card, Statistic,List ,Spin,Typography ,Tag } from 'antd'
import { fakeAssets, fakeFetchCrypto } from "../Api";
import type { CryptoAsset, CryptoData } from "./types";
import { percentDifference } from "../utils";
import { capotalaze } from "../utils";

const siderStyle: React.CSSProperties = {
  padding:'1rem'
};



interface EnhancedAsset extends CryptoAsset {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
}


export const AppSider:FC = () => {

    const [loading,setLoading] = useState<boolean>(false)
    const [crypto,setCrypto] = useState<CryptoData | null>(null)
    const [assets,setAssets] = useState<EnhancedAsset[]>([])

    useEffect(()=>{
      async function preload(){
        setLoading(true)
          const cryptoObject = await fakeFetchCrypto() as CryptoData
          const assets = await fakeAssets() as CryptoAsset[]

          setAssets(assets.map(asset=>{
            const coin = cryptoObject.result.find(c => c.id === asset.id)
            if(!coin){
                return{
                    ...asset,
                    grow: false,
                    growPercent: 0,
                    totalAmount: 0,
                    totalProfit: 0
                }
            }
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price,coin.price),
                totalAmount:asset.amount * coin.price,
                totalProfit:asset.amount * coin.price - asset.amount * asset.price,
                ...asset
            }
          }))
          setCrypto(cryptoObject)
          setLoading(false)
      }
      preload()
    },[])   

    if(loading){
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 170 }} spin />}  fullscreen/>
    }
 
    return (
        <Layout.Sider width="25%" style={siderStyle}>
         {assets.map(asset=>(
            <Card key={asset.id} style={{marginBottom:'1rem'}}>
          <Statistic
          title={capotalaze(asset.id)}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{ color: asset.grow ? '#3f8600' : 'red'}}
          prefix={asset.grow?<ArrowUpOutlined />:<ArrowDownOutlined />}
          suffix="$"
        />

        <List
            size="small"
            dataSource={[
                {title:'Total profit',value:asset.totalProfit,withTag:true},
                {title:'Asset Amound',value:asset.amount,isPlain:true},
                // {title:'Difference',value:asset.growPercent}
            ]}
            renderItem={(item) => (
                <List.Item>
                    <span>{item.title}</span>
                    <span>
                        {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                    {item.isPlain && item.value}
                    {!item.isPlain && <Typography.Text type={asset.grow?'success':'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                    </span>
                </List.Item>
            )}
        />

       </Card>
         ))}
      </Layout.Sider>
    )
}