import fs from 'node:fs';
import { safe, stat, HarnessError } from './files.js';
export const CLAUDE_START = '<!-- ai-harness:claude:start -->';
export const CLAUDE_END = '<!-- ai-harness:claude:end -->';
export const CLAUDE_IMPORT = Buffer.from(CLAUDE_START + '\n@AGENTS.md\n' + CLAUDE_END);
export function claudeBlock(data) {
  const a=data.indexOf(CLAUDE_START), b=data.indexOf(CLAUDE_END);
  if(a===-1 && b===-1)return null;
  if(a===-1 || b<a || data.indexOf(CLAUDE_START,a+CLAUDE_START.length)!==-1 || data.indexOf(CLAUDE_END,b+CLAUDE_END.length)!==-1)
    throw new HarnessError('CLAUDE.md has invalid Harness markers');
  return data.subarray(a,b+CLAUDE_END.length);
}
function activeText(text) {
  return text.replace(/^[ \t]*(\x60{3,}|~{3,})[^\r\n]*\r?\n[\s\S]*?^[ \t]*\1[ \t]*(?:\r?\n|$)/gm,'')
    .replace(/\x60[^\x60\r\n]*\x60/g,'').replace(/<!--[\s\S]*?-->/g,'');
}
export function hasAgentsImport(text, nested=false) {
  return new RegExp('(?:^|\\s)@' + (nested ? '\\.\\./' : '(?:\\./)?') + 'AGENTS\\.md(?=\\s|$)').test(activeText(text));
}
export function linkClaude(existing) {
  const block=claudeBlock(existing);
  if(block){if(block.toString().replaceAll('\r\n','\n')!==CLAUDE_IMPORT.toString())throw new HarnessError('CLAUDE managed import differs; reconcile before linking');return existing;}
  if(hasAgentsImport(existing.toString('utf8')))return existing;
  const newline=existing.includes(Buffer.from('\r\n'))?'\r\n':'\n';
  const separator=existing.length?(existing.at(-1)===10?newline:newline+newline):'';
  return Buffer.concat([existing,Buffer.from(separator),Buffer.from(CLAUDE_IMPORT.toString().replaceAll('\n',newline)+newline)]);
}
export function claudeReport(root) {
  const files=[];
  for(const name of ['CLAUDE.md','CLAUDE.local.md','.claude/CLAUDE.md']){
    const p=safe(root,name),info=stat(p);if(!info)continue;
    if(info.size>1024*1024)throw new HarnessError('Claude instruction file exceeds 1 MiB: '+name);
    const body=fs.readFileSync(p,'utf8');
    files.push({path:name,imports_agents:hasAgentsImport(body,name.startsWith('.claude/'))});
  }
  const linked=files.some(f=>f.imports_agents);
  return {status:files.length&&!linked?'warning':'unverified',files,
    warnings:files.length&&!linked?['Claude instructions may shadow AGENTS.md. Review actual version/settings; opt in to init/update --link-claude or configure the host to load both.']:[],
    note:'Local import inspection only. Ancestor/global files, host version/plugin/settings and actual instruction loading are unverified; confirm with Claude /context. No native settings are changed.'};
}
