import { Outlet } from "react-router";
import HeaderComponent from "../Header/Header";

function OutletComponent() {
  return (
    <div>
      <HeaderComponent/>
      <Outlet />
    </div>
  )
}

export default OutletComponent;