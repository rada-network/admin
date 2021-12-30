import { useMatch, useResolvedPath } from "react-router-dom";
import { ListItemButton } from "@mui/material";

const MenuLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <ListItemButton to={to} selected={match} {...props}>
      {children}
    </ListItemButton>
  );
};

export default MenuLink;
