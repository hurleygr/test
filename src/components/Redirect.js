import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Groups from '../pages/Groups';
import SpecificPost from '../pages/SpecificPost';
import CreateGroup from '../pages/CreateGroup';
import Links from '../pages/Link';
import EachGroup from '../pages/EachGroup';


function Redirect() {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Links}></Route>
      <Route exact path='/group' component={Groups}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/creategroup' component={CreateGroup}></Route>
      <Route exact path='/specificpost' component={SpecificPost}></Route>
      <Route path='/group/' component={EachGroup}></Route>
    </Switch>
  );
}

export default Redirect;
