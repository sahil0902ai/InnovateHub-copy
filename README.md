# InnovateHub

A collaborative platform for sharing, refining, and discovering innovative ideas and forming interest-based groups.

## 🚀 Deploying to Netlify

This project is built with [Vite](https://vitejs.dev/) and React. To deploy on Netlify:

1. **Build the project:**
   ```sh
   npm run build
   ```
   This will output the production build to the `dist` directory.

2. **Netlify settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Make sure your `netlify.toml` includes the following for SPA routing:
     ```toml
     [build]
       command = "npm run build"
       publish = "dist"

     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```

3. **Environment variables:**
   - If you use an API key (e.g., for Google GenAI), set it in Netlify's dashboard as `VITE_API_KEY` and access it in your code as `import.meta.env.VITE_API_KEY`.

4. **Deploy:**
   - Push your code to your Git provider and connect the repo to Netlify, or drag-and-drop the `dist` folder in the Netlify UI for manual deploy.

## 📝 Notes
- SPA routing is handled by the redirect rule above.
- If you add static assets (like `index.css`), ensure they are referenced correctly and included in the `dist` output.

---

© {year} InnovateHub. All rights reserved.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
