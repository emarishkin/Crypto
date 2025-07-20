import { Button, DatePicker, Divider, Flex, Form, InputNumber, Result, Select, Space, Typography } from "antd";
import { useRef, useState, type FC } from "react";
import { useCrypto } from "../context/crypto-context";

type FieldType = {
  amount: number;
  price: number;
  total:number
  date:any
};

interface AddAssetFormProps{
  onClose:()=>void
}


export const AddAssetForm:FC<AddAssetFormProps> = ({onClose}) => {
    
    const [form] = Form.useForm()
    const {crypto,addAsset} = useCrypto()
    const [coin,setCoin] = useState<any>(null)
    const [submit,setSubmit] = useState<boolean>(false)
    const assetRef = useRef<any>(null)

    if(submit){
      return (
        <Result
        status="success"
        title="New asset added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={()=>{
            setSubmit(false)
            onClose()
          }}>
            Close
          </Button>,
          
        ]}
      />
      )
    }

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

    const onFinish = (values:any) => {
      const newAsset = {
        id:coin.id,
        amount:values.amount,
        price:values.price,
        date:values.date?.$d ?? new Date()
      }
      assetRef.current = newAsset
      setSubmit(true)
      addAsset(newAsset)
    }

    const handleAmountChange = (value:number | null) => {
      if (value !== null) {
        const price = form.getFieldValue('price') 
      form.setFieldsValue({
        total: (value * price).toFixed(2)
      });
    }
    }

    const handlePriceChange = (value:number | null) => {
      if (value !== null) {
      const amount = form.getFieldValue('amount') 
      form.setFieldsValue({
        total: (amount * value).toFixed(2)
      });
    }
    }

    return(
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            price:coin.price.toFixed(2)
          }}
          onFinish={onFinish}
        >
            <Flex>
              <img style={{width:40,marginRight:10}} src={coin.icon} alt={coin.name}/>
              <Typography.Title style={{margin:0}} level={2}>({coin.symbol}) {coin.name}</Typography.Title>
            </Flex>
            <Divider />
            
              <Form.Item<FieldType>
               
                label="Amount"
                name="amount"
                rules={[{
                   required: true,
                   type:'number',
                   min:0,
                   message: 'Please input your username!' }]}
              >
                <InputNumber onChange={handleAmountChange} placeholder="Введите количество монет" style={{width:'100%'}} />
              </Form.Item>

              <Form.Item<FieldType>
                label="Price"
                name="price"
              >
                <InputNumber onChange={handlePriceChange} style={{width:'100%'}} />
              </Form.Item>

              <Form.Item<FieldType>
                label="Date & Time"
                name="date"
              >
                <DatePicker showTime />
              </Form.Item>
              
              <Form.Item<FieldType>
                label="Total"
                name="total"
              >
                <InputNumber disabled style={{width:'100%'}} />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Add asset
                </Button>
              </Form.Item>
          </Form>   
    )
}