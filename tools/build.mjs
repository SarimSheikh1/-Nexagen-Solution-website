import {mkdir,copyFile,writeFile,readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {dirname} from 'node:path';
const context={window:{}};vm.runInNewContext(await readFile('content.js','utf8'),context);
await mkdir('dist/assets',{recursive:true});
for(const file of ['index.html','style.css','script.js','content.js','robots.txt','sitemap.xml'])await copyFile(file,`dist/${file}`);
const data=context.window.NEXAGEN_CONTENT;
const assets=new Set(['assets/fonts/InterVariable.woff2','assets/fonts/Inter-LICENSE.txt','assets/nexagen-logo.png','assets/nexagen-logo-sharp.png','assets/nexagen-logo-clear-v2.png','assets/it company-no-bg.svg',...data.partners.map(p=>p.photo),...data.logos.flatMap(l=>[l.image,l.imageRetina].filter(Boolean).map(decodeURIComponent))]);
for(const asset of assets){await mkdir(dirname(`dist/${asset}`),{recursive:true});await copyFile(asset,`dist/${asset}`);}
await writeFile('dist/.nojekyll','');
console.log(`Built static site in dist/ with ${assets.size} referenced assets. Original reference files excluded.`);



