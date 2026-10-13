import { isObject, HarnessError } from './files.js';
import { redacted } from './verification-report.js';
const tasks=['spring-api','transaction-defect','maven-onboarding'];
const metrics=['human_correction_rounds','unnecessary_questions','accepted_criteria','total_criteria','elapsed_seconds','tokens','cost'];
const requireThat=(v,m)=>{if(!v)throw new HarnessError('Invalid real-task comparison: '+m);};
export function comparisonTemplate(){
 return {schema_version:1,status:'unperformed',metadata:{model:null,runtime:null,harness_commit:null,starting_commit:null,budget:null},tasks,
   runs:tasks.flatMap(task=>['without-harness','with-harness'].flatMap(condition=>[1,2,3].map(repeat=>({task_id:task,condition,repeat,status:'UNPERFORMED',evidence:[],usage_source:null,currency:null,...Object.fromEntries(metrics.map(m=>[m,null]))}))))};
}
function distribution(values) {
 if(!values.length)return {observed_runs:0,median:null,min:null,max:null};
 const sorted=[...values].sort((a,b)=>a-b),i=Math.floor(sorted.length/2);
 return {observed_runs:values.length,median:sorted.length%2?sorted[i]:(sorted[i-1]+sorted[i])/2,min:sorted[0],max:sorted.at(-1)};
}
export function summarizeComparison(report){
 requireThat(isObject(report)&&report.schema_version===1&&isObject(report.metadata),'schema');redacted(report);
 requireThat(Array.isArray(report.tasks)&&report.tasks.length===3&&new Set(report.tasks).size===3&&report.tasks.every(t=>typeof t==='string'&&/^[a-z][a-z0-9-]*$/.test(t)),'three unique task IDs');
 requireThat(Array.isArray(report.runs)&&report.runs.length===18,'18 independent run slots');
 const ids=new Set();
 for(const row of report.runs){
  requireThat(isObject(row)&&report.tasks.includes(row.task_id)&&['with-harness','without-harness'].includes(row.condition)&&[1,2,3].includes(row.repeat),'task/condition/repeat');
  const id=row.task_id+'/'+row.condition+'/'+row.repeat;requireThat(!ids.has(id),'duplicate run');ids.add(id);
  requireThat(['UNPERFORMED','COMPLETED','FAILED','INTERRUPTED','BLOCKED'].includes(row.status),'status');
  requireThat(Array.isArray(row.evidence)&&row.evidence.every(v=>typeof v==='string'&&v.trim()&&!/[\0\r\n]/.test(v)),'evidence');
  if(row.status!=='UNPERFORMED')requireThat(row.evidence.length>0,'observed run needs evidence');
  for(const m of metrics){requireThat(row[m]===null||(typeof row[m]==='number'&&Number.isFinite(row[m])&&row[m]>=0),'metric '+m);
    if(['human_correction_rounds','unnecessary_questions','accepted_criteria','total_criteria','tokens'].includes(m)&&row[m]!==null)requireThat(Number.isSafeInteger(row[m]),'integer metric '+m);
  }
  if(row.status==='UNPERFORMED')requireThat(metrics.every(m=>row[m]===null),'unperformed metrics must stay null');
  if(row.accepted_criteria!==null)requireThat(row.total_criteria!==null&&row.accepted_criteria<=row.total_criteria,'accepted/total criteria');
  if(row.tokens!==null||row.cost!==null)requireThat(typeof row.usage_source==='string'&&row.usage_source.trim(),'actual usage source');
  if(row.cost!==null)requireThat(typeof row.currency==='string'&&row.currency.trim(),'cost currency');
 }
 const currencies=new Set(report.runs.filter(r=>r.cost!==null).map(r=>r.currency));
 requireThat(currencies.size<=1,'mixed cost currencies');
 for(const task of report.tasks)requireThat(new Set(report.runs.filter(r=>r.task_id===task&&r.total_criteria!==null).map(r=>r.total_criteria)).size<=1,'inconsistent acceptance totals');
 const observed=report.runs.some(r=>r.status!=='UNPERFORMED');
 if(observed)for(const key of ['model','runtime','harness_commit','starting_commit'])requireThat(typeof report.metadata[key]==='string'&&report.metadata[key].trim(),'metadata '+key);
 const summaries=report.tasks.flatMap(task=>['without-harness','with-harness'].map(condition=>{
  const rows=report.runs.filter(r=>r.task_id===task&&r.condition===condition);
  return {task_id:task,condition,statuses:Object.fromEntries(['UNPERFORMED','COMPLETED','FAILED','INTERRUPTED','BLOCKED'].map(s=>[s,rows.filter(r=>r.status===s).length])),
    metrics:Object.fromEntries(metrics.map(m=>[m,distribution(rows.map(r=>r[m]).filter(v=>v!==null))]))};
 }));
 return {status:'ok',executed:false,observed_runs:report.runs.filter(r=>r.status!=='UNPERFORMED').length,summaries,
  note:'Summarizes manually supplied observations only. Null is unknown, not zero. Retain all failures/interruptions; independently review evidence, equal acceptance criteria and matching model/task/budget. No productivity claim or model execution is inferred.'};
}
