import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight, Coins, Cpu, Factory, GraduationCap, Heart, House, Landmark, LockKeyhole, MessageCircle, Monitor, Palette, Sparkles, Sprout, Users, UserRound } from 'lucide-react';
import media from '../data/media.json';

const icons={house:House,graduation:GraduationCap,users:Users,briefcase:BriefcaseBusiness,coins:Coins,palette:Palette,landmark:Landmark,cpu:Cpu,sprout:Sprout,factory:Factory,monitor:Monitor,heart:Heart,book:BookOpen,message:MessageCircle,sparkles:Sparkles,lock:LockKeyhole,user:UserRound};
export function Icon({name,size=20,...props}) { const C=icons[name]||Sparkles; return <C size={size} strokeWidth={1.65} {...props}/>; }
export function Action({children,onClick,secondary=false,...props}) {return <button className={`action ${secondary?'secondary':''}`} onClick={onClick} {...props}>{children}<ArrowRight size={18}/></button>;}
export function Eyebrow({children}) {return <p className="eyebrow"><span/>{children}</p>;}
export function SourceLink({source}) {return source.url?<a className="source-link" href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={14}/></a>:<span className="source-link">{source.title}</span>;}
export function Feedback({children,correct=true}) {return <div className={`feedback ${correct?'positive':'reflect'}`} role="status"><span className="feedback-mark">{correct?<Check size={18}/>:<BookOpen size={18}/>}</span><div>{children}</div></div>;}
export function Choice({label,selected,onClick,disabled=false,letter}) {return <button className={`choice ${selected?'selected':''}`} aria-pressed={selected} onClick={onClick} disabled={disabled}>{letter&&<span className="choice-letter">{letter}</span>}<span>{label}</span>{selected?<Check size={18}/>:<ChevronRight size={17}/>}</button>;}

export function Portrait({id,className=''}) {
  const asset=media[id];
  if(!asset) return null;
  return <figure className={`portrait ${className}`}><img src={`${import.meta.env.BASE_URL}${asset.path}`} alt={asset.label} loading="lazy"/><figcaption>{asset.label}<a href={asset.source} target="_blank" rel="noreferrer" aria-label={`Nguồn ảnh ${asset.label}`}><ArrowUpRight size={12}/></a></figcaption></figure>;
}

export function Person({burden=0,liberated=false,className=''}) {
  return <svg className={`person-art ${className}`} viewBox="0 0 280 350" role="img" aria-label={liberated?'Nhân vật có không gian phát triển rộng hơn':burden?'Nhân vật mang ba lô áp lực, minh họa':'Nhân vật đại diện cho con người, minh họa'}>
    <ellipse cx="140" cy="319" rx="88" ry="13" fill="currentColor" opacity=".08"/>
    <motion.g animate={{rotate:burden*2.4,y:burden*1.5}} style={{transformOrigin:'140px 300px'}}>
      {burden>0&&<g><rect x="161" y="125" width={42+burden*4} height={68+burden*5} rx="19" fill="#c49161"/><path d="M167 136q-29 4-37 39" fill="none" stroke="#886443" strokeWidth="7"/></g>}
      <path d="M109 211l-8 98h33l7-91 10 91h34l-17-102" fill="#244844"/>
      <path d="M104 312h32v10H94q-4-10 10-10M152 312h31l14 10h-46z" fill="#1e302e"/>
      <path d="M109 116q30-15 58 0l20 103q-45 17-89 0z" fill={liberated?'#e4bf69':'#a5c7b5'}/>
      <path d="M111 126l-24 64 11 32M167 126l26 62-8 29" fill="none" stroke="#a5c7b5" strokeWidth="22" strokeLinecap="round"/>
      <path d="M98 217l4 18M185 214l-6 18" stroke="#c58e6a" strokeWidth="13" strokeLinecap="round"/>
      <rect x="128" y="92" width="23" height="32" rx="8" fill="#c58e6a"/>
      <ellipse cx="139" cy="72" rx="32" ry="39" fill="#d5a382"/>
      <path d="M108 76q-11-43 27-48 34-6 39 34-26-3-42-13-4 25-24 27" fill="#273f38"/>
      <path d="M126 83h5m20 0h5" stroke="#39403a" strokeWidth="3" strokeLinecap="round"/>
      <path d="M132 97q8 5 15 0" fill="none" stroke="#9e634a" strokeWidth="2"/>
      <path d="M116 115l20 31 21-31" fill="none" stroke="#edf1df" strokeWidth="7"/>
    </motion.g>
    {liberated&&<g fill="#c3a154"><path d="M53 71l4 11 11 4-11 4-4 11-4-11-11-4 11-4z"/><path d="M221 143l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>}
  </svg>;
}
