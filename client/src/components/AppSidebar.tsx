import { useLocation } from 'wouter';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import {
  Home,
  BookOpen,
  Brain,
  Users,
  Camera,
  Settings,
  BarChart3,
  Shield,
  Moon,
  Sun,
  LogOut,
  Mic
} from 'lucide-react';

interface AppSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export default function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const mainMenuItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'My Exams',
      url: '/exams',
      icon: BookOpen,
    },
    {
      title: 'AI Tutor',
      url: '/tutor',
      icon: Brain,
    },
    {
      title: 'Study Groups',
      url: '/groups',
      icon: Users,
    },
    {
      title: 'Voice Notes',
      url: '/voice',
      icon: Mic,
    },
    {
      title: 'Proctored Exams',
      url: '/proctored',
      icon: Camera,
    },
  ];

  const adminMenuItems = [
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
    },
    {
      title: 'Moderation',
      url: '/moderation',
      icon: Shield,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ];

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">AI Exam Prep</h2>
            <p className="text-xs text-muted-foreground">Study Smarter</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={location === item.url ? 'bg-sidebar-accent' : ''}
                    data-testid={`sidebar-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={location === item.url ? 'bg-sidebar-accent' : ''}
                    data-testid={`sidebar-${item.title.toLowerCase()}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-3">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            data-testid="button-sidebar-theme-toggle"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" data-testid="text-sidebar-user-name">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate" data-testid="text-sidebar-user-email">
                  {user.email}
                </p>
              </div>
            </div>
            
            {onLogout && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onLogout}
                data-testid="button-sidebar-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}