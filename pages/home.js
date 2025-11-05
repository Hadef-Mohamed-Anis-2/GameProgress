export function renderHomePage() {
  return `
    <main>
      <div class="hero">
        <h1>Track Your Gaming Journey</h1>
        <p>Upload your save files and discover detailed statistics about your game progress, achievements, and playtime.</p>
      </div>

            <section class="featured-game">
        <h2 style="margin-bottom: 1.5rem;">Latest Additions</h2>
        
        <div class="card" style="margin-bottom: 2rem;">
          <div class="game-header">
            <div class="game-cover" style="background-image: url('assets/ender-magnolia.jpg'); background-size: cover; background-position: center;"></div>
            <div class="game-info">
              <h2>Ender Magnolia: Bloom in the Mist</h2>
              <p class="meta">Newly Added</p>
              <p>The sequel to Ender Lilies - a hauntingly beautiful metroidvania adventure set in a polluted world. Guide Magnolia through the Homunculi Kingdom and purify corrupted souls.</p>
              <button class="btn btn-primary" data-route="game-detail" data-game-id="ender-magnolia" style="margin-top: 20px;">View Details</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="game-header">
            <div class="game-cover" style="background-image: url('assets/ender-lilies.jpg'); background-size: cover; background-position: center;"></div>
            <div class="game-info">
              <h2>Ender Lilies</h2>
              <p class="meta">Previously Added</p>
              <p>Ender Lilies: Quietus of the Knights is a dark fantasy 2D action RPG. Explore a devastated kingdom, purify its corrupted knights, and uncover the truth behind the Rain of Death.</p>
              <button class="btn btn-secondary" data-route="spirits-library" style="margin-top: 20px;">Browse Spirits Library</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Featured Screenshots</h2>
        <div class="image-slider">
          <div class="slider-track" id="sliderTrack">
            <div class="slide" style="background-image: url(assets/hollow-night-slide.jpg); background-size: cover;"></div>
            <div class="slide" style="background-image: url(assets/ender-lilies-slide-2.png); background-size: cover;"></div>
            <div class="slide" style="background-image: url(assets/sikiro-slide.jpg); background-size: cover;"></div>
            <div class="slide" style="background-image: url(assets/silksong-slide-.jpg); background-size: cover;"></div>
          </div>
          <button class="slider-btn prev" onclick="changeSlide(-1)">‹</button>
          <button class="slider-btn next" onclick="changeSlide(1)">›</button>
          <div class="slider-dots" id="sliderDots"></div>
        </div>
      </section>

      <section class="section">
        <h2>Platform Statistics</h2>
        <div class="stats-grid">
          <div class="card stat-card">
            <div class="stat-value">2</div>
            <div class="stat-label">Supported Games</div>
          </div>
          <div class="card stat-card">
            <div class="stat-value">--</div>
            <div class="stat-label">Active Users</div>
          </div>
          <div class="card stat-card">
            <div class="stat-value">--</div>
            <div class="stat-label">Save Files Analyzed</div>
          </div>
          <div class="card stat-card">
            <div class="stat-value">24/7</div>
            <div class="stat-label">Always Available</div>
          </div>
        </div>
      </section>
    </main>
  `;
}