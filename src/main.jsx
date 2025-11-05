import {createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import UserStore from './store/UserStore.js'

export const Context = createContext(null);

const queryClient  = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Context.Provider value={{
      user: new UserStore(),
    }}>
      <StrictMode>
          <App />
        </StrictMode>
    </Context.Provider>
  </QueryClientProvider>,
)
