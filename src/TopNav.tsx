import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState, MouseEvent } from "react";
import supabase from "./utils/supabase";
import useStore from "./store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, NavigateOptions, To, useNavigate } from "react-router";
import useUserLink from "./hooks/useUserLink";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateAndCloseMenu = async (to: To, options?: NavigateOptions) => {
    await Promise.resolve(navigate(to, options));

    handleClose();
  };

  const logout = async () => {
    await supabase.auth.signOut();

    navigateAndCloseMenu("/");
  };

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar className="bg-white dark:bg-zinc-900">
            <div className="flex justify-between items-center w-full">
              <Link
                style={{ fontFamily: "Doto, monospace" }}
                className="bg-black dark:bg-transparent text-white px-4 py-2 hover:text-white"
                to="/"
              >
                music-sns
              </Link>
              <div className="flex">
                {session && (
                  <IconButton
                    type="button"
                    onClick={handleClick}
                    className="h-full"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <UserCircleIcon className="h-10 w-10 text-black dark:text-white" />
                  </IconButton>
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    <Link to={selfLink} onClick={handleClose}>
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default TopNav;
