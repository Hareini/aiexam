import { ThemeProvider, useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        data-testid="button-theme-light"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        data-testid="button-theme-dark"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("system")}
        data-testid="button-theme-system"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-6 bg-background text-foreground">
        <h3 className="text-lg font-semibold mb-4">Theme Switcher</h3>
        <ThemeToggle />
        <div className="mt-4 p-4 bg-card border rounded-lg">
          <p className="text-card-foreground">This content adapts to the selected theme</p>
        </div>
      </div>
    </ThemeProvider>
  );
}