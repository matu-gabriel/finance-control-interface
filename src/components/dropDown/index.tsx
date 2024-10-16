import { useMemo, useState } from "react";
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
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleToggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const userPicture = useMemo(() => {
    return user?.picture ? (
      <img
        src={user.picture}
        alt={user.name}
        width={40}
        height={40}
        style={{ borderRadius: "50%" }}
      />
    ) : (
      <UserCircle size={54} />
    );
  }, [user?.name, user?.picture]);

  return (
    <DropDownContainer>
      <IconButton onClick={handleToggleDropDown}>{userPicture}</IconButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      )}
    </DropDownContainer>
  );
}
