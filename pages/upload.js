


export function renderUploadPage(currentUser) {
  if (!currentUser) {
    return `
      <main>
        <div class="card" style="text-align: center; padding: 3rem;">
          <h2>Please Log In</h2>
          <p>You need to be logged in to upload save files.</p>
          <button class="btn btn-primary" data-route="login" style="margin-top: 1rem;">Login</button>
        </div>
      </main>
    `;
  }

  return `
    <main>
      <div class="hero">
        <h1>Upload Save File</h1>
        <p>Select your game and upload your save file to analyze your progress.</p>
      </div>

      <section class="section">
        <div class="card">
          <form onsubmit="handleUpload(event)">
            <div class="form-group">
              <label for="game-select">Select Game</label>
              <select id="game-select" required>
                <option value="">Choose a game...</option>
                <option value="hollow-knight">Hollow Knight</option>
                <option value="ender-lilies">Ender Lilies</option>
                <option value="ender-magnolia">Ender Magnolia: Bloom in the Mist</option>
              </select>
            </div>

            <div class="form-group">
              <label>Save File</label>
              <div class="file-upload" onclick="document.getElementById('file-input').click()">
                <input type="file" id="file-input" accept=".txt,.json" required />
                <div class="upload-icon">📁</div>
                <p><strong>Click to browse</strong> or drag and drop</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
                  Supported formats: .txt, .json (Max 10MB)
                </p>
              </div>
            </div>

            <div class="form-group">
              <label for="save-name">Save Name (Optional)</label>
              <input type="text" id="save-name" placeholder="e.g., Main Playthrough, 100% Run" />
            </div>

            <button type="submit" class="btn" style="width: 100%;">Analyze Save File</button>
          </form>
        </div>
      </section>







      <section class="section">
        <div class="card">
          <h2>How to Convert .sav to JSON for Ender Lilies</h2>
          <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div style="padding: 1.5rem; background: var(--bg-color); border-radius: var(--border-radius);">
              <h3 style="color: var(--primary-color); margin-top: 0;">Step-by-Step Guide</h3>
              
              <div class="conversion-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Visit the Save Editor Website</h4>
                  <p>Go to <a href="https://uesaveeditor.cc/" target="_blank" style="color: var(--primary-color); text-decoration: underline;">https://uesaveeditor.cc/</a></p>
                </div>
              </div>

              <div class="conversion-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Upload Your .sav File</h4>
                  <p>Click on "Choose File" and select your Ender Lilies save file:<br>
                  <code>C:\\Users\\[YourName]\\AppData\\Local\\ENDERS LILIES\\SaveGame.sav</code></p>
                </div>
              </div>

              <div class="conversion-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Copy the JSON Code</h4>
                  <p>After uploading, the website will display your save data as JSON code.<br>
                  Select and copy ALL the JSON text (Ctrl+A then Ctrl+C).</p>
                </div>
              </div>

              <div class="conversion-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>Create a Text File</h4>
                  <p>Open Notepad or any text editor and paste the copied JSON code.</p>
                </div>
              </div>

              <div class="conversion-step">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h4>Save as .txt File</h4>
                  <p>Save the file with a .txt extension (e.g., <code>my_save_data.txt</code>)</p>
                </div>
              </div>

              <div class="conversion-step">
                <div class="step-number">6</div>
                <div class="step-content">
                  <h4>Upload to GameProgress</h4>
                  <p>Now you can upload the .txt file here and we'll analyze your progress!</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      










      <section class="section">
    <div class="card">
        <h2>How to Convert .sav to JSON for Hollow Knight</h2>
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div style="padding: 1.5rem; background: var(--bg-color); border-radius: var(--border-radius);">
                <h3 style="color: var(--primary-color); margin-top: 0;">Step-by-Step Guide</h3>
                
                <div class="conversion-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Visit the Save Editor Website</h4>
                        <p>Go to <a href="https://bloodorca.github.io/hollow/" target="_blank" style="color: var(--primary-color); text-decoration: underline;">https://bloodorca.github.io/hollow/</a></p>
                    </div>
                </div>

                <div class="conversion-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Upload Your .sav File</h4>
                        <p>Click on "Choose File" and select your Hollow Knight save file, typically found here:<br>
                        <code>C:\\Users\\[YourName]\\AppData\\LocalLow\\Team Cherry\\Hollow Knight\\<File Name>.dat</code><br>
                        (The file will likely be named **slot1.dat**, **slot2.dat**, etc., depending on the slot you used.)</p>
                    </div>
                </div>

                <div class="conversion-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Copy the JSON Code</h4>
                        <p>After uploading, the website will display your save data as JSON code.<br>
                        Select and copy **ALL** the JSON text (Ctrl+A then Ctrl+C).</p>
                    </div>
                </div>

                <div class="conversion-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Create a Text File</h4>
                        <p>Open Notepad or any text editor and paste the copied JSON code.</p>
                    </div>
                </div>

                <div class="conversion-step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h4>Save as .txt File</h4>
                        <p>Save the file with a **.txt** extension (e.g., <code>hollow_knight_save.txt</code>)</p>
                    </div>
                </div>

                <div class="conversion-step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h4>Upload to GameProgress</h4>
                        <p>Now you can upload the .txt file here and we'll analyze your progress!</p>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</section>












      <section class="section">
        <div class="card">
          <h2>Save File Locations</h2>
          <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; background: var(--bg-color); border-radius: var(--border-radius);">
              <h3>Hollow Knight</h3>
              <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                <strong>Windows:</strong> <code>C:\\Users\\[YourName]\\AppData\\LocalLow\\Team Cherry\\Hollow Knight</code><br>
                <strong>Files:</strong> <code>user1.dat</code>, <code>user2.dat</code>, etc.
              </p>
            </div>
            <div style="padding: 1rem; background: var(--bg-color); border-radius: var(--border-radius);">
              <h3>Ender Lilies</h3>
              <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                <strong>Windows Save Location:</strong> <code>C:\\Users\\[YourName]\\AppData\\Local\\ENDERS LILIES</code><br>
                <strong>File:</strong> <code>SaveGame.sav</code> (needs conversion to JSON)
              </p>
            </div>
            <div style="padding: 1rem; background: var(--bg-color); border-radius: var(--border-radius);">
              <h3>General Tips</h3>
              <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                • Look in the game's installation directory<br>
                • Check Documents folder for save games<br>
                • Search for the game name in File Explorer<br>
                • Some games store saves in cloud services like Steam Cloud
              </p>
            </div>
          </div>
        </div>
      </section>


    </main>

    <style>
      .conversion-step {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.25rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .conversion-step:last-child {
        border-bottom: none;
      }

      .step-number {
        background: var(--primary-color);
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
        font-size: 0.9rem;
      }

      .step-content h4 {
        margin: 0 0 0.5rem 0;
        color: var(--text-color);
      }

      .step-content p {
        margin: 0;
        color: var(--text-secondary);
        line-height: 1.5;
      }

      code {
        background: var(--code-bg, #f8f9fa);
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        color: var(--code-color, #e83e8c);
      }

      @media (max-width: 768px) {
        .conversion-step {
          flex-direction: column;
          text-align: center;
        }

        .step-number {
          align-self: center;
        }
      }
    </style>
  `;
}