import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../AppSidebar';
import { ThemeProvider } from '../ThemeProvider';

export default function AppSidebarExample() {
  //todo: remove mock functionality
  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu"
  };

  const handleLogout = () => {
    console.log('Logout triggered');
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <ThemeProvider>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar user={mockUser} onLogout={handleLogout} />
          <div className="flex-1 p-6 bg-background">
            <h3 className="text-lg font-semibold">Main Content Area</h3>
            <p className="text-muted-foreground">This is where the main application content would be displayed.</p>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}