import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Layout from "./layout/layout";
import Home from "./apps/home/home";
import Search from "./apps/search/search";
import Gene from "./apps/gene/gene";
import Operon from "./apps/operon/operon";
import Regulon from "./apps/regulon/regulon"
import DTT from "./apps/dtt/dtt";

function App() {
  return (
      <HelmetProvider>
        <BrowserRouter>
            <Layout>
            <Switch>
                <Route exact path={"/"}>
                    <Home/>
                </Route>
                <Route path={"/home"}>
                    <Home/>
                </Route>
                <Route path={["/search/:keyword","/search"]}>
                    <Search />
                </Route>
                <Route path={["/gene/:id/:site/:section","/gene/:id/:site","/gene/:id","/gene",]}>
                    <Gene />
                </Route>
                <Route path={["/operon/:id/:site/:section","/operon/:id/:site","/operon/:id","/operon",]}>
                    <Operon />
                </Route>
                <Route path={["/tu/:id","/tu",]}>
                    <Operon />
                </Route>
                <Route path={["/regulon/:id/:site/:section","/regulon/:id/:site","/regulon/:id","/regulon",]}>
                    <Regulon />
                </Route>
                <Route path={"/dtt"}>
                    <DTT />
                </Route>
            </Switch>
            </Layout>
        </BrowserRouter>
      </HelmetProvider>
  );
};

export default App;


/**
 *
 *
 *
 * <Switch>


 <Route path={["/started/:site","/started"]} >
 <Doc />
 </Route>
 <Route path={["/app/testing",]}>
 <Testing />
 </Route>
 <Route path="*">
 <Error />
 </Route>
 </Switch>
 * */