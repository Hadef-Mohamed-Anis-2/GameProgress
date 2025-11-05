// navbar.js
export function renderNavbar(currentRoute, currentUser) {
  return `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="#" class="logo" data-route="home">GameProgress</a>
        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
        <ul class="nav-links" id="navLinks">
          <li><a href="#" data-route="home" class="${currentRoute === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="#" data-route="games" class="${currentRoute === 'games' ? 'active' : ''}">Games</a></li>
          ${currentUser ? `
            <li><a href="#" data-route="profile" class="${currentRoute === 'profile' ? 'active' : ''}">Profile</a></li>
            <li><a href="#" data-route="upload" class="${currentRoute === 'upload' ? 'active' : ''}">Upload</a></li>
          ` : ''}
          <li><a href="#" data-route="about" class="${currentRoute === 'about' ? 'active' : ''}">How It Works</a></li>
          <li><a href="#" data-route="contact" class="${currentRoute === 'contact' ? 'active' : ''}">Contact</a></li>
          <li class="auth-section">
            ${currentUser ? `
              <div class="user-menu">
                ${currentUser.photoURL ? 
                  `<img src="${currentUser.photoURL}" alt="${currentUser.displayName}" class="user-avatar">` : 
                  `<div class="user-avatar fallback">${currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}</div>`
                }
                <span class="user-name">${currentUser.displayName || 'User'}</span>
                <button class="btn btn-outline" onclick="signOut()">Logout</button>
              </div>
            ` : `
              <button class="btn btn-primary" data-route="login">Login</button>
            `}
          </li>
        </ul>
      </div>
    </nav>
  `;
}