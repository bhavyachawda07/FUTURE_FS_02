import { Search, Bell, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  sidebarCollapsed: boolean;
}

export function Navbar({ sidebarCollapsed }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'New lead from contact form', time: '5 min ago', unread: true },
    { id: 2, text: 'Site visit scheduled for tomorrow', time: '1 hour ago', unread: true },
    { id: 3, text: 'Lead converted to deal', time: '2 hours ago', unread: false },
  ];

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-card border-b border-border z-30 transition-all duration-300 ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads, properties..."
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-border hover:bg-accent cursor-pointer ${
                        notif.unread ? 'bg-accent/50' : ''
                      }`}
                    >
                      <p className="text-sm text-popover-foreground">{notif.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-popover-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@realestate.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-popover-foreground">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-accent flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
