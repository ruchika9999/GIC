import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import PageNoteFound from "./components/Pages/PageNotFound";
import Charts from "./components/Pages/Chart";

import _withLayout from "./../src/components/Layout/Main";
import withProtection from "./components/WithRoute/withProtection";
import withPublicRoute from "./components/WithRoute/withPublicRoute";

import { ROUTE } from "./util/constant";

const withLayout = _withLayout();

const ProtectedHome = withLayout(withProtection(Home));
const ProtectedChart = withLayout(withProtection(Charts));

const PublicLogin = withPublicRoute(Login);

const BaseRoute = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLogin />} path={ROUTE.DEFAULT} />
        <Route element={<PublicLogin />} path={ROUTE.LOGIN} />
        <Route element={<ProtectedHome />} path={ROUTE.HOME} />
        <Route element={<PageNoteFound />} path={ROUTE.BAD_ROUTE} />
        <Route element={<ProtectedChart />} path={ROUTE.CHART} />
      </Routes>
    </Router>
  );
};

export default BaseRoute;
