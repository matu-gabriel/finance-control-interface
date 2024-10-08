import { useState } from "react";
import {
  DropDownContainer,
  DropdownItem,
  DropdownMenu,
  IconButton,
} from "./style";
import { UserCircle } from "@phosphor-icons/react";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export function LogoutDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <DropDownContainer>
      <IconButton onClick={handleToggleDropDown}>
        <UserCircle size={54} color="white" cursor="pointer" />
      </IconButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      )}
    </DropDownContainer>
  );
}
