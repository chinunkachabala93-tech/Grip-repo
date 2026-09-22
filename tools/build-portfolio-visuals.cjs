// Deterministic presentation layouts: source CAD PNGs and the logo are embedded unchanged.
// Usage: node tools/build-portfolio-visuals.cjs (requires sharp; no network or AI call).
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'sharp') : 'sharp');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets/visuals');
const ink = '#111918', yellow = '#ffe600', paper = '#efeee8', grey = '#aebbb5';
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const sources = new Map();
let cropNumber = 0;
async function imageURI(file) {
  if (!sources.has(file)) sources.set(file, 'data:image/' + (file.endsWith('.jpg') ? 'jpeg' : 'png') + ';base64,' + (await fs.readFile(path.join(root,file))).toString('base64'));
  return sources.get(file);
}
const rect = (x,y,w,h,fill,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const text = (x,y,t,size=28,fill=ink,weight=400,extra='') => `<text x="${x}" y="${y}" font-family="DejaVu Sans, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${escape(t)}</text>`;
const line = (x1,y1,x2,y2,color='#bfc6bf',width=1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
async function logo(x,y,w=108) {
  return `<image x="${x}" y="${y}" width="${w}" height="${w*820/720}" href="${await imageURI('assets/brand/mac-key-grip-logo.jpg')}" preserveAspectRatio="xMidYMid meet"/>`;
}
async function crop(file,x,y,w,h,region) {
  const [cx,cy,cw,ch]=region;
  const clip = 'crop-'+(++cropNumber);
  return rect(x,y,w,h,'#fff')+`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${cx} ${cy} ${cw} ${ch}" preserveAspectRatio="xMidYMid meet" overflow="hidden"><defs><clipPath id="${clip}"><rect x="${cx}" y="${cy}" width="${cw}" height="${ch}"/></clipPath></defs><image x="0" y="0" width="1600" height="1280" clip-path="url(#${clip})" href="${await imageURI('assets/projects/'+file+'.png')}"/></svg>`;
}
const wrap=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>Mac Key Grip Engineering — genuine CAD portfolio presentation</title>${body}</svg>`;
async function save(name,w,h,body,web=true) {
  const svg=wrap(w,h,body);
  await fs.writeFile(path.join(out,name+'.svg'),svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(out,name+'.png'));
  if(web) await sharp(Buffer.from(svg)).resize({width:1600,withoutEnlargement:true}).webp({quality:91}).toFile(path.join(out,name+'.webp'));
}
const projects=[
 {slug:'thirteen-miles',n:'01',title:'13 Miles',sub:'Building & site services',tag:'HVAC / WATER / SEWER',file:'thirteen-miles-hvac',region:[35,150,1310,385],detail:'thirteen-miles-external-water',detailRegion:[25,110,515,310],detailTitle:'Tank & pump connections',count:'FIVE DRAWING SHEETS'},
 {slug:'estate-water-fire',n:'02',title:'Ovacado Estate',sub:'Water & fire services',tag:'NETWORKS / STORAGE / TREATMENT',file:'estate-water-fire',region:[470,135,870,700],detail:'estate-water-treatment',detailRegion:[25,170,665,565],detailTitle:'Storage & filtration',count:'TWO DRAWING SHEETS'},
 {slug:'chililabombwe-fuel',n:'03',title:'Chililabombwe',sub:'Fuel-station layout',tag:'TANKS / DISPENSERS / PIPEWORK',file:'chililabombwe-fuel',region:[410,120,650,615],detail:'chililabombwe-fuel',detailRegion:[1045,515,335,470],detailTitle:'Tank farm & chambers',count:'ONE DRAWING SHEET'},
 {slug:'apartments-hvac',n:'04',title:'Apartment HVAC',sub:'Equipment & air distribution',tag:'COOLING / DUCTWORK / EXTRACTION',file:'apartments-hvac',region:[110,160,1210,625],detail:'apartments-hvac',detailRegion:[975,750,185,190],detailTitle:'Installation detail',count:'ONE DRAWING SHEET'},
 {slug:'office-hvac',n:'05',title:'Office HVAC',sub:'Layouts & equipment schedules',tag:'AIR-CONDITIONING / VENTILATION',file:'office-hvac',region:[400,175,580,920],detail:'office-hvac',detailRegion:[32,200,290,735],detailTitle:'Equipment schedules',count:'ONE DRAWING SHEET'}
];
async function cover(p) {
  let b=rect(0,0,1920,1200,paper)+rect(0,0,1920,255,ink)+rect(60,52,54,6,yellow);
  b+=text(136,64,'MAC KEY GRIP / DRAWING PORTFOLIO',23,grey,600,'letter-spacing="3"');
  b+=text(60,150,p.title,66,'#fff',700)+text(63,209,p.sub,29,'#d6ded8');
  b+=await logo(1730,42,112);
  b+=text(65,300,p.tag,21,ink,700,'letter-spacing="2"');
  b+=text(1810,300,p.n,26,ink,700);
  b+=await crop(p.file,60,327,1210,720,p.region);
  b+=await crop(p.detail,1300,327,560,485,p.detailRegion);
  b+=line(1300,847,1860,847,ink,2)+text(1300,891,p.detailTitle,27,ink,700);
  b+=text(1300,940,p.count,19,'#515d57',600,'letter-spacing="2"');
  b+=text(1300,990,'Original CAD excerpts.',22)+text(1300,1024,'Full sheet available in the portfolio.',20);
  b+=rect(0,1090,1920,110,ink)+rect(60,1120,226,47,yellow)+text(80,1152,'CAD DRAWING',23,ink,700);
  b+=text(320,1150,'Source linework retained · Presentation crop',22,'#cdd6cf');
  b+=text(1460,1150,'mackeygrip.github.io',22,'#fff');
  await save('covers/'+p.slug,1920,1200,b);
}
async function board(which) {
  const hvac=which==='hvac';
  const a=hvac?'apartments-hvac':'estate-water-fire', second=hvac?'office-hvac':'estate-water-treatment';
  let b=rect(0,0,2400,1600,paper)+rect(0,0,2400,290,ink)+rect(72,48,56,6,yellow);
  b+=text(150,60,'MAC KEY GRIP ENGINEERING / TECHNICAL PORTFOLIO',25,grey,600,'letter-spacing="3"');
  b+=text(72,150,hvac?'Air-conditioning.':'Water infrastructure.',80,'#fff',700);
  b+=text(72,236,hvac?'Coordinated on the drawing.':'From network to plant.',65,yellow,600);
  b+=await logo(2160,56,140);
  b+=text(72,347,hvac?'01 / APARTMENT EQUIPMENT & AIR DISTRIBUTION':'01 / ESTATE WATER & FIRE-SERVICES NETWORK',25,ink,700);
  b+=await crop(a,72,380,1470,940,hvac?[110,160,1210,625]:[470,135,870,700]);
  b+=text(1600,347,hvac?'02 / OFFICE EQUIPMENT SCHEDULES':'02 / TANK & FILTRATION ARRANGEMENT',22,ink,700);
  b+=await crop(second,1600,380,725,500,hvac?[32,200,385,735]:[25,170,665,565]);
  b+=text(1600,944,hvac?'03 / INSTALLATION DETAIL':'03 / TANK ELEVATIONS',22,ink,700);
  b+=await crop(hvac?a:second,1600,975,725,345,hvac?[970,748,400,430]:[890,382,475,345]);
  b+=line(72,1365,2325,1365,ink,2);
  b+=text(72,1420,'GENUINE CAD / CURATED PRESENTATION',25,ink,700);
  b+=text(72,1470,'Source drawings supplied by Chinunka Chabala. Original sheet credits remain in the full-sheet portfolio.',23,'#4b5750');
  b+=text(72,1530,'Mac Key Grip Engineering · Lusaka, Zambia',24,ink,600)+text(1720,1530,'mackeygrip.github.io',25,ink,600);
  await save('boards/'+which+'-presentation',2400,1600,b);
}
async function annotated() {
  let b=rect(0,0,2400,1600,paper)+rect(0,0,2400,290,ink)+text(72,70,'MAC KEY GRIP / DRAWING EXPLAINED',26,yellow,700);
  b+=text(72,165,'Reading the HVAC layout.',76,'#fff',700)+text(72,235,'Four visual cues from the original apartment drawing.',31,'#cbd6cf');
  b+=await logo(2190,58,130);
  b+=text(80,338,'01 / ORIGINAL CAD EXCERPT',24,ink,700);
  const box={x:80,y:380,w:1620,h:837}; const region=[110,160,1210,625];
  b+=await crop('apartments-hvac',box.x,box.y,box.w,box.h,region);
  const items=[
   [1,222,322,'Indoor equipment',['Unit tags locate the room','equipment on the plan.']],
   [2,338,399,'Duct routes',['The supply and return paths','are drawn within the rooms.']],
   [3,458,245,'Extract points',['Fan symbols and tags identify','the local extraction points.']],
   [4,379,685,'Outdoor equipment',['The outdoor-unit row sits','along the lower plan edge.']]
  ];
  const scale=box.w/region[2];
  for(const [i,x,y,title,desc] of items){
    const px=box.x+(x-region[0])*scale,py=box.y+(y-region[1])*scale;
    b+=`<circle cx="${px}" cy="${py}" r="24" fill="${yellow}" stroke="${ink}" stroke-width="3"/>`;
    b+=text(px,py+9,i,27,ink,700,'text-anchor="middle"');
    const yy=435+(i-1)*206;
    b+=rect(1770,yy-32,48,48,yellow)+text(1794,yy+1,'0'+i,23,ink,700,'text-anchor="middle"');
    b+=text(1840,yy+1,title,29,ink,700)+text(1770,yy+60,desc[0],25,'#4b5750')+text(1770,yy+96,desc[1],25,'#4b5750');
  }
  b+=line(80,1320,2320,1320,ink,2)+text(80,1380,'ANNOTATED CAD / EDITORIAL CALLOUTS',26,ink,700);
  b+=text(80,1430,'Numbered markers explain the presentation; they are not original drawing tags or design instructions.',24,'#4b5750');
  b+=text(80,1510,'Original source sheet and schedules are available in the website portfolio.',24,ink)+text(1760,1510,'mackeygrip.github.io',25,ink,600);
  await save('boards/hvac-annotated',2400,1600,b);
}
async function social(p,title1,title2,scope) {
  let b=rect(0,0,1080,1350,ink)+rect(60,52,48,6,yellow);
  b+=text(128,62,'MAC KEY GRIP',24,'#fff',700)+text(128,99,'ENGINEERING',16,grey,600,'letter-spacing="4"');
  b+=await logo(902,42,104);
  b+=text(60,210,title1,65,'#fff',700)+text(60,289,title2,65,yellow,700);
  b+=text(60,344,'CAD DRAWING / PORTFOLIO',20,grey,600,'letter-spacing="2"');
  b+=await crop(p.file,48,379,984,585,p.region);
  b+=rect(48,964,984,52,yellow)+text(72,998,'GENUINE DRAWING · ORIGINAL LINEWORK',21,ink,700);
  b+=text(60,1085,scope,26,'#fff',600)+text(60,1140,'Explore the drawings. Discuss your project.',24,grey);
  b+=line(60,1181,1020,1181,'#46544c',2);
  b+=text(60,1232,'WhatsApp  +260 770 262 871',28,'#fff',700)+text(60,1292,'mackeygrip.github.io',25,yellow,600);
  await save('social/'+p.slug,1080,1350,b,false);
}
(async()=>{
  for(const folder of ['covers','boards','social','concepts'])await fs.mkdir(path.join(out,folder),{recursive:true});
  for(const p of projects) await cover(p);
  await board('hvac');await board('water');await annotated();
  await social(projects[3],'HVAC design.','Drawn with clarity.','Cooling · ductwork · extraction');
  await social(projects[1],'Water systems.','From plan to detail.','Water · fire services · treatment');
  await social(projects[2],'Fuel infrastructure.','Planned in detail.','Tank layouts · pipework · dispensers');
  for(const stem of ['hvac-ceiling-concept','water-treatment-concept'])
    await sharp(path.join(out,'concepts',stem+'.png')).webp({quality:90}).toFile(path.join(out,'concepts',stem+'.webp'));
  console.log('Created five covers, two boards, one annotated layout and three social graphics.');
})().catch(e=>{console.error(e);process.exit(1)});
