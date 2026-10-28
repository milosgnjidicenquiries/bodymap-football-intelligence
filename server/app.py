from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlsplit,parse_qs
from pathlib import Path
import sys,json,os
sys.path.insert(0,str(Path(__file__).resolve().parent))
from engine import generate,analyse,agent_pipeline,orchestrate,overlay_packet,match_recap,validate_match
ROOT=Path(__file__).resolve().parents[1]
MATCH=generate()
validate_match(MATCH)
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT/'web'),**kwargs)
    def do_GET(self):
        url=urlsplit(self.path);qs=parse_qs(url.query)
        if url.path.startswith('/api/'):
            try:
                if url.path=='/api/match': data=MATCH
                elif url.path=='/api/metrics': data=analyse(MATCH,int(qs.get('upto',[len(MATCH['events'])])[0]))
                elif url.path=='/api/analyse': data=orchestrate(MATCH,int(qs.get('index',[0])[0]),qs.get('lang',['en'])[0],qs.get('audience',['analyst'])[0],qs.get('fail',[None])[0])
                elif url.path=='/api/ai':
                    from foundry_agents import analyse_sync
                    data=analyse_sync(MATCH,int(qs.get('index',[0])[0]),qs.get('lang',['en'])[0],qs.get('audience',['analyst'])[0])
                elif url.path=='/api/overlay': data=overlay_packet(MATCH,int(qs.get('index',[0])[0]),qs.get('audience',['broadcast'])[0],qs.get('lang',['en'])[0])
                elif url.path=='/api/recap': data=match_recap(MATCH,qs.get('lang',['en'])[0],qs.get('audience',['fan'])[0])
                elif url.path=='/api/health':data={'status':'ok','engine':'foundry-optional + deterministic-local','foundry_configured':bool(os.environ.get('FOUNDRY_PROJECT_ENDPOINT') and os.environ.get('FOUNDRY_MODEL')),'synthetic':True}
                else:return self.send_error(404)
                raw=json.dumps(data).encode();self.send_response(200);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Access-Control-Allow-Origin','*');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
            except (ValueError,TypeError) as ex:self.send_error(400,str(ex))
            except RuntimeError as ex:self.send_error(503,str(ex))
        else:super().do_GET()
if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8080);a=p.parse_args();print(f'BodyMap at http://localhost:{a.port}',flush=True);ThreadingHTTPServer(('0.0.0.0',a.port),Handler).serve_forever()
