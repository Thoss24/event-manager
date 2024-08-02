import MainNavigation from "../../components/navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./AppRoot.module.css";

const AppRoot = () => {


  return (
    <div>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
