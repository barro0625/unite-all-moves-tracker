Pokémon UNITE Tracker - GitHub Actions NSIS 504 fix

WHY THIS PATCH EXISTS
The failing Actions log showed electron-builder 25.1.8 returning HTTP 504 while downloading:
nsis-resources-3.4.1.7z
from electron-userland/electron-builder-binaries on GitHub Releases.

WHAT THIS WORKFLOW CHANGES
1. Uses an explicit ELECTRON_BUILDER_CACHE directory.
2. Restores/saves the tool cache between GitHub Actions runs.
3. Downloads nsis-resources-3.4.1.7z from a mirror first, with the official GitHub URL as fallback.
4. Verifies the archive against electron-builder's published SHA-512 before extracting it.
5. Pre-populates the exact NSIS resources cache directory so electron-builder does not need to fetch that archive during packaging.
6. Leaves package.json, Electron version, app code, Pokémon data, and challenge records unchanged.

HOW TO APPLY
1. In the GitHub repository, open the workflow file that triggers the failing "Build Windows Installer" action. In the previous project files, this was named:
   .github/workflows/build-windows-final.yml
2. Replace that workflow file's contents with the supplied build-windows-final.yml.
   If the active workflow has a different filename, keep that filename and replace its contents instead.
3. Commit and push the workflow change to the default branch.
4. Open Actions > Build Windows Installer > Run workflow, select the default branch, and run it manually.
5. A successful manual run uploads the EXE under the run's Artifacts section. A GitHub Release is published automatically only when the workflow is triggered by pushing a new desktop-v* tag.

IMPORTANT
- This patch does not change package.json version. Keep the version in package.json aligned with the release tag you intend to publish.
- Do not push an already-used tag again. For a new release, use a new unique tag matching package.json.
- The archive is verified by SHA-512. A download from a mirror is rejected if its content differs from the expected electron-builder archive.
- If the mirror and official source are both unavailable, the workflow will stop with a clear download error rather than proceeding with an unverified file.
