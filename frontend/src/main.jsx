import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import './index.css'
import './styles/variables.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify'
import awsConfig from './aws-config'

// Configure Amplify
Amplify.configure({
  ...awsConfig,
  Auth: {
    ...awsConfig.Auth,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
