import React, { Fragment } from 'react';
import Notifications from './Notifications/index';
import Panel from './Panel/index';
import Profile from './Profile/index';
import Links from './Links/index';

export default function() {
  return (
    <Fragment>
      <div class="main-header">
        <div class="logo">
          <img src="./dist-assets/images/logo.png" alt="" />
        </div>
        <div class="menu-toggle">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="m-auto"></div>
        <div class="header-part-right">
          <i
            class="i-Full-Screen header-icon d-none d-sm-inline-block"
            data-fullscreen=""
          ></i>
          <Panel />
          <Notifications />
          <Profile />
        </div>
      </div>
      <Links />
    </Fragment>
  );
}
