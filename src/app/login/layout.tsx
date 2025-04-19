import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
         <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
    </div>
  )
}

export default layout