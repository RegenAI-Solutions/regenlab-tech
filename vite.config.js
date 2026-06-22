import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The DayCent API portal is a separate, pre-built static SPA living in
// `public/app/` and served at `/app/`. In the dev server, a bare request to
// `/app/` would otherwise hit Vite's SPA history-fallback and return the MAIN
// app's index.html (which then redirects to `#/vn`). This middleware rewrites
// the directory request to the portal's own index.html so the portal loads.
// (In `vite preview` / production static hosting, `/app/` resolves to
// `public/app/index.html` automatically, so this is dev-only.)
function servePortalInDev() {
  return {
    name: 'serve-portal-in-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = (req.url || '').split('?')[0]
        if (path === '/app' || path === '/app/') {
          req.url = '/app/index.html'
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), servePortalInDev()],
  base: '/',
})
