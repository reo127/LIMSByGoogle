
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
import PatientDashboard from '@/components/PatientDashboard';
import { Settings } from '@/components/Settings';
import { Approve } from '@/components/Approve';
import { Payments } from '@/components/Payments';

export default function IndexPage() {
  return (
    <>
      <Sidebar>
        <SidebarTrigger />
        <SidebarHeader>
          <Icons.logo className="h-6 w-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/" >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/patient-dashboard">
                  <Icons.user className="mr-2 h-4 w-4" />
                  <span>Patient Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/settings">
                  <Icons.settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/approve">
                  <Icons.shield className="mr-2 h-4 w-4" />
                  <span>Approve</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/payments">
                  <Icons.share className="mr-2 h-4 w-4" />
                  <span>Payments</span>
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

      <div className="pl-64">
        <PatientDashboard />
      </div>
    </>
  );
}

