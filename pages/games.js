export function renderGamesPage() {
  const games = [
    { 
      id: 'hollow-knight',
      title: 'Hollow Knight', 
      description: 'An epic action adventure through a vast ruined kingdom of insects and heroes.',
      image: 'hollow-knight'
    },
    { 
      id: 'ender-lilies',
      title: 'Ender Lilies', 
      description: 'Dark fantasy 2D action RPG metroidvania',
      image: 'ender-lilies'
    },
    { 
      id: 'ender-magnolia',
      title: 'Ender Magnolia: Bloom in the Mist', 
      description: 'The sequel to Ender Lilies - a hauntingly beautiful metroidvania adventure.',
      image: 'ender-magnolia'
    },
  ];

  return `
    <main>
      <div class="hero">
        <h1>Supported Games</h1>
        <p>Browse all games that support save file analysis and progress tracking.</p>
      </div>

      <section class="section">
        <h2>All Games</h2>
        <div class="game-grid">
          ${games.map(game => `
            <div class="card game-card" data-route="game-detail" data-game-id="${game.id}">
              <div class="game-card-image ${game.image}"></div>
              <h3>${game.title}</h3>
              <p>${game.description}</p>
              <button class="btn btn-secondary">View Details</button>
            </div>
          `).join('')}
        </div>
      </section>
    </main>
  `;
}