import { Button } from '../ui/Button';
import { RealtimeNotifications } from '../features/RealtimeNotifications';

interface HeaderProps {
  showNotifications?: boolean;
}

export function Header({ showNotifications = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Dashboard
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {showNotifications && (
            <RealtimeNotifications />
          )}
        </div>
      </div>
    </header>
  );
}