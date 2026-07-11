# GitHub Actions deployment

Production deployment is configured in `.github/workflows/deploy.yml`.

The workflow runs the Astro type check and production build, uploads `dist/`
to Namecheap over SSH and verifies the live homepage, editorial policy and
Herbal Medicine service page.

## One-time Namecheap step

The deployment is intentionally disabled until its public key is authorized.

1. Sign in to Namecheap cPanel.
2. Open **Security > SSH Access**.
3. Choose **Manage SSH Keys**.
4. Import the RSA public key with a name such as `gh_rsa` using the
   contents of `docs/namecheap-github-actions.pub`.
5. Return to **Manage SSH Keys**, select the imported key and choose
   **Authorize**.

The public key is safe to copy. Do not place a private key or hosting password
in an issue, commit or chat message.

After the key is authorized, set the repository variable
`NAMECHEAP_DEPLOY_ENABLED` to `true` and run the **Deploy production site**
workflow manually once. Future pushes to `main` will then deploy automatically.

## GitHub configuration

The repository uses these Actions values:

- Secret `NAMECHEAP_SSH_PRIVATE_KEY`
- Secret `NAMECHEAP_KNOWN_HOSTS`
- Variable `PUBLIC_TURNSTILE_SITE_KEY`
- Variable `NAMECHEAP_DEPLOY_ENABLED`

The deployment environment is named `production`. Resend and Turnstile secret
keys remain on the Namecheap server outside `public_html` and are not stored in
GitHub.
