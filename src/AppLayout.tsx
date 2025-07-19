import { Layout, Spin } from "antd";
import { useContext, type FC } from "react";
import { AppSider } from "./components/AppSider";
import { AppHeader } from "./components/AppHeader";
import { AppContent } from "./components/AppContent";
import { CryptoContext } from "./context/crypto-context";
import {LoadingOutlined  } from '@ant-design/icons';

export const AppLayout:FC = () => {

    const {loading} = useContext(CryptoContext)
    
    if(loading){
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 170 }} spin />}  fullscreen/>
    }

    return (
    <Layout>
      <AppSider />
      <Layout>
        <AppHeader />
        <AppContent />
      </Layout>
    </Layout>
    )
}