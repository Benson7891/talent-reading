import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/client/assets', { recursive: true });
await mkdir('dist/.openai', { recursive: true });

for (const file of ['index.html', 'styles.css', 'shop.css', 'talent-report.css', 'phase-two.css', 'mystic-wheel.css', 'wheel-tuning.css', 'naming.css', 'typography-tuning.css', 'wuxing.css', 'talent-detail.css', 'report-export.css', 'app.js', 'talent-detail.js', 'report-export.js', 'talent-engine.js', 'naming.js', 'layout.js']) {
  await cp(file, `dist/client/${file}`);
}
await cp('assets/cultural-products.png', 'dist/client/assets/cultural-products.png');
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');

await writeFile('dist/server/index.js', `export default {
  async fetch(request, env) {
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }
    return new Response('Site assets are unavailable.', { status: 503 });
  }
};\n`);
