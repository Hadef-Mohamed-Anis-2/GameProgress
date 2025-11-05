export function renderContactPage() {
  return `
    <main>
      <div class="hero">
        <h1>Get In Touch</h1>
        <p>Have questions, feedback, or need support? We'd love to hear from you!</p>
      </div>

      <section class="section">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div class="card">
            <h2>Send Us a Message</h2>
            <form onsubmit="handleContactSubmit(event)" style="margin-top: 1.5rem;">
              <div class="form-group">
                <label for="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Your name" required />
              </div>

              <div class="form-group">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" placeholder="your.email@example.com" required />
              </div>

              <div class="form-group">
                <label for="contact-subject">Subject</label>
                <select id="contact-subject" required>
                  <option value="">Select a topic...</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="game-request">Game Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" placeholder="Tell us more..." required></textarea>
              </div>

              <button type="submit" class="btn" style="width: 100%;">Send Message</button>
            </form>
          </div>

          <div>
            <div class="card" style="margin-bottom: 1.5rem;">
              <h2>Contact Information</h2>
              <div class="contact-info" style="flex-direction: column; align-items: start; margin-top: 1.5rem;">
                <div class="contact-item">
                  <div class="contact-icon">📧</div>
                  <div>
                    <strong>Email</strong><br>
                    <a href="mailto:support@gameprogress.app" style="color: var(--primary-color);">support@gameprogress.app</a>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">💬</div>
                  <div>
                    <strong>Discord</strong><br>
                    <a href="#" style="color: var(--primary-color);">Join our community</a>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">🐦</div>
                  <div>
                    <strong>Twitter</strong><br>
                    <a href="#" style="color: var(--primary-color);">@GameProgressApp</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h2>Quick Links</h2>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
                <a href="#" data-route="about" style="color: var(--primary-color); text-decoration: none;">→ How It Works</a>
                <a href="#" data-route="games" style="color: var(--primary-color); text-decoration: none;">→ Supported Games</a>
                <a href="#" data-route="upload" style="color: var(--primary-color); text-decoration: none;">→ Upload Save File</a>
                <a href="#" style="color: var(--primary-color); text-decoration: none;">→ Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}