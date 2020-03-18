import React from 'react';

export default function() {
  return (
    <div class="dropdown">
      <div class="user col align-self-end">
        <img
          id="userDropdown"
          src="./dist-assets/images/logo.png"
          alt=""
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="userDropdown"
        >
          <div class="dropdown-header">
            <i class="i-Lock-User mr-1"></i> Rebonato
          </div>
          <a class="dropdown-item">Profile</a>
          <a class="dropdown-item">Settings</a>
          <a class="dropdown-item" href="signin.html">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
