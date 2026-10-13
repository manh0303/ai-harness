import fs from 'node:fs';
import path from 'node:path';
import { safe, stat, HarnessError } from './files.js';

// A bounded metadata reader, not an XML runtime. No entities, interpolation or parent traversal.
export function mavenModules(root) {
  const files=[],warnings=[],visited=new Set();let total=0;
  function visit(file,depth){
    if(visited.has(file))return;visited.add(file);
    if(visited.size>64)throw new HarnessError('Maven discovery exceeds 64 POM files');
    const p=safe(root,file),info=stat(p);if(!info){if(depth>0)warnings.push({file,reason:'Declared POM is missing'});return;}
    if(info.size>1024*1024)throw new HarnessError('Maven POM exceeds 1 MiB: '+file);
    total+=info.size;if(total>4*1024*1024)throw new HarnessError('Maven discovery exceeds 4 MiB total');
    const body=fs.readFileSync(p,'utf8').replace(/<!--[\s\S]*?-->/g,'');
    if(/<!DOCTYPE|<!ENTITY|<!\[CDATA\[/i.test(body))throw new HarnessError('Unsupported XML declarations in '+file);
    files.push({file,body,depth});
    if(depth>=2){if(/<(?:[\w.-]+:)?modules\b/.test(body))warnings.push({file,reason:'Depth limit reached; deeper modules not scanned'});return;}
    for(const section of body.matchAll(/<(?:[\w.-]+:)?modules\b[^>]*>([\s\S]*?)<\/(?:[\w.-]+:)?modules\s*>/g)){
      for(const item of section[1].matchAll(/<(?:[\w.-]+:)?module\b[^>]*>([^<]*)<\/(?:[\w.-]+:)?module\s*>/g)){
        const value=item[1].trim();
        if(!value || /[$&\\]/.test(value) || value.split('/').some(x=>x==='..'||x==='.') || value.startsWith('/'))
          throw new HarnessError('Unsupported or unsafe Maven module path in '+file);
        const child=path.posix.join(path.posix.dirname(file),value,'pom.xml');safe(root,child);visit(child,depth+1);
      }
    }
  }
  visit('pom.xml',0);return {files,warnings};
}
