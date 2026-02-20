# How to Install Unpacked Chrome Extensions

## Step-by-step

1. **Download the extension** — clone or download this repository to your computer

2. **Open Chrome Extensions page**
   - Type `chrome://extensions/` in the address bar, or
   - Go to Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the **Developer mode** switch in the top-right corner

4. **Load the extension**
   - Click **Load unpacked**
   - Select the folder containing `manifest.json`

5. **Pin the extension** (optional)
   - Click the puzzle icon (🧩) in the toolbar
   - Find the extension and click the pin icon

## Updating after code changes

- Go to `chrome://extensions/`
- Click the refresh icon (↻) on the extension card
- Or press **Ctrl+Shift+U** on the extensions page

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Extension not visible in toolbar | Pin it via the puzzle icon (🧩) |
| "Errors" badge on extension card | Click "Errors" to see details, fix, then reload |
| Changes not taking effect | Reload the extension and refresh the target page |
| "Service worker inactive" | This is normal — it activates on icon click |
