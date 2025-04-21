// File: components/Sidebar/AppSidebar.tsx
'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Home } from 'lucide-react';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'home' | 'patient-dashboard' | 'settings' | 'approve' | 'payments') => void;
}

export default function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarTrigger />
      <SidebarHeader>
        <Icons.logo className="h-6 w-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" onClick={() => setActiveTab('home')}>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/patient-dashboard" onClick={() => setActiveTab('patient-dashboard')}>
                <Icons.user className="mr-2 h-4 w-4" />
                <span>Patient Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings" onClick={() => setActiveTab('settings')}>
                <Icons.settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/approve" onClick={() => setActiveTab('approve')}>
                <Icons.shield className="mr-2 h-4 w-4" />
                <span>Approve</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/payments" onClick={() => setActiveTab('payments')}>
                <Icons.share className="mr-2 h-4 w-4" />
                <span>Payments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/editpatient" onClick={() => setActiveTab('editpatient')}>
                <Icons.edit className="mr-2 h-4 w-4" />
                <span>Edit Patient</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-center text-xs">
          &copy; {new Date().getFullYear()} LabWise. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

// File: components/Sidebar/index.ts
export { default as AppSidebar } from './AppSidebar';