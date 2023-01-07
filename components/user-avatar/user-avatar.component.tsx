import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/slices/user.slice";

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

  return <Avatar {...stringAvatar(userData?.name)} />;
}

export default UserAvatar;
