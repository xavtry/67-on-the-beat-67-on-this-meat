# Concrete Dreams

A browser-based 3D skateboarding prototype built with Three.js and Vite. It features a third-person skater in a yellow hoodie, a procedural skateboard, two park layouts, keyboard skating, airborne tricks, combo scoring, a pause menu, customization, and GitHub Pages deployment.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Click **Drop In** to start. Focus the game page before using the keyboard.

## Controls

- **W / Up** accelerate
- **S / Down** brake
- **A / D** turn
- **Space** ollie; while turning, Space performs a kickflip or heelflip
- **Shift + Space** nollie
- **M** manual attempt
- **G** grind attempt
- **F** quick push
- **C** change camera distance
- **R** restart session
- **Esc** pause/resume

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

1. Create a GitHub repository named `concrete-dreams` (or any name you like) and push this project to the `main` branch.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` installs dependencies, builds the Vite project, and publishes `dist`.
4. Wait for the workflow to finish; the deployment URL appears in the workflow run or Pages settings.

Vite's base path is derived from `GITHUB_REPOSITORY` in GitHub Actions, so the project works under a repository subpath. For a custom local repository name, no manual config change is needed in CI.

## What's implemented

- Procedurally built human-shaped skater with hoodie, hair, face details, articulated limbs, and a separate skateboard with deck, grip, trucks, and wheels.
- Concrete Bowl and Street Plaza park layouts, seams, ramps, rails, ledges, fencing, palms, and skyline blocks.
- Third-person follow camera with three distances; acceleration, braking, steering, momentum, jump arc, boundary handling, and wheel rotation.
- Ollie, nollie, kickflip, heelflip, pop shuvit, manual scoring, and a basic 50–50 grind attempt input.
- Combo accumulation, multipliers, landing bank, session score, best combo, trick HUD, speed readout, and FPS display.
- Main menu, pause menu, park selection, trick guide, controls, basic settings, color customization, tutorial overlay, synthesized sound cues.
- Static hosting setup and GitHub Actions workflow.

## Current limitations

This is an initial playable prototype, not a full simulation. The skater is procedurally modeled rather than using a licensed rigged animation asset. The park bowls are visual curved meshes; advanced slope-aware collision, rail snapping, balance physics, falls, and several advanced tricks (grabs, 360 flip, hardflip, powerslide, nose manual, lipslide, etc.) are not yet implemented. The grind input is a simplified scoring interaction, not full obstacle-aware grind physics. Character animation is procedural and limited. Some UI options are foundational rather than deeply simulated. External Google Fonts are optional and fall back to system fonts.

## Verification notes

Source files and deployment configuration are included. Run `npm install` and `npm run build` locally or let GitHub Actions build it. Browser interaction has not been manually tested in this environment; do not treat the feature list as a claim that every edge case has been verified.
