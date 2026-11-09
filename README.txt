Pokémon UNITE Tracker - GitHub Actions workflow fix v2

FIXED ISSUE
The previous workflow put `${{ runner.temp }}` in `jobs.build-windows.env`.
GitHub Actions does not allow the `runner` context in a job-level `env` block,
so the workflow was rejected before any build step ran.

This revision uses `${{ github.workspace }}` for ELECTRON_BUILDER_CACHE and
for the actions/cache path. The `github` context is valid in this location.
The cache root is the same for restore, pre-download, save, and electron-builder.

HOW TO APPLY
1. Open the currently active workflow in your repository:
   `.github/workflows/build-windows.yml`
2. Replace its entire contents with the supplied `build-windows.yml`.
3. Commit and push the change to the default branch.
4. Open Actions and run the workflow manually, or push a new release tag.

IMPORTANT
- Keep the current workflow filename `build-windows.yml` if that is the workflow shown in your repository.
- This patch only fixes workflow configuration/cache path references. It does not change package.json,
  Electron version, application files, Pokémon data, translations, or user records.
- This fixes the invalid-workflow error from the screenshot. It does not guarantee that a later
  external mirror/GitHub download will be available; if that later step fails, inspect its log.
- Do not reuse an already-published release tag.
