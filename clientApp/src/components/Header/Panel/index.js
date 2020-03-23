import React from 'react';

export default function() {
  return (
    <div class="dropdown">
      <i
        class="i-Safe-Box text-muted header-icon"
        id="dropdownMenuButton"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></i>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div class="menu-icon-grid">
          <a href="#">
            <i class="i-Shop-4"></i> Home
          </a>
          <a href="#">
            <i class="i-Library"></i> UI Kits
          </a>
          <a href="#">
            <i class="i-Drop"></i> Apps
          </a>
          <a href="#">
            <i class="i-File-Clipboard-File--Text"></i> Forms
          </a>
          <a href="#">
            <i class="i-Checked-User"></i> Sessions
          </a>
          <a href="#">
            <i class="i-Ambulance"></i> Support
          </a>
        </div>
      </div>
    </div>
  );
}
