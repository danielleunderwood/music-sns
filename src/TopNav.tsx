import { AppBar, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";
import supabase from "./utils/supabase";
import useStore from "./store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, NavigateOptions, To, useNavigate } from "react-router";
import useUserLink from "./hooks/useUserLink";
import PopupMenu from "./components/PopupMenu";

interface ElevationScrollProps {
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll({ children }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

function TopNav() {
  const { session } = useStore();

  const selfLink = useUserLink();

  const navigate = useNavigate();

  const navigateAndCloseMenu = async (to: To, options?: NavigateOptions) => {
    await Promise.resolve(navigate(to, options));
  };

  const logout = async () => {
    await supabase.auth.signOut();

    navigateAndCloseMenu("/");
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky">
          <Toolbar className="bg-white dark:bg-zinc-900">
            <div className="flex justify-between items-center w-full">
              <Link
                style={{ fontFamily: "Doto, monospace" }}
                className="text-black dark:text-white px-4 py-2"
                to="/"
              >
                <span> music-sns</span>
              </Link>
              <div className="flex">
                {session && (
                  <PopupMenu
                    id="user-actions-menu"
                    label="User actions menu"
                    activator={
                      <UserCircleIcon className="h-10 w-10 text-black dark:text-white" />
                    }
                    menuItems={[
                      { label: "Profile", href: selfLink },
                      { label: "Logout", onClick: logout },
                    ]}
                  />
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

export default TopNav;
