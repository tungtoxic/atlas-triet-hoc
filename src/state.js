import { chapters, socialFactors, bagItems, labourScenes, reforms, valueCards } from './data/journey.js';
import { nodes } from './data/atlas.js';

export const STORAGE_KEY = 'philosophy-studio:v1';
export const initialState = () => ({ chapter:0, completed:[], social:[], history:0, bag:[], workAnswers:{}, reforms:[], liberationAnswer:null, dialectic:null, masses:null, vietnam:[], values:[], notes:[], favorites:[] });
const ids = list => list.map(x=>x.id);
const cleanList = (value, allowed, limit=allowed.length) => Array.isArray(value) ? [...new Set(value.filter(x=>allowed.includes(x)))].slice(0,limit) : [];

export function normalizeState(value) {
  const s=initialState();
  if(!value || typeof value!=='object' || Array.isArray(value)) return s;
  const integer=(x,max)=>Number.isInteger(x)&&x>=0&&x<=max;
  s.chapter=integer(value.chapter,chapters.length-1)?value.chapter:0;
  s.history=integer(value.history,3)?value.history:0;
  s.completed=cleanList(value.completed,ids(chapters));
  for(const [key,list] of Object.entries({social:socialFactors,bag:bagItems,reforms,values:valueCards,favorites:nodes})) s[key]=cleanList(value[key],ids(list),key==='values'?3:list.length);
  s.vietnam=cleanList(value.vietnam,['goal','agency','development']);
  for(const scene of labourScenes) if(integer(value.workAnswers?.[scene.id],scene.choices.length-1)) s.workAnswers[scene.id]=value.workAnswers[scene.id];
  for(const key of ['liberationAnswer','dialectic','masses']) s[key]=integer(value[key],key==='masses'?3:2)?value[key]:null;
  s.notes=Array.isArray(value.notes)?value.notes.filter(n=>n&&typeof n.id==='string'&&typeof n.text==='string'&&typeof n.title==='string').slice(-100).map(n=>({id:n.id.slice(0,100),text:n.text.slice(0,4000),title:n.title.slice(0,150),createdAt:typeof n.createdAt==='string'?n.createdAt:''})):[];
  return s;
}

export function loadState(storage) {
  try { return normalizeState(JSON.parse(storage.getItem(STORAGE_KEY))); } catch { return initialState(); }
}
export function reducer(state,action) {
  if(action.type==='set') return normalizeState({...state,[action.key]:action.value});
  if(action.type==='toggle') {
    const list=state[action.key];
    if(!Array.isArray(list)) return state;
    if(action.key==='values'&&!list.includes(action.id)&&list.length>=3) return state;
    return normalizeState({...state,[action.key]:list.includes(action.id)?list.filter(x=>x!==action.id):[...list,action.id]});
  }
  if(action.type==='complete') return normalizeState({...state,completed:[...state.completed,chapters[state.chapter].id]});
  if(action.type==='replay') return {...initialState(),favorites:state.favorites,notes:state.notes};
  if(action.type==='reset') return initialState();
  return state;
}

export function notebookMarkdown(state) {
  const favorites=nodes.filter(n=>state.favorites.includes(n.id));
  return '# Sổ tay triết học\n\n'+state.notes.map(n=>`## ${n.title}\n\n${n.text}\n`).join('\n')+'\n## Mốc đã lưu\n\n'+favorites.map(n=>`- ${n.title}: ${n.idea}\n  Nguồn: ${n.source}`).join('\n')+'\n';
}
