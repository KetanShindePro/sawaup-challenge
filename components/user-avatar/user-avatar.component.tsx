import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/slices/user.slice";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import Link from "next/link";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string | undefined) {
  if (name) {
    const splitName = name.split(" ");
    const child = splitName[0]
      ? splitName[0][0]
      : "A" + splitName[0]
      ? splitName[0][0]
      : "";
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    };
  } else {
    return {};
  }
}

function UserAvatar() {
  const userData = useSelector(getUserData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="Avatar" onClick={handleClick}>
        <Avatar {...stringAvatar(userData?.name)} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/favorites">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="error" />
            </IconButton>
            Favorites
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserAvatar;
