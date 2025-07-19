import { type FC } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppSider } from './components/AppSider';
import {Layout} from 'antd';
import { AppContent } from './components/AppContent';


const App:FC = () => {

  return (
    <>
    <Layout>
      <AppSider />
      <Layout>
        <AppHeader />
        <AppContent />
      </Layout>
    </Layout>
    </>
  )
}

export default App
