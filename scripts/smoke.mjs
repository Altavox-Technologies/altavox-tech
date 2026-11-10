const baseUrl = process.env.BASE_URL?.replace(/\/$/, '');

if (!baseUrl) {
  console.error('BASE_URL is required, for example https://preview.example.com');
  process.exit(2);
}

const paths = ['/', '/solutions', '/projects', '/start-project', '/privacy'];
const failures = [];

for (const path of paths) {
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'Altavox-Deployment-Smoke/1.0' },
    });
    const contentType = response.headers.get('content-type') ?? '';
    const okay = response.status === 200 && contentType.includes('text/html');
    console.log(`${okay ? 'PASS' : 'FAIL'} ${response.status} ${url.pathname} (${contentType || 'no content-type'})`);
    if (!okay) failures.push(`${url.pathname}: HTTP ${response.status}`);
  } catch (error) {
    console.error(`FAIL ${url.pathname}: ${error instanceof Error ? error.message : String(error)}`);
    failures.push(`${url.pathname}: request failed`);
  }
}

if (failures.length) {
  console.error(`Smoke check failed for ${failures.length} route(s): ${failures.join('; ')}`);
  process.exit(1);
}

console.log(`All ${paths.length} route checks passed for ${baseUrl}`);
