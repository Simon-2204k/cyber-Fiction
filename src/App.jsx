import EntrancePage from "./components/EntrancePage";
import PreLoader from "./components/PreLoader";
import CyberWhite from "./components/CyberWhite";
import PageSize from "./components/PageSize";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [openWebsite, setOpenWebsite] = useState(false);
  useEffect(() => {
    function openWeb() {
      const screenSize = window.innerWidth;
      setOpenWebsite(screenSize >= 1000);
    }

    openWeb();
    window.addEventListener("resize", openWeb);

    return () => window.removeEventListener("resize", openWeb);
  }, []);

  return (
    <div>
      {openWebsite === false && <PageSize></PageSize>}

      <Routes>
        <Route path="/entrance" element={<EntrancePage />} />
        <Route path="/" element={<PreLoader />} />
        <Route path="/cyber" element={<CyberWhite />} />
      </Routes>
    </div>
  );
};

export default App;
