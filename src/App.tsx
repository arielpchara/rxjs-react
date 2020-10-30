import React, { FC, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StringFormatter } from "./StringFormatter";

export const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route>
            <StringFormatter />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
