import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from '~/pages/List';
import Update from '~/pages/Update';
import Save from '~/pages/Save';
import PageNotFound from '~/pages/PageNotFound';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/update" component={Update} />
      <Route path="/save" component={Save} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
