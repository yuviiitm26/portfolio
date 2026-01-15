# Deploying Your AI Portfolio

Choose one of the following methods to make your portfolio live.

## Option 1: GitHub Pages (Recommended for Long Term)

Since you are a developer, this is the most professional approach.

1.  **Create a New Repository** on GitHub:
    *   Go to: https://github.com/new
    *   Name it: `ai-portfolio` (or `portfolio`)
    *   Public: Yes
    *   *Do not initialize with README/gitignore (we already have them)*

2.  **Push Your Code**:
    Run these commands in your VS Code terminal (already in the correct folder):
    ```bash
    git branch -M main
    git remote add origin https://github.com/yuviiitm26/ai-portfolio.git
    git push -u origin main
    ```
    *(Replace `ai-portfolio` with whatever name you chose)*

3.  **Activate Pages**:
    *   Go to Repository Settings -> **Pages**.
    *   Source: `Deploy from a branch`.
    *   Branch: `main` / root.
    *   Save.

    Your site will be live at: `https://yuviiitm26.github.io/ai-portfolio/`

## Option 2: Netlify Drop (Fastest / Instant)

1.  Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag and drop the entire `ai_portfolio` folder into the window.
3.  It will be live instantly with a secure HTTPS URL.
