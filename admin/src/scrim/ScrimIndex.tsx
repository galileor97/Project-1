import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ScrimList } from "./ScrimList";
import { CreateScrim } from "./CreateScrim";
import { Scrim } from "./Scrim";

export const ScrimIndex = (): React.ReactElement => {
  useBreadcrumbs("/scrims/", "Scrims");

  return (
    <Switch>
      <PrivateRoute exact path={"/scrims/"} component={ScrimList} />
      <PrivateRoute path={"/scrims/new"} component={CreateScrim} />
      <PrivateRoute path={"/scrims/:id"} component={Scrim} />
    </Switch>
  );
};
