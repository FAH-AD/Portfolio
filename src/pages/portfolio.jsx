import React from "react";
import NavbarFullMenu from "../components/Navbar-full-menu/navbar-full-menu";
// import ShowcasesFullScreen from "../components/Showcases-full-screen";
// import ShowcasesFullScreen from "../components/Showcases-show-style";
//  import ShowcasesFullScreen from "../components/Showcases-grid";
// import ShowcasesFullScreen from "../components/Showcases-full-screen-circle-slide"
 import ShowcasesFullScreen from "../components/Showcases-one-center";

import DarkTheme from "../layouts/Dark";

const ShowcaseDark = () => {
  return (
    <DarkTheme>
      <NavbarFullMenu />
      <ShowcasesFullScreen />
    </DarkTheme>
  );
};

export default ShowcaseDark;
