
import { NavLink } from "react-router-dom";
import { setActive } from "./Header";
import type { CustomNavLinkProps } from "../types/vacancy";

const CustomNavLink = ({ to, children }: CustomNavLinkProps) => {
  return (
    <NavLink to={to} className={setActive}>
      {({ isActive }) => (
        <>
          {children}
          {isActive && <div className="blue"></div>}
        </>
      )}
    </NavLink>
  );
}

export default CustomNavLink