"""Deterministic synthetic football intelligence. No real personal video or face inference."""
import json, math, random
from dataclasses import dataclass, asdict

TEAMS = ('Azure FC','Crimson United')


def generate(seed=42, duration=90):
    rng=random.Random(seed)
    players=[]
    for team in range(2):
        for i in range(11):
            x=(24 if team==0 else 81)+rng.uniform(-18,18)
            y=(i%6)*10+8+rng.uniform(-3,3)
            players.append({'id':f'{"A" if team==0 else "B"}{i+1:02}', 'team':team,'number':i+1,'x':round(max(3,min(102,x)),2),'y':round(max(3,min(65,y)),2),'heading':rng.uniform(-math.pi,math.pi),'head':rng.uniform(-.8,.8),'arm':rng.choice(['neutral','point','call','raise']),'face':rng.choice(['neutral','smile','brow_furrow','mouth_open'])})
    events=[]
    types=['pass','carry','press','shot','interception','duel','turnover']
    for minute in range(duration):
        team=0 if rng.random()<.52 else 1
        attacker=rng.choice([p for p in players if p['team']==team]); defender=min((p for p in players if p['team']!=team),key=lambda p:(p['x']-attacker['x'])**2+(p['y']-attacker['y'])**2)
        kind=rng.choices(types,[35,18,16,8,8,9,6])[0]
        x=max(3,min(102,attacker['x']+rng.uniform(-15,15))); y=max(3,min(65,attacker['y']+rng.uniform(-12,12)))
        # Observable gestures are synthetic categorical annotations, not emotional diagnoses.
        gesture=rng.choice(['point_left','point_right','raised_hand','calling_for_ball','none'])
        expression=rng.choice(['neutral','smile','brow_furrow','mouth_open'])
        events.append({'id':f'E{minute:03}','minute':minute,'team':team,'type':kind,'player':attacker['id'],'opponent':defender['id'],'x':round(x,2),'y':round(y,2),'end_x':round(max(0,min(105,x+rng.uniform(-16,20))),2),'end_y':round(max(0,min(68,y+rng.uniform(-16,16))),2),'body_angle':round(rng.uniform(-3.14,3.14),3),'head_angle':round(rng.uniform(-1.0,1.0),3),'hand_gesture':gesture,'face_expression':expression,'pressure':round(rng.random(),3),'success':rng.random()>(.44 if kind=='shot' else .2)})
    return {'metadata':{'name':'Synthetic Derby','seed':seed,'duration':duration,'synthetic':True,'license':'CC0 generated dataset','disclaimer':'All players, expressions and actions are fabricated. Facial cues do not establish emotional state or intent.'},'teams':TEAMS,'players':players,'events':events}


def analyse(match, upto=None):
    events=match['events'][:upto] if upto is not None else match['events']
    metrics=[]
    for team in range(2):
        es=[e for e in events if e['team']==team]; attempts=[e for e in es if e['type']=='shot']; passes=[e for e in es if e['type']=='pass']
        metrics.append({'team':match['teams'][team],'events':len(es),'passes':len(passes),'pass_accuracy':round(100*sum(e['success'] for e in passes)/len(passes),1) if passes else 0,'shots':len(attempts),'pressures':sum(e['type']=='press' for e in es),'shot_threat_index':round(sum(1/(1+math.exp(-(-2.8+3.1*(e['x']/105)-0.55*abs(e['y']-34)/34))) for e in attempts),3)})
    n=len(events); metrics[0]['event_share_percent']=round(100*metrics[0]['events']/n,1) if n else 50;metrics[1]['event_share_percent']=100-metrics[0]['event_share_percent']
    return metrics


def candidate_actions(event):
    """Transparent rule-based heuristic, not learned player intent."""
    pressure=event['pressure']; heading=event['body_angle']; pointing=event['hand_gesture']
    candidates={'short_pass':.45+.17*(pointing!='none')-.2*pressure,'through_ball':.24+.15*(pointing in ('point_left','point_right'))-.12*pressure,'carry':.30+.25*(1-pressure),'shot':.08+.35*(event['x']>77)}
    total=sum(candidates.values());return [{'action':k,'relative_weight':v/total} for k,v in sorted(candidates.items(),key=lambda p:-p[1])]


def agent_pipeline(match, index, language='en', audience='analyst'):
    if not 0<=index<len(match['events']): raise ValueError('index out of range')
    e=match['events'][index]; trace=[]
    trace.append({'agent':'Event Validation','status':'ok','result':'Synthetic event schema and coordinates validated'})
    previous=match['events'][max(0,index-8):index+1]
    pressing=sum(q['type']=='press' for q in previous); trace.append({'agent':'Tactical Context','status':'ok','result':f'{pressing} pressing events in 9-event window; pressure={e["pressure"]:.2f}'})
    trace.append({'agent':'Gesture Intelligence','status':'ok','result':f'Observed hand={e["hand_gesture"]}, facial={e["face_expression"]}, head rotation={e["head_angle"]} rad (synthetic annotations)'})
    candidates=candidate_actions(e);trace.append({'agent':'Action Forecast','status':'ok','result':f'Heuristic candidate: {candidates[0]["action"]} ({candidates[0]["relative_weight"]:.0%}); not calibrated'})
    if language=='sr': msg=f"Minut {e['minute']}: {e['player']} izvodi {e['type']} pod pritiskom {e['pressure']:.0%}. Gest ruke: {e['hand_gesture']}. Heuristički sledeći potez: {candidates[0]['action']}. Ovo nije utvrđena namera igrača."
    elif language=='es': msg=f"Minuto {e['minute']}: {e['player']} realiza {e['type']} con presión {e['pressure']:.0%}. Gesto: {e['hand_gesture']}. Próxima acción estimada (heurística): {candidates[0]['action']}."
    else: msg=f"Minute {e['minute']}: {e['player']} executes {e['type']} under {e['pressure']:.0%} simulated pressure. Hand signal: {e['hand_gesture']}. Heuristic next-action candidate: {candidates[0]['action']}; this is not a claim about intent."
    trace.append({'agent':'Explanation & Broadcast','status':'ok','result':f'{language.upper()} / {audience} presentation prepared with provenance'})
    return {'event':e,'narrative':msg,'candidates':candidates,'trace':trace,'confidence_note':'Relative heuristic weights are not probabilities or calibrated model confidence','synthetic':True,'audience':audience,'language':language}


ALLOWED_EVENTS = {'pass','carry','press','shot','interception','duel','turnover'}
ALLOWED_AUDIENCES = {'analyst','broadcast','fan'}
ALLOWED_LANGUAGES = {'en','sr','es'}

def validate_match(match):
    """Strict validation before insights: prevents mislabelled or out-of-bounds overlays."""
    if not isinstance(match,dict) or match.get('metadata',{}).get('synthetic') is not True:
        raise ValueError('Only explicitly synthetic match data is accepted')
    if len(match.get('teams',[])) != 2 or len(match.get('players',[])) != 22:
        raise ValueError('Expected two teams of eleven synthetic players')
    ids={p['id'] for p in match['players']}
    if len(ids)!=22:raise ValueError('Duplicate player IDs')
    for p in match['players']:
        if p.get('team') not in (0,1) or not (0<=p.get('x',-1)<=105 and 0<=p.get('y',-1)<=68):
            raise ValueError('Invalid player position or team')
    prev=-1
    for e in match.get('events',[]):
        if not isinstance(e.get('minute'),(int,float)) or e['minute']<prev or not math.isfinite(e['minute']):
            raise ValueError('Unsorted or invalid match event time')
        prev=e['minute']
        if e.get('team') not in (0,1): raise ValueError('Invalid event team')
        if not isinstance(e.get('success'), bool): raise ValueError('Success must be boolean')
        if e['type'] not in ALLOWED_EVENTS or e['player'] not in ids:
            raise ValueError('Invalid event type or player')
        if not (0<=e['x']<=105 and 0<=e['end_x']<=105 and 0<=e['y']<=68 and 0<=e['end_y']<=68):
            raise ValueError('Event coordinate out of bounds')
        if not math.isfinite(e['pressure']) or not 0<=e['pressure']<=1:raise ValueError('Pressure out of bounds')
        if not all(math.isfinite(e[k]) for k in ('x','y','end_x','end_y')):raise ValueError('Non-finite coordinates')
    return True

def contextual_narrative(event, audience='analyst', language='en'):
    if audience not in ALLOWED_AUDIENCES:raise ValueError('Unsupported audience')
    if language not in ALLOWED_LANGUAGES:raise ValueError('Unsupported language')
    base={
      'en': {'fan':'A key passage of play','broadcast':'ON-SCREEN MOMENT','analyst':'Tactical observation'},
      'sr': {'fan':'Važan trenutak','broadcast':'TRENUTAK ZA PRENOS','analyst':'Taktičko zapažanje'},
      'es': {'fan':'Momento clave','broadcast':'MOMENTO EN PANTALLA','analyst':'Observación táctica'}}[language][audience]
    if audience=='analyst': detail=f"{event['type']} | pressure={event['pressure']:.2f} | x={event['x']:.1f}, y={event['y']:.1f} | synthetic gesture={event['hand_gesture']}"
    elif audience=='broadcast':detail=f"{event['minute']}' • {event['player']} • {event['type'].upper()}"
    else:detail=f"{event['player']} • {event['type']} • minute {event['minute']}"
    return f'{base}: {detail}. Synthetic simulation; no inferred emotions.'

def overlay_packet(match,index,audience='broadcast',language='en'):
    """Time-addressable render payload for broadcast/streaming integrations."""
    validate_match(match)
    if not 0<=index<len(match['events']):raise ValueError('index out of range')
    e=match['events'][index]
    return {'schema':'bodymap.overlay.v1','event_id':e['id'],'match_minute':e['minute'],
      'display_ms':int(e['minute']*60000),'ttl_ms':6000,'audience':audience,'locale':language,
      'text':contextual_narrative(e,audience,language),
      'anchor':{'pitch_x':e['x'],'pitch_y':e['y']},'evidence':{'source':'synthetic',
      'event_type':e['type'],'pressure':e['pressure'],'hand_gesture':e['hand_gesture']},
      'disclaimer':'Synthetic demonstration. Not a behavioral diagnosis.'}

def match_recap(match,language='en',audience='fan'):
    validate_match(match)
    if language not in ALLOWED_LANGUAGES or audience not in ALLOWED_AUDIENCES:raise ValueError('Unsupported mode')
    metrics=analyse(match)
    key=sorted(match['events'],key=lambda e:(e['type']=='shot')*3+(e['type']=='press')*2+e['pressure'],reverse=True)[:5]
    return {'synthetic':True,'audience':audience,'language':language,'teams':metrics,
      'key_moments':[overlay_packet(match,int(e['minute']),audience,language) for e in key],
      'method':'Deterministic key-moment selection. Event share is not possession time; shot threat is an uncalibrated index, not xG.'}

def orchestrate(match,index,language='en',audience='analyst',inject_failure=None):
    """Explicit multi-stage deterministic orchestrator, not an LLM-agent framework."""
    validate_match(match)
    if language not in ALLOWED_LANGUAGES or audience not in ALLOWED_AUDIENCES:raise ValueError('Unsupported mode')
    result=agent_pipeline(match,index,language,audience)
    state={'event_id':result['event']['id'],'audience':audience,'locale':language,'synthetic':True}
    handoffs=[]
    for step in result['trace']:
        name=step['agent']; status='ok'; output=step['result']
        if inject_failure==name:
            status='fallback'; output='Stage unavailable; deterministic safety fallback applied; no fabricated model answer.'
        handoffs.append({'stage':name,'status':status,'shared_state':dict(state),'message':output})
        state['last_stage']=name; state['last_status']=status
    result['handoffs']=handoffs
    result['overlay']=overlay_packet(match,index,audience,language)
    result['orchestration_mode']='deterministic demonstration; no deployed agent framework or Microsoft Foundry calls'
    return result
