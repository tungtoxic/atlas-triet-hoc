import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes,edges,filterNodes } from '../src/data/atlas.js';
import { initialState,loadState,normalizeState,reducer,notebookMarkdown } from '../src/state.js';

test('Atlas IDs are unique and every relation points to a real milestone',()=>{
  const ids=new Set(nodes.map(n=>n.id));assert.equal(ids.size,nodes.length);assert.equal(nodes.length,46);assert.equal(edges.length,68);
  for(const e of edges){assert.ok(ids.has(e.from));assert.ok(ids.has(e.to));assert.notEqual(e.from,e.to);}
  for(const n of nodes){assert.ok(n.start<=n.end);assert.match(n.source,/^https:\/\//);}
});
test('Period filtering retains thinkers whose life overlaps two eras',()=>{
  assert.ok(filterNodes({era:'early'}).some(n=>n.id==='kant'));
  assert.ok(filterNodes({era:'nineteenth'}).some(n=>n.id==='kant'));
  assert.ok(filterNodes({region:'china'}).every(n=>n.region==='china'));
});
test('Corrupted or unavailable browser storage does not prevent learning',()=>{
  assert.deepEqual(loadState({getItem:()=>'{invalid'}),initialState());
  assert.deepEqual(loadState({getItem:()=>{throw Error('blocked')}}),initialState());
});
test('Saved state discards stale IDs, invalid indices and excess value selections',()=>{
  const s=normalizeState({chapter:500,history:-1,social:['family','family','ghost'],bag:['pressure-work','ghost'],values:['learning','creativity','ethics','community'],workAnswers:{product:100,activity:1},completed:['opening','opening','ghost'],notes:[{id:'a',text:'hello',title:'Note'},null],favorites:['marx','ghost']});
  assert.equal(s.chapter,0);assert.equal(s.history,0);assert.deepEqual(s.social,['family']);assert.equal(s.values.length,3);assert.deepEqual(s.workAnswers,{activity:1});assert.deepEqual(s.completed,['opening']);assert.equal(s.notes.length,1);assert.deepEqual(s.favorites,['marx']);
});
test('Replay resets learning choices while keeping the notebook and saved milestones',()=>{
  const s=normalizeState({...initialState(),chapter:9,values:['learning'],notes:[{id:'1',text:'My note',title:'Reflection'}],favorites:['marx']});
  const next=reducer(s,{type:'replay'});assert.equal(next.chapter,0);assert.equal(next.values.length,0);assert.equal(next.notes.length,1);assert.deepEqual(next.favorites,['marx']);
});
test('Notebook export includes the user notes and primary reading links',()=>{
  const s=normalizeState({notes:[{id:'1',title:'My reflection',text:'Study with peers'}],favorites:['marx']});
  const md=notebookMarkdown(s);assert.ok(md.includes('Study with peers'));assert.ok(md.includes('Karl Marx')||md.includes('Marx'));assert.ok(md.includes('https://'));
});
