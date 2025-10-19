# Forum App

This repository contains a small React forum application created with Create React App. The project is intended to be easy to clone and run locally. This README explains step-by-step how to get the project running on Windows (PowerShell) and gives common troubleshooting tips.

---

## Requirements

- Node.js (LTS recommended — 16.x, 18.x, or 20.x). Verify with:

```powershell
node --version
npm --version
```

- Git (for cloning and version control):

```powershell
git --version
```

- Recommended: GitHub account if you plan to push changes, and optionally GitHub CLI (`gh`) or an SSH key / Personal Access Token (PAT) for authentication.

---

## Quick start — clone and run

1. Open PowerShell and change directory to where you want the project:

```powershell
cd C:\path\to\projects
```

2. Clone the repo (HTTPS):

```powershell
git clone https://github.com/<your-username>/forum-app.git
cd forum-app
```

Or using SSH (requires SSH keys set up on GitHub):

```powershell
git clone git@github.com:<your-username>/forum-app.git
cd forum-app
```

3. Install dependencies:

```powershell
npm install
```

Notes:
- If `npm install` fails with permission or certificate issues, ensure your Node/npm are properly installed. Use Node installer from https://nodejs.org/.
- If you see warnings about peer dependencies, they are usually safe for this simple app.

4. Start the development server:

```powershell
npm start
```

This opens http://localhost:3000 in your browser by default. The app supports hot reload — changes you make in `src/` will auto-reload.

---

## Project structure (important files)

- `package.json` — project dependencies and scripts
- `src/` — React source files
	- `components/` — UI components (LoginForm, CreateUserForm, PostList, PostItem etc.)
	- `pages/` — page-level components (ForumPage, LoginPage, RegisterPage, PostDetailPage)
	- `services/api.js` — API helper functions used to talk to the backend
- `public/` — static HTML and manifest
- `.gitignore` — files excluded from git

---

## Environment & API endpoints

The app expects a backend (PHP endpoints) used in `src/services/api.js`. By default, `api.js` points to `http://hyeumine.com` endpoints (example):

- `forumGetPosts.php` — listing posts
- `forumCreateUser.php` — create user
- `forumLogin.php` — login
- `forumNewPost.php`, `forumDeletePost.php`, `forumReplyPost.php`, `forumDeleteReply.php`

If you run your own backend or proxy, update the URLs in `src/services/api.js` accordingly.

Local development with CORS issues:
- If the backend is remote and CORS blocks requests, run a local proxy or configure the server to allow your origin.

---

## Recommended git workflow for contributors

1. Create a branch for your work:

```powershell
git checkout -b feature/your-change
```

2. Stage and commit changes locally:

```powershell
git add -A
git commit -m "Short descriptive message"
```

3. Push and open a Pull Request:

```powershell
git push -u origin feature/your-change
```

Open the GitHub UI to create a Pull Request from your branch into `master` (or `main` if the repo uses it).

---

## Common troubleshooting

- "npm start" fails or port 3000 already in use:
	- Either stop the other process or run `set PORT=3001; npm start` in PowerShell to run on a different port.

- Git push authentication errors (HTTPS):
	- GitHub removed password auth for Git over HTTPS. Use a Personal Access Token (PAT) instead of a password or configure SSH keys.
	- To create PAT: GitHub -> Settings -> Developer settings -> Personal access tokens -> Generate new token (give `repo` scope).

- Git push via SSH failing:
	- Make sure your local SSH public key is added to GitHub (Settings -> SSH and GPG keys). Test with:

```powershell
ssh -T git@github.com
```

- Large files / Git LFS:
	- If you add files >100MB, GitHub will reject them. Use Git LFS for large assets or remove them.

- OneDrive sync issues:
	- This project lives in OneDrive in some setups. If OneDrive locks files or you see sync conflicts, consider moving the repo to a non-OneDrive folder (e.g., `C:\Projects\forum-app`).

---

## Tests

This project includes a basic test setup from Create React App. Run tests with:

```powershell
npm test
```

By default CRA runs tests in watch mode. Use `npm test -- --watchAll=false` for a single run.

---

## Building for production

To build a production bundle:

```powershell
npm run build
```

The `build/` folder will contain production-ready static assets you can deploy to a static host or serve via a backend.

---

## Contributing and licensing

If you'd like to contribute, please open an issue or a pull request. Add a `CONTRIBUTING.md` if the project grows. Add a `LICENSE` file if you want to specify terms.

---

If you'd like, I can also:
- add a small `README` summary file into the repo (I already updated this one),
- add a `CONTRIBUTING.md` template,
- or create a GitHub Actions workflow for basic lint/test on PRs.

Tell me which of the above you'd like next.

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
