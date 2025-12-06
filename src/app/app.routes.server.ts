import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'events/:id',
    renderMode: RenderMode.Server, //Render on demand, not at build time
  },
  {
    path: '**',
    renderMode: RenderMode.Server, //All other routes use SSR
  },
];
