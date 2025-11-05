// profile.js
export function renderProfilePage(currentUser) {
  if (!currentUser) {
    return `
      <main>
        <div class="card" style="text-align: center; padding: 3rem;">
          <h2>Please Log In</h2>
          <p>You need to be logged in to view your profile.</p>
          <button class="btn btn-primary" data-route="login" style="margin-top: 1rem;">Login</button>
        </div>
      </main>
    `;
  }

  // حساب تاريخ الانضمام
  const joinDate = currentUser.metadata && currentUser.metadata.creationTime ? 
    new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return `
    <main>
      <div class="card" style="margin-bottom: 2rem;">
        <div class="profile-header">
          <div class="avatar">
            ${currentUser.photoURL ? 
              `<img src="${currentUser.photoURL}" alt="${currentUser.displayName}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : 
              `<div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-color); background-size: cover; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
                ${currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
              </div>`
            }
          </div>
          <div class="profile-info">
            <h2>${currentUser.displayName || 'User'}</h2>
            <p class="join-date">Member since ${joinDate}</p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">${currentUser.email || ''}</p>
          </div>
        </div>
      </div>

      <section class="section">
        <div class="card">
          <h2>My Games</h2>
          <div class="game-grid" style="margin-top: 1.5rem;">
            <div class="card" style="text-align: center; padding: 2rem;">
              <p style="color: var(--text-secondary);">Loading games...</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h2>Achievements & Badges</h2>
          <div class="badge-grid" style="margin-top: 1.5rem;">
            <div class="badge">
              <div class="badge-icon">🏆</div>
              <div class="badge-name">First Upload</div>
            </div>
            <div class="badge" style="opacity: 0.3;">
              <div class="badge-icon">⭐</div>
              <div class="badge-name">Completionist</div>
            </div>
            <div class="badge" style="opacity: 0.3;">
              <div class="badge-icon">🎮</div>
              <div class="badge-name">Multi-Gamer</div>
            </div>
            <div class="badge" style="opacity: 0.3;">
              <div class="badge-icon">🔥</div>
              <div class="badge-name">Week Streak</div>
            </div>
            <div class="badge" style="opacity: 0.3;">
              <div class="badge-icon">💎</div>
              <div class="badge-name">Locked</div>
            </div>
            <div class="badge" style="opacity: 0.3;">
              <div class="badge-icon">🌟</div>
              <div class="badge-name">Locked</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h2>Public Profile Link</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">Share your gaming achievements with others!</p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <input
              type="text"
              readonly
              value="https://gameprogress.app/u/${currentUser.uid}"
              style="flex: 1; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: var(--border-radius); min-width: 300px;"
            />
            <button class="btn" onclick="copyProfileLink()">Copy Link</button>
          </div>
        </div>
      </section>
    </main>
  `;
}