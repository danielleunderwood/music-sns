import { AppBar, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";
import supabase from "./utils/supabase";
import Button from "./components/Button";
import useStore from "./store";

interface ElevationScrollProps {
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
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
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar className="bg-white dark:bg-zinc-900">
            <div className="flex justify-between w-full">
              <div
                style={{ fontFamily: "Doto, monospace" }}
                className="bg-black dark:bg-transparent text-white px-4 py-2"
              >
                music-sns
              </div>
              {session && (
                <Button
                  type="button"
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  <div className="px-2">Logout</div>
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default TopNav;
