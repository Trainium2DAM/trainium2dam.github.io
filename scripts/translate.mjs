import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';
import { batchTranslate } from 'google-translate-api-x';

const LOCALES = ['en', 'ca', 'va', 'fr', 'ary', 'eu', 'gl', 'de', 'pt', 'ru'];
const ROOT = join(import.meta.dirname, '..');
const I18N_DIR = join(ROOT, 'i18n');
const DOCS_SRC = join(ROOT, 'docs');

function localeToApi(locale) {
  const map = { en: 'en', ca: 'ca', va: 'ca', fr: 'fr', ary: 'ar', eu: 'eu', gl: 'gl', de: 'de', pt: 'pt', ru: 'ru' };
  return map[locale] || locale;
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function copyImages() {
  const imgDirs = [];
  function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name === 'img') imgDirs.push(join(dir, e.name));
      else if (e.isDirectory()) walk(join(dir, e.name));
    }
  }
  walk(DOCS_SRC);
  for (const srcDir of imgDirs) {
    const relPath = srcDir.slice(DOCS_SRC.length + 1);
    for (const loc of LOCALES) {
      const dst = join(I18N_DIR, loc, 'docusaurus-plugin-content-docs', 'current', relPath);
      if (!existsSync(dst)) {
        ensureDir(dirname(dst));
        cpSync(srcDir, dst, { recursive: true });
      }
    }
  }
  console.log('  ✓ images copied');
}

function getAllMdFiles(dir) {
  const result = [];
  function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md') || e.name.endsWith('.mdx')) result.push(p);
    }
  }
  walk(dir);
  return result;
}

function protectMdx(text) {
  let t = text;
  const codeBlocks = [];
  t = t.replace(/```[\s\S]*?```/g, m => { const p = `__CB_${codeBlocks.length}__`; codeBlocks.push(p, m); return p; });
  const inlineCodes = [];
  t = t.replace(/`[^`]+`/g, m => { const p = `__IC_${inlineCodes.length}__`; inlineCodes.push(p, m); return p; });
  const images = [];
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, url) => { const p = `__IMG_${images.length}__`; images.push(p, alt, url); return p; });
  const links = [];
  t = t.replace(/\[([^\]]*)\]\(\/([^)]+)\)/g, (_m, txt, url) => { const p = `__LK_${links.length}__`; links.push(p, txt, url); return p; });
  return { text: t, images, links, inlineCodes, codeBlocks };
}

function restoreMdx(t, { images, links, inlineCodes, codeBlocks }) {
  let r = t;
  for (let i = links.length - 3; i >= 0; i -= 3) {
    r = r.replace(links[i], `[${links[i+1]}](/${links[i+2]})`);
  }
  for (let i = images.length - 3; i >= 0; i -= 3) {
    r = r.replace(images[i], `![${images[i+1]}](${images[i+2]})`);
  }
  for (let i = inlineCodes.length - 2; i >= 0; i -= 2) {
    r = r.replace(inlineCodes[i], inlineCodes[i+1]);
  }
  for (let i = codeBlocks.length - 2; i >= 0; i -= 2) {
    r = r.replace(codeBlocks[i], codeBlocks[i+1]);
  }
  return r;
}

async function translateTexts(texts, apiLang) {
  if (apiLang === 'en') return texts;
  if (!texts || !texts.length) return texts;
  try {
    const r = await batchTranslate(texts, { to: apiLang });
    return r.map(x => x.text);
  } catch { return texts; }
}

function protectVars(text) {
  let t = text;
  const vars = [];
  t = t.replace(/\{(\w+)\}/g, m => { const p = `__VAR_${vars.length}__`; vars.push(p, m); return p; });
  return { text: t, vars };
}

function restoreVars(t, { vars }) {
  let r = t;
  for (let i = vars.length - 2; i >= 0; i -= 2) {
    r = r.replaceAll(vars[i], vars[i+1]);
  }
  return r;
}

async function translateCodeJson(locale, apiLang) {
  const src = join(I18N_DIR, 'en');
  const dst = join(I18N_DIR, locale);
  const files = ['code.json', 'docusaurus-theme-classic/navbar.json', 'docusaurus-theme-classic/footer.json', 'docusaurus-plugin-content-docs/current.json'];
  for (const f of files) {
    const sp = join(src, f);
    if (!existsSync(sp)) continue;
    const data = JSON.parse(readFileSync(sp, 'utf-8'));
    const keys = Object.keys(data);
    const guarded = keys.map(k => protectVars(data[k].message));
    const msgs = guarded.map(p => p.text);
    const translated = await translateTexts(msgs, apiLang);
    const out = {};
    keys.forEach((k, i) => { out[k] = { message: restoreVars(translated[i] || data[k].message, guarded[i]), description: data[k].description }; });
    const dp = join(dst, f);
    ensureDir(dirname(dp));
    writeFileSync(dp, JSON.stringify(out, null, 2) + '\n', 'utf-8');
  }
  console.log(`  ✓ ${locale} UI`);
}

async function translateDoc(srcPath, dstPath, apiLang) {
  if (existsSync(dstPath)) return false;
  const content = readFileSync(srcPath, 'utf-8');
  const lines = content.split('\n');

  let fmEnd = -1;
  if (lines[0]?.trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === '---') { fmEnd = i; break; }
    }
  }

  let frontmatterLines = [];
  let bodyLines = [];

  if (fmEnd > 0) {
    frontmatterLines = lines.slice(0, fmEnd + 1);
    bodyLines = lines.slice(fmEnd + 1);
  } else {
    bodyLines = lines;
  }

  const body = bodyLines.join('\n');
  const { text: plain, ...protectedData } = protectMdx(body);
  const paragraphs = plain.split(/\n\n+/);
  const translated = await translateTexts(paragraphs, apiLang);
  const newBody = restoreMdx(translated.join('\n\n'), protectedData);

  const result = frontmatterLines.length > 0
    ? frontmatterLines.join('\n') + '\n' + newBody
    : newBody;

  ensureDir(dirname(dstPath));
  writeFileSync(dstPath, result, 'utf-8');
  return true;
}

async function translateDocs(locale, apiLang) {
  const rel = join('docusaurus-plugin-content-docs', 'current');
  const dstBase = join(I18N_DIR, locale, rel);
  const files = getAllMdFiles(DOCS_SRC);
  let count = 0;
  for (const fp of files) {
    const relPath = fp.slice(DOCS_SRC.length + 1);
    const dstPath = join(dstBase, relPath);
    const ok = await translateDoc(fp, dstPath, apiLang);
    if (ok) { count++; console.log(`    [${locale}] ${relPath}`); }
  }
  console.log(`  ✓ ${locale} docs: ${count} files`);
}

async function main() {
  execSync(`npm run write-translations -- --locale en`, { cwd: ROOT, stdio: 'pipe' });
  console.log('Copying images...');
  copyImages();
  for (const locale of LOCALES) {
    console.log(`\n--- ${locale} ---`);
    await translateCodeJson(locale, localeToApi(locale));
    await translateDocs(locale, localeToApi(locale));
  }
  console.log('\n✓ All translations complete');
}

main().catch(console.error);
