import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { Button } from "components/ui/button";
import useStore from "store/store";
import { Switch } from "components/ui/switch";
import { Label } from "components/ui/label";
import { useTheme } from "context/ThemeProvider";

type Props = {};

const Header = (props: Props) => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const { theme, setTheme } = useTheme();

  const switchThemeHandler = (event: any) => {
    event.preventDefault();
    if (event?.target?.value === "off") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <nav className="flex items-center justify-end p-4 border-b border-b-border fixed top-0 left-0 right-0 bg-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 text-primary">
              <AvatarImage src="/avatars/01.png" alt="username" />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={switchThemeHandler}
            >
              <Label htmlFor="theme-menu">Switch Theme</Label>
              <Switch
                id="theme-menu"
                checked={theme === "dark"}
                value={theme === "dark" ? "on" : "off"}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Header;
