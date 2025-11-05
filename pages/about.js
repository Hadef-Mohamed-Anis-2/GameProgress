export function renderAboutPage() {
  return `
    <main>
      <div class="hero">
        <h1>How It Works</h1>
        <p>Learn how GameProgress Tracker analyzes your save files to provide detailed insights.</p>
      </div>

      <section class="section">
        <div class="card">
          <h2>What We Do</h2>
          <p style="line-height: 1.8; color: var(--text-secondary);">
            GameProgress Tracker is a platform that reads your game save files and extracts detailed statistics about your gameplay progress.
            We currently support Ender Lilies and provide insights such as completion percentage, spirits collected,
            bosses defeated, playtime, and much more.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h2>How It Works</h2>
          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem;">
            <div style="display: flex; gap: 1rem; align-items: start;">
              <div style="min-width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Select Your Game</h3>
                <p style="color: var(--text-secondary);">Choose Ender Lilies from our library.</p>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: start;">
              <div style="min-width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Upload Save File</h3>
                <p style="color: var(--text-secondary);">Upload your save file from your computer. We accept .txt and .json formats.</p>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: start;">
              <div style="min-width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Get Detailed Analysis</h3>
                <p style="color: var(--text-secondary);">Our system parses your save file and presents detailed statistics about your progress.</p>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: start;">
              <div style="min-width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Share & Track</h3>
                <p style="color: var(--text-secondary);">Share your achievements with friends and track your progress over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h2>Privacy & Safety</h2>
          <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
            Your privacy is our top priority. We only read game-related data from your save files and never access personal information.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--primary-color);">✓</span>
              <span>Your save files are processed locally and deleted after analysis</span>
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--primary-color);">✓</span>
              <span>We never share your data with third parties</span>
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--primary-color);">✓</span>
              <span>You have full control to delete your data at any time</span>
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--primary-color);">✓</span>
              <span>All connections are encrypted with SSL</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h2>Frequently Asked Questions</h2>
          <div style="margin-top: 1.5rem;">
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>Is this service free?</span>
                <span>▼</span>
              </div>
              <div class="faq-answer">
                Yes! GameProgress Tracker is completely free to use. We may introduce premium features in the future, but core functionality will always remain free.
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>Will uploading my save file affect my game?</span>
                <span>▼</span>
              </div>
              <div class="faq-answer">
                No. We only read your save file, we never modify it. Your original save file remains untouched on your computer.
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>What games do you support?</span>
                <span>▼</span>
              </div>
              <div class="faq-answer">
                We currently support Ender Lilies: Quietus of the Knights. We're working on adding more games based on community requests.
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>Can I request a game to be added?</span>
                <span>▼</span>
              </div>
              <div class="faq-answer">
                Absolutely! Visit our contact page and let us know which game you'd like to see supported. We prioritize games based on community demand.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}