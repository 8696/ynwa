import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DBProvider } from './context/DBContext'
import App from './App'
import './index.css'

/** 应用入口：挂载 React 根节点，依次注入 BrowserRouter（路由）、DBProvider（全局数据） */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DBProvider>
        <App />
      </DBProvider>
    </BrowserRouter>
  </StrictMode>,
)
