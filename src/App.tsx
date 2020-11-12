import React, { FC, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StringFormatter } from "./StringFormatter";
import { Url } from "./Url";
import "./app.css";

export const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route>
            <StringFormatter />
            <Url />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
