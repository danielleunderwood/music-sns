import { Menu, MenuItem } from "@mui/material";
import { ReactNode, useState, MouseEvent } from "react";
import { Link } from "react-router";

interface LinkMenuItem {
  label: string;
  href: string;
}

interface ButtonMenuItem {
  label: string;
  onClick: () => Promise<void>;
}

interface PopupMenuProps {
  id: string;

  label: string;

  activator: ReactNode;

  menuItems: (LinkMenuItem | ButtonMenuItem)[];
}

const isLinkMenuItem = (
  menuItem: LinkMenuItem | ButtonMenuItem,
): menuItem is LinkMenuItem => "href" in menuItem;

function PopupMenu({ id, label, activator, menuItems }: PopupMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = `menu-${id}`;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        id={id}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label={label}
      >
        {activator}
      </button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": id,
        }}
      >
        {menuItems.map((menuItem, index) =>
          isLinkMenuItem(menuItem) ? (
            <MenuItem
              key={index}
              to={menuItem.href}
              component={Link}
              onClick={handleClose}
            >
              {menuItem.label}
            </MenuItem>
          ) : (
            <MenuItem
              key={index}
              onClick={() => {
                menuItem.onClick();
                handleClose();
              }}
            >
              {menuItem.label}
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  );
}

export default PopupMenu;
