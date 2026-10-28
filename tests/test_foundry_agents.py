import os,sys,unittest,asyncio
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'server'))
from engine import generate
from foundry_agents import configured,analyse_with_foundry,ROLES
class FakeAgent:
    def __init__(self,name): self.name=name
    async def run(self,prompt): return self.name+': synthetic football summary'
class TestFoundry(unittest.TestCase):
    def test_unconfigured(self):
        with patch.dict(os.environ,{},clear=True):
            self.assertFalse(configured())
            with self.assertRaises(RuntimeError): asyncio.run(analyse_with_foundry(generate(),0))
    def test_injected_agents(self):
        out=asyncio.run(analyse_with_foundry(generate(),1,agent_factory=lambda name,ins:FakeAgent(name)))
        self.assertTrue(out['ai_generated'])
        self.assertEqual([o['agent'] for o in out['ai_agents']],[n for n,_ in ROLES])
        self.assertTrue(all(o['status']=='model' for o in out['ai_agents']))
    def test_failure_fallback(self):
        class Broken:
            async def run(self,prompt):raise TimeoutError('test')
        out=asyncio.run(analyse_with_foundry(generate(),1,agent_factory=lambda n,i:Broken()))
        self.assertFalse(out['ai_generated'])
        self.assertEqual(out['orchestration_mode'],'deterministic-fallback')
if __name__=='__main__':unittest.main()
