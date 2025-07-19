import type { FC } from "react";
import {Layout} from 'antd';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
};


export const AppContent:FC = () => {
    return (
        <Layout.Content style={contentStyle}>Content</Layout.Content>
    )
}