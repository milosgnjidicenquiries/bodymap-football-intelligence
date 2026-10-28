const $=id=>document.getElementById(id);
let match=null,index=20,playing=false,perspective=true,gestures=true,timer=null,report=null;
const canvas=$('pitch'),ctx=canvas.getContext('2d');
async function api(route){const r=await fetch(route);if(!r.ok)throw Error('API '+r.status);return r.json()}
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function resize(){const rect=canvas.getBoundingClientRect(),d=window.devicePixelRatio||1;canvas.width=rect.width*d;canvas.height=rect.height*d;ctx.setTransform(d,0,0,d,0,0);draw()}
function project(x,y){let w=canvas.clientWidth,h=canvas.clientHeight,u=x/105,v=y/68;if(!perspective)return [w*(.08+.84*u),h*(.12+.76*v)];let dep=v, width=.69+.19*dep;return [w*(.5+(u-.5)*width),h*(.13+dep*.70+(.5-u)*.03)]}
function line(a,b,color='#badbc6',lw=1,dash=[]){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([])}
function circle(p,r,color,stroke){ctx.beginPath();ctx.arc(...p,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke()}}
function draw(){if(!match)return;const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);ctx.fillStyle='#0a241e';ctx.fillRect(0,0,w,h);
const poly=[[0,0],[105,0],[105,68],[0,68]].map(p=>project(...p));ctx.beginPath();poly.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle='#185b3f';ctx.fill();ctx.strokeStyle='#c9dfcb';ctx.lineWidth=2;ctx.stroke();for(let i=1;i<10;i++){line(project(i*10.5,0),project(i*10.5,68),'#ffffff0a',13)}
line(project(52.5,0),project(52.5,68));for(const side of [0,105]){const x=side?88.5:16.5;line(project(side,13.84),project(x,13.84));line(project(x,13.84),project(x,54.16));line(project(x,54.16),project(side,54.16))}
const center=project(52.5,34);circle(center,1,'#d0e7db');ctx.beginPath();ctx.ellipse(...center,Math.max(7,w*.07),Math.max(8,h*.12),0,0,Math.PI*2);ctx.strokeStyle='#c9dfcb';ctx.lineWidth=1;ctx.stroke();
const ev=match.events[index],players=match.players.map((p,i)=>({...p,x:clamp(p.x+Math.sin(index*.14+i)*10,3,102),y:clamp(p.y+Math.cos(index*.12+i)*7,3,65)}));const selected=players.find(p=>p.id===ev.player);if(selected){selected.x=ev.x;selected.y=ev.y;selected.arm=ev.hand_gesture;selected.face=ev.face_expression;selected.heading=ev.body_angle;selected.head=ev.head_angle}
for(const p of players.sort((a,b)=>a.y-b.y)){const q=project(p.x,p.y);if(p.id===ev.player){circle(q,14,'#f5e07d48','#ffdf78');line(q,project(ev.end_x,ev.end_y),'#f7e38e',2,[6,6])}circle(q,8,p.team?'#ff806b':'#54b7ff','#fff');ctx.fillStyle='#061a18';ctx.font='bold 9px system-ui';ctx.textAlign='center';ctx.fillText(p.number,...[q[0],q[1]+3]);if(gestures){const ang=p.heading+p.head;line(q,[q[0]+Math.cos(ang)*19,q[1]-Math.sin(ang)*12],'#e9ffe5',2.4);if(p.arm!=='neutral'&&p.arm!=='none'){line(q,[q[0]+Math.cos(p.heading+.85)*20,q[1]-Math.sin(p.heading+.85)*19],'#ffe189',2.5)}}}
const ball=project(ev.x,ev.y);circle([ball[0]+9,ball[1]+6],4,'#fff','#1a4437')}

const T={
en:{
 brandSub:'Explainable football intelligence · research prototype',analyst:'Analyst',broadcast:'Broadcast',fan:'Fan',export:'Export analysis',
 heroLabel:'Tactical analysis · body orientation · decision support',heroTitle:'Understand the action. Not just the numbers.',heroText:'A transparent demonstration of how event context and synthetic movement annotations can support football analysis, broadcast storytelling and fan education.',syntheticBadge:'● SYNTHETIC MATCH · DEMONSTRATION DATA',
 pitchTitle:'Match situation | Spatial view',pitchSub:'Explore the event, player positioning and annotated movement cues',perspective:'Angled view',topdown:'Top-down',signalsOn:'Cues ON',signalsOff:'Cues OFF',stamp:'Illustrative match scenario',legend:'Arm marker · head direction · ball',
 play:'▶ Play',pause:'⏸ Pause',
 briefTitle:'Football analysis | Event briefing',briefSub:'What happened, what the context suggests, and what remains uncertain',briefPill:'Evidence first',candidateTitle:'Possible next actions | Rule-based ranking',rankingNote:'The bars show relative weights produced by fixed rules. They are not measured probabilities, success rates or evidence of the player’s intentions.',
 workflowTitle:'Inside the analysis | Five methodological steps',workflowSub:'Football language first · original execution details available below',methodPill:'Rule-based',workflowIntro:'From a recorded event to a structured football interpretation. Every stage uses fictional match data.',technicalToggle:'Open technical execution trace',techDetail:'Original deterministic processing log for auditing and development. These are not autonomous AI agent calls.',
 signalsTitle:'Player movement | Observational markers',signalsSub:'Annotated attributes supplied by the simulation',fictionalBadge:'Fictional players',signalsNote:'Gesture and facial-shape labels are fictional annotations, not interpretations of emotion or intent. The application does not process real match video.',
 methodTitle:'Methodology & limitations',methodSub:'What the prototype demonstrates — and what it cannot claim',transparent:'Transparent',
 method1:'<strong>Implemented:</strong> reproducible synthetic match data, event validation, context summaries, annotation display, heuristic option ranking and audience-specific explanations.',
 method2:'<strong>Not claimed:</strong> automatic video tracking, behavioural diagnosis, calibrated action probabilities or a live Microsoft Foundry AI connection.',
 method3:'<strong>Professional application:</strong> genuine match analysis would require licensed tracking/event data, comparative validation, clear uncertainty measures and data-governance controls.',
 demoTitle:'Guided demonstration | Three professional use cases',demoSub:'Choose an example. The selected match situation and its explanation update together.',demoPill:'Project walkthrough',
 scene1Title:'Tactical event review',scene1Text:'Examine pressure context, positional cues and potential continuations.',scene2Title:'Broadcast interpretation',scene2Text:'Transform structured event information into a concise match narrative.',scene3Title:'Football education',scene3Text:'Communicate the same football situation in clear language.',
 videoLink:'▶ Watch project demonstration',sourceLink:'View methods & source code',footer:'BodyMap Football Intelligence · Independent research prototype · All players and events are fictional · No real-video behavioural or emotional inference',
 events:{pass:'Pass',carry:'Ball carry',press:'Pressing action',shot:'Shot',interception:'Interception',duel:'Duel',turnover:'Loss of possession'},
 actions:{short_pass:'Short pass',through_ball:'Pass into space',carry:'Ball carry',shot:'Shot'},
 gestures:{point_right:'Pointing to the right',point_left:'Pointing to the left',raised_hand:'Raised hand',calling_for_ball:'Signal asking for the ball',none:'No hand signal recorded'},
 faces:{neutral:'Neutral facial-shape label',smile:'Smiling-shape annotation',brow_furrow:'Furrowed-brow annotation',mouth_open:'Open-mouth annotation'},
 metrics:['Passes','Shots','Pressing events','Share of recorded events'],stageTitles:['Event data validation','Situational and tactical context','Body orientation and annotated cues','Assessment of next-action options','Analytical presentation'],
 mode:{analyst:'analyst',broadcast:'broadcast',fan:'fan'},
 high:'high',moderate:'moderate',low:'low',
 pitchLocation:['near one touchline','in the central corridor','near the opposite touchline'],
 hand:'Hand signal',face:'Facial annotation',head:'Head rotation',pressure:'Pressure index',
 noPrediction:'No action ranking is available for this event.',
 noInsights:'No analysis available for the selected event.',
 error:'The analysis could not be loaded. Check the API connection.',
 noteContext:'The pressure index is a synthetic input, not a tracking-derived physical measure.',
 stage1:(e)=>'Event '+e.id+' has a valid match minute, player reference, action type and position on the simulated pitch.',
 stage2:(c)=>c.presses+' pressing '+(c.presses===1?'event':'events')+' among the last '+c.n+' logged actions. Pressure index: '+c.p.toFixed(2)+' ('+c.level+'). This describes the simulated context, not an observed match measurement.',
 stage3:(c)=>'Hand marker: '+c.hand+'. Head orientation: '+c.degrees+'°. Facial shape: '+c.face+'. These are annotations only; they do not establish intent or emotional state.',
 stage4:(c)=>'The strongest rule-based option is '+c.action.toLowerCase()+' (relative weight '+c.weight+'%). The score ranks alternatives; it does not predict the player’s next decision with '+c.weight+'% certainty.',
 stage5:(c)=>'The same event is expressed for the '+c.audience+' audience in English. The conclusion is traceable to fictional match fields and explicit rules.',
 narrativeAnalyst:(c)=>'At minute '+c.minute+', '+c.player+' of '+c.team+' is recorded performing a '+c.action+'. The preceding '+c.n+' events include '+c.presses+' pressing actions and a '+c.level+' simulated pressure index ('+c.p.toFixed(2)+'). The top-ranked continuation is '+c.next+' under the stated rules, not a measured likelihood.',
 narrativeBroadcast:(c)=>'Minute '+c.minute+': '+c.player+' of '+c.team+' is involved in a '+c.action+'. The simulation places this action in a '+c.level+'-pressure sequence. BodyMap provides a grounded event explanation without assuming the player’s intentions.',
 narrativeFan:(c)=>'In the '+c.minute+'th minute, '+c.player+' of '+c.team+' makes a '+c.action+'. The example shows '+c.level+' pressure from the simulation. The options below show how a simple analysis model compares possible continuations.',
 spatial:(c)=>'Position on the illustrated pitch: '+c.location+'. Pressure index '+c.p.toFixed(2)+' / 1.00. This is not live player tracking.'
},
sr:{
 brandSub:'Objašnjiva fudbalska analitika · istraživački prototip',analyst:'Analitičar',broadcast:'TV prenos',fan:'Navijač',export:'Izvezi analizu',
 heroLabel:'Taktička analiza · orijentacija tela · podrška odlučivanju',heroTitle:'Razumi akciju. Ne samo statistiku.',heroText:'Transparentan prikaz kako kontekst igre i simulirane oznake pokreta mogu doprineti fudbalskoj analizi, televizijskom prenosu i edukaciji navijača.',syntheticBadge:'● SIMULIRANA UTAKMICA · DEMONSTRACIONI PODACI',
 pitchTitle:'Situacija iz igre | Prostorni prikaz',pitchSub:'Istraži akciju, položaje igrača i označene pokrete',perspective:'Ugao sa tribine',topdown:'Pogled odozgo',signalsOn:'Pokreti UKLJ.',signalsOff:'Pokreti ISKLJ.',stamp:'Ilustrativna utakmica',legend:'Pokret ruke · smer glave · lopta',play:'▶ Pokreni',pause:'⏸ Pauza',
 briefTitle:'Fudbalska analiza | Pregled akcije',briefSub:'Šta se dogodilo, šta govori kontekst i gde postoje ograničenja',briefPill:'Zasnovano na podacima',candidateTitle:'Mogući naredni potezi | Rangiranje po pravilima',rankingNote:'Trake prikazuju relativne težine koje daju unapred definisana pravila. To nisu izmerene verovatnoće, uspešnost poteza niti dokaz namere igrača.',
 workflowTitle:'Metodologija | Pet faza analize',workflowSub:'Stručan fudbalski jezik · tehnički detalji dostupni ispod',methodPill:'Model zasnovan na pravilima',workflowIntro:'Od zabeležene akcije do strukturiranog taktičkog tumačenja. Svaka faza koristi podatke iz fiktivne utakmice.',technicalToggle:'Otvori tehnički zapis obrade',techDetail:'Izvorni deterministički zapis za proveru i razvoj. Ovo nisu pozivi autonomnim AI agentima.',
 signalsTitle:'Kretanje igrača | Zabeležene oznake',signalsSub:'Oznake iz simulacije, ne stvarna video-analiza',fictionalBadge:'Fiktivni igrači',signalsNote:'Oznake pokreta i oblika lica su sintetički podaci, a ne zaključci o emocijama ili namerama. Aplikacija ne obrađuje stvarne snimke utakmica.',
 methodTitle:'Metodologija i ograničenja',methodSub:'Šta prototip prikazuje, a šta ne može da tvrdi',transparent:'Transparentno',
 method1:'<strong>Realizovano:</strong> ponovljivi simulirani podaci, validacija događaja, analiza konteksta, prikaz pokreta, heurističko rangiranje i objašnjenja za različitu publiku.',
 method2:'<strong>Nije realizovano:</strong> automatsko praćenje iz video-snimka, procena psihološkog stanja, statistički kalibrisane verovatnoće i aktivna Microsoft Foundry AI veza.',
 method3:'<strong>Profesionalna primena:</strong> zahteva licencirane podatke iz utakmica, proveru metodologije na stvarnim uzorcima, merenje nesigurnosti i odgovorno upravljanje podacima.',
 demoTitle:'Demonstracija | Tri praktična scenarija',demoSub:'Odaberi primer; situacija na terenu i objašnjenje menjaju se zajedno.',demoPill:'Prikaz za žiri',
 scene1Title:'Taktička analiza akcije',scene1Text:'Pregled pritiska, položaja igrača i mogućih nastavaka.',scene2Title:'Komentar za TV prenos',scene2Text:'Pretvaranje podataka o akciji u kratko objašnjenje za gledaoce.',scene3Title:'Edukacija navijača',scene3Text:'Ista situacija objašnjena jasnim i razumljivim jezikom.',
 videoLink:'▶ Pogledaj demonstracioni video',sourceLink:'Metodologija i izvorni kod',footer:'BodyMap Football Intelligence · Nezavisni istraživački prototip · Svi igrači i događaji su fiktivni · Bez zaključivanja o ponašanju ili emocijama iz stvarnog videa',
 events:{pass:'Dodavanje',carry:'Vođenje lopte',press:'Presing',shot:'Šut',interception:'Presecanje lopte',duel:'Duel',turnover:'Izgubljena lopta'},
 actions:{short_pass:'Kratko dodavanje',through_ball:'Lopta u prostor',carry:'Vođenje lopte',shot:'Šut'},
 gestures:{point_right:'Pokazivanje udesno',point_left:'Pokazivanje ulevo',raised_hand:'Podignuta ruka',calling_for_ball:'Signal za prijem lopte',none:'Nije zabeležen gest rukom'},
 faces:{neutral:'Neutralna oznaka oblika lica',smile:'Oznaka oblika osmeha',brow_furrow:'Oznaka namrštenih obrva',mouth_open:'Oznaka otvorenih usta'},
 metrics:['Dodavanja','Šutevi','Presing akcije','Udeo zabeleženih akcija'],stageTitles:['Provera podataka o akciji','Situaciono-taktički kontekst','Orijentacija tela i neverbalne oznake','Procena mogućih narednih rešenja','Stručna interpretacija'],
 mode:{analyst:'taktičkog analitičara',broadcast:'televizijskog prenosa',fan:'navijače'},high:'visok',moderate:'umeren',low:'nizak',
 pitchLocation:['uz jednu aut-liniju','u centralnom koridoru','uz suprotnu aut-liniju'],
 hand:'Gest rukom',face:'Oznaka lica',head:'Rotacija glave',pressure:'Indeks pritiska',noPrediction:'Za ovu akciju nema rangiranih opcija.',noInsights:'Analiza izabrane akcije nije dostupna.',error:'Analiza nije učitana. Proveri vezu sa API servisom.',noteContext:'Indeks pritiska je simulirani ulazni podatak, a ne fizička veličina dobijena praćenjem igrača.',
 stage1:(e)=>'Događaj '+e.id+' ima validan minut, identifikaciju igrača, vrstu akcije i poziciju na simuliranom terenu.',
 stage2:(c)=>'U poslednjih '+c.n+' evidentiranih akcija zabeleženo je '+c.presses+' presing događaja. Indeks pritiska iznosi '+c.p.toFixed(2).replace('.',',')+' ('+c.level+'). Reč je o simuliranom kontekstu, a ne merenju sa stvarne utakmice.',
 stage3:(c)=>'Gest rukom: '+c.hand+'. Rotacija glave: '+c.degrees+'°. Oznaka lica: '+c.face+'. Ovi podaci opisuju sintetičke oznake, ne dokazuju nameru ni emocionalno stanje igrača.',
 stage4:(c)=>'Prema definisanim pravilima, prvo rangirano rešenje je '+c.action.toLowerCase()+' (relativna težina '+c.weight+'%). Rezultat poredi opcije, ali ne predstavlja '+c.weight+'% verovatnoće da će igrač izabrati taj potez.',
 stage5:(c)=>'Isti događaj je predstavljen za potrebe '+c.audience+' na srpskom jeziku. Tumačenje se može povezati sa simuliranim podacima i pravilima obrade.',
 narrativeAnalyst:(c)=>'U '+c.minute+'. minutu igrač '+c.player+' ('+c.team+') izvodi akciju: '+c.action.toLowerCase()+'. U poslednjih '+c.n+' događaja zabeležene su '+c.presses+' presing akcije, uz '+c.level+' simulirani pritisak (indeks '+c.p.toFixed(2).replace('.',',')+'). Model kao prvo rangirano naredno rešenje izdvaja '+c.next.toLowerCase()+', ali to nije statistički potvrđena verovatnoća.',
 narrativeBroadcast:(c)=>c.minute+'. minut: '+c.player+' ('+c.team+') — '+c.action.toLowerCase()+'. Simulacija ovu situaciju prikazuje uz '+c.level+' pritisak. BodyMap izdvaja kontekst akcije bez pretpostavljanja namere igrača.',
 narrativeFan:(c)=>'U '+c.minute+'. minutu '+c.player+' iz ekipe '+c.team+' izvodi '+c.action.toLowerCase()+'. U ovoj simulaciji pritisak je '+c.level+'. Ispod možeš videti koja naredna rešenja model poredi i kako ih rangira.',
 spatial:(c)=>'Položaj u ilustrativnom prikazu: '+c.location+'. Indeks pritiska '+c.p.toFixed(2).replace('.',',')+' / 1,00. Nisu korišćeni podaci praćenja stvarnih igrača.'
},
es:{
 brandSub:'Análisis de fútbol explicable · prototipo de investigación',analyst:'Analista',broadcast:'Retransmisión',fan:'Afición',export:'Exportar análisis',
 heroLabel:'Análisis táctico · orientación corporal · apoyo a decisiones',heroTitle:'Comprende la jugada. No solo las cifras.',heroText:'Demostración transparente de cómo el contexto y las anotaciones sintéticas de movimiento pueden respaldar el análisis, las retransmisiones y la educación futbolística.',syntheticBadge:'● PARTIDO SINTÉTICO · DATOS DE DEMOSTRACIÓN',
 pitchTitle:'Situación de juego | Vista espacial',pitchSub:'Explora la jugada, las posiciones y las señales de movimiento',perspective:'Vista inclinada',topdown:'Vista superior',signalsOn:'Señales SÍ',signalsOff:'Señales NO',stamp:'Partido ilustrativo',legend:'Señal de mano · dirección de cabeza · balón',play:'▶ Reproducir',pause:'⏸ Pausar',
 briefTitle:'Análisis futbolístico | Informe de jugada',briefSub:'Qué sucedió, qué aporta el contexto y qué sigue siendo incierto',briefPill:'Basado en datos',candidateTitle:'Posibles acciones siguientes | Ranking por reglas',rankingNote:'Las barras expresan pesos relativos calculados con reglas fijas. No son probabilidades medidas ni prueban las intenciones del jugador.',
 workflowTitle:'Método de análisis | Cinco etapas',workflowSub:'Lenguaje futbolístico primero · registro técnico disponible abajo',methodPill:'Basado en reglas',workflowIntro:'Del evento registrado a una interpretación estructurada. Todas las etapas usan datos ficticios.',technicalToggle:'Mostrar registro técnico',techDetail:'Registro determinista para auditoría y desarrollo. No representa llamadas a agentes autónomos de IA.',
 signalsTitle:'Movimiento del jugador | Indicadores observados',signalsSub:'Anotaciones introducidas por la simulación',fictionalBadge:'Jugadores ficticios',signalsNote:'Las etiquetas de gestos y formas faciales son anotaciones ficticias, no inferencias de emociones o intenciones. No se procesa vídeo real.',
 methodTitle:'Método y limitaciones',methodSub:'Qué demuestra el prototipo y qué no puede afirmar',transparent:'Transparente',
 method1:'<strong>Implementado:</strong> datos sintéticos reproducibles, validación de eventos, contexto táctico, anotaciones, ranking heurístico y explicaciones según el público.',
 method2:'<strong>No implementado:</strong> seguimiento automático de vídeo, diagnóstico conductual, probabilidades calibradas ni conexión activa con Microsoft Foundry.',
 method3:'<strong>Aplicación profesional:</strong> requeriría datos reales con licencia, validación externa, medidas de incertidumbre y gobernanza responsable de datos.',
 demoTitle:'Demostración guiada | Tres casos de uso',demoSub:'Elige un ejemplo; la jugada y la explicación se actualizan a la vez.',demoPill:'Recorrido del proyecto',
 scene1Title:'Revisión táctica',scene1Text:'Examina la presión, las pistas posicionales y las opciones disponibles.',scene2Title:'Narrativa para retransmisión',scene2Text:'Convierte datos estructurados en un comentario breve.',scene3Title:'Educación futbolística',scene3Text:'Explica la misma situación con un lenguaje accesible.',
 videoLink:'▶ Ver vídeo de demostración',sourceLink:'Método y código fuente',footer:'BodyMap Football Intelligence · Prototipo de investigación independiente · Todos los jugadores y eventos son ficticios · Sin inferencias conductuales ni emocionales de vídeo real',
 events:{pass:'Pase',carry:'Conducción',press:'Presión',shot:'Remate',interception:'Intercepción',duel:'Duelo',turnover:'Pérdida de balón'},
 actions:{short_pass:'Pase corto',through_ball:'Pase al espacio',carry:'Conducción',shot:'Remate'},
 gestures:{point_right:'Señal hacia la derecha',point_left:'Señal hacia la izquierda',raised_hand:'Mano levantada',calling_for_ball:'Petición gestual del balón',none:'Sin señal manual registrada'},
 faces:{neutral:'Etiqueta facial neutra',smile:'Anotación de forma de sonrisa',brow_furrow:'Anotación de ceño fruncido',mouth_open:'Anotación de boca abierta'},
 metrics:['Pases','Remates','Acciones de presión','Proporción de eventos registrados'],stageTitles:['Validación de datos de la jugada','Contexto táctico y situacional','Orientación corporal y señales anotadas','Evaluación de acciones posibles','Interpretación técnica'],
 mode:{analyst:'análisis táctico',broadcast:'retransmisión',fan:'aficionados'},high:'alta',moderate:'moderada',low:'baja',
 pitchLocation:['cerca de una banda','en el carril central','cerca de la banda opuesta'],
 hand:'Señal manual',face:'Etiqueta facial',head:'Rotación de cabeza',pressure:'Índice de presión',noPrediction:'No hay opciones clasificadas para esta jugada.',noInsights:'No hay análisis para la jugada seleccionada.',error:'No se pudo cargar el análisis. Comprueba la conexión con la API.',noteContext:'El índice de presión es un dato sintético, no una medición física de seguimiento de jugadores.',
 stage1:(e)=>'El evento '+e.id+' tiene un minuto válido, referencia de jugador, tipo de acción y ubicación en el campo simulado.',
 stage2:(c)=>'Se registraron '+c.presses+' acciones de presión entre los últimos '+c.n+' eventos. Índice de presión: '+c.p.toFixed(2)+' ('+c.level+'). Es contexto sintético, no una medición del partido real.',
 stage3:(c)=>'Señal manual: '+c.hand+'. Rotación de cabeza: '+c.degrees+'°. Forma facial: '+c.face+'. Son etiquetas, no evidencias de intención ni emoción.',
 stage4:(c)=>'La mejor opción según las reglas es '+c.action.toLowerCase()+' (peso relativo '+c.weight+'%). Este valor compara alternativas, no demuestra una probabilidad del '+c.weight+'% de que el jugador la elija.',
 stage5:(c)=>'El mismo evento se explica para '+c.audience+' en español. La interpretación se basa en campos ficticios y reglas explícitas.',
 narrativeAnalyst:(c)=>'Minuto '+c.minute+': '+c.player+' de '+c.team+' realiza un '+c.action.toLowerCase()+'. En los últimos '+c.n+' eventos hubo '+c.presses+' acciones de presión y un índice sintético '+c.level+' ('+c.p.toFixed(2)+'). La primera continuación según las reglas es '+c.next.toLowerCase()+', sin probabilidades calibradas.',
 narrativeBroadcast:(c)=>'Minuto '+c.minute+': '+c.player+' de '+c.team+' protagoniza un '+c.action.toLowerCase()+'. La simulación sitúa la jugada bajo presión '+c.level+'. BodyMap resume el contexto sin atribuir intenciones.',
 narrativeFan:(c)=>'En el minuto '+c.minute+', '+c.player+' de '+c.team+' realiza un '+c.action.toLowerCase()+'. La simulación marca presión '+c.level+'. Abajo se muestran las posibles continuaciones que compara el modelo.',
 spatial:(c)=>'Zona del campo ilustrado: '+c.location+'. Índice de presión '+c.p.toFixed(2)+' / 1,00. No se usa seguimiento real.'
}
};
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const localized=(dict,k)=>dict[k]||k.replaceAll('_',' ');
const locale=()=>T[$('lang').value]||T.en;
const mode=()=>['analyst','broadcast','fan'].includes($('audience').value)?$('audience').value:'analyst';
function translatePage(){
 const t=locale();document.documentElement.lang=$('lang').value;
 document.querySelectorAll('[data-i18n]').forEach(el=>{
   const value=t[el.dataset.i18n];if(typeof value!=='string')return;
   if(el.dataset.i18n.startsWith('method')&&['method1','method2','method3'].includes(el.dataset.i18n))el.innerHTML=value;
   else el.textContent=value;
 });
 $('labels').textContent=gestures?t.signalsOn:t.signalsOff;
 $('play').textContent=playing?t.pause:t.play;
}
function metricCard(key,a,b){
 return '<div class="stat"><small>'+escapeHtml(key)+'</small><strong>'+escapeHtml(a)+' <span style="color:#638c77;font-size:13px">/</span> '+escapeHtml(b)+'</strong></div>';
}
let refreshSequence=0;
async function refresh(){
 if(!match)return;
 const seq=++refreshSequence,lang=$('lang').value,audience=mode(),t=locale();
 translatePage();
 try{
  const [r,metrics]=await Promise.all([
   api('/api/analyse?index='+index+'&lang='+encodeURIComponent(lang)+'&audience='+encodeURIComponent(audience)),
   api('/api/metrics?upto='+(index+1))
  ]);
  if(seq!==refreshSequence)return;
  report=r;
  const e=r.event,windowEvents=match.events.slice(Math.max(0,index-8),index+1);
  const presses=windowEvents.filter(x=>x.type==='press').length;
  const level=e.pressure>=.67?t.high:(e.pressure>=.34?t.moderate:t.low);
  const top=r.candidates?.[0];
  const leading=top?localized(t.actions,top.action):t.noPrediction;
  const location=t.pitchLocation[e.y<22?0:e.y>46?2:1];
  const c={minute:e.minute,player:e.player,team:match.teams[e.team],
    action:localized(t.events,e.type),presses,n:windowEvents.length,p:e.pressure,level,
    next:leading,location};
  $('time').textContent=e.minute+"'";
  $('timeline').value=index;
  $('eventid').textContent=(lang==='sr'?'DOGAĐAJ ':lang==='es'?'EVENTO ':'EVENT ')+e.id+' · '+match.teams[e.team].toUpperCase();
  $('eventtitle').textContent=c.action+' · '+e.player;
  $('narrative').textContent=t['narrative'+audience[0].toUpperCase()+audience.slice(1)](c);
  $('context').textContent=t.spatial(c);
  const [a,b]=metrics;
  const val=k=>[a[k]??0,b[k]??0];
  const ps=val('passes'),ss=val('shots'),prs=val('pressures'),share=val('event_share_percent');
  $('stats').innerHTML=metricCard(t.metrics[0],...ps)+metricCard(t.metrics[1],...ss)+metricCard(t.metrics[2],...prs)+metricCard(t.metrics[3],share[0]+'%',share[1]+'%');
  $('candidates').innerHTML=(r.candidates||[]).map(x=>{
    const weight=Math.max(0,Math.min(100,Number(x.relative_weight)*100||0));
    return '<div class="candidate"><span>'+escapeHtml(localized(t.actions,x.action))+'</span><b>'+Math.round(weight)+'%</b><div class="track"><div class="fill" style="width:'+weight+'%"></div></div></div>';
  }).join('')||'<p class="description">'+escapeHtml(t.noPrediction)+'</p>';
  const context={presses,n:windowEvents.length,p:e.pressure,level,
    hand:localized(t.gestures,e.hand_gesture),face:localized(t.faces,e.face_expression),
    degrees:Math.round(e.head_angle*180/Math.PI),action:leading,weight:Math.round((top?.relative_weight||0)*100),
    audience:t.mode[audience]};
  const stageDetails=[t.stage1(e),t.stage2(context),t.stage3(context),t.stage4(context),t.stage5(context)];
  $('insightStages').innerHTML=t.stageTitles.map((title,i)=>
   '<div class="stage"><div class="stage-no">'+(i+1)+'</div><div><div class="stage-title">'+escapeHtml(title)+'</div><div class="stage-desc">'+escapeHtml(stageDetails[i])+'</div></div></div>'
  ).join('');
  $('trace').innerHTML=(r.trace||[]).map(x=>'<div class="trace"><strong>✓ '+escapeHtml(x.agent)+'</strong><small>'+escapeHtml(x.result)+'</small></div>').join('');
  const items=[[t.hand,localized(t.gestures,e.hand_gesture)],[t.face,localized(t.faces,e.face_expression)],[t.head,Math.round(e.head_angle*180/Math.PI)+'°'],[t.pressure,e.pressure.toFixed(2)+' / 1.00']];
  $('signals').innerHTML=items.map(([label,value])=>'<div class="signal"><div class="signal-label">'+escapeHtml(label)+'</div><div class="signal-value">'+escapeHtml(value)+'</div></div>').join('');
  draw();
 }catch(err){
  if(seq!==refreshSequence)return;
  $('narrative').textContent=t.error;
  console.error('BodyMap analysis unavailable',err);
 }
}
function updatePlay(){const t=locale();$('play').textContent=playing?t.pause:t.play}
function stopPlayback(){playing=false;if(timer)clearInterval(timer);timer=null;updatePlay()}
$('timeline').oninput=e=>{index=Number(e.target.value);refresh()};
$('play').onclick=()=>{
 if(playing){stopPlayback();return}
 playing=true;updatePlay();
 if(timer)clearInterval(timer);
 timer=setInterval(()=>{index=(index+1)%match.events.length;refresh()},1000);
};
$('reset').onclick=()=>{stopPlayback();index=0;refresh()};
$('view3d').onclick=()=>{perspective=true;$('view3d').classList.add('active');$('view2d').classList.remove('active');draw()};
$('view2d').onclick=()=>{perspective=false;$('view2d').classList.add('active');$('view3d').classList.remove('active');draw()};
$('labels').onclick=()=>{gestures=!gestures;$('labels').classList.toggle('active',gestures);$('labels').textContent=gestures?locale().signalsOn:locale().signalsOff;draw()};
$('lang').onchange=refresh;
$('audience').onchange=refresh;
document.querySelectorAll('[data-scene]').forEach(button=>{
 button.addEventListener('click',()=>{
  stopPlayback();index=Number(button.dataset.scene);$('audience').value=button.dataset.audience;refresh();
  document.querySelector('.grid').scrollIntoView({behavior:'smooth',block:'start'});
 });
});
$('export').onclick=()=>{
 if(!report||!match)return;
 const payload={title:'BodyMap Football Intelligence — synthetic event analysis',
  metadata:match.metadata,teams:match.teams,event:report.event,
  selected_locale:$('lang').value,audience:mode(),
  narrative:$('narrative').textContent,
  methodological_stages:Array.from(document.querySelectorAll('.stage')).map((x,i)=>({step:i+1,title:x.querySelector('.stage-title').textContent,description:x.querySelector('.stage-desc').textContent})),
  candidates:report.candidates,technical_trace:report.trace,
  interpretation_limits:'Synthetic input; rule-based scores are uncalibrated relative weights; no real video or active Microsoft Foundry agents verified.'
 };
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bodymap-analysis-'+report.event.id+'.json';a.click();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
};
window.addEventListener('resize',resize);
translatePage();
api('/api/match').then(m=>{
 match=m;
 $('matchname').textContent=m.teams.join(' vs ');
 $('timeline').max=m.events.length-1;
 index=Math.min(index,m.events.length-1);
 resize();refresh();
}).catch(err=>{
 document.querySelector('.visual .stamp').textContent='API unavailable · python server/app.py';
 $('narrative').textContent=locale().error;console.error(err);
});
