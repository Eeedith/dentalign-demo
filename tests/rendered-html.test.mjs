import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the DentAlign application shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /DentAlign/);
  assert.match(html, /Patient Home/);
  assert.match(html, /12-screen system/);
  assert.match(html, /PT-01/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the interactive demo and static export wired", async () => {
  const [page, css, packageJson, staticEntry] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../static-app/main.tsx", import.meta.url), "utf8"),
  ]);

  for (const id of ["PT-01", "PT-02", "PT-03", "PT-04", "PT-05", "PT-06", "DR-01", "DR-02", "DR-03", "DR-04", "DR-05", "DR-06"]) {
    assert.match(page, new RegExp(id));
  }

  assert.match(page, /dentalign-demo-state-v1/);
  assert.match(page, /guideSteps/);
  assert.match(css, /\.guide-overlay/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(packageJson, /"build:pages"/);
  assert.match(staticEntry, /<Home \/>/);
});
