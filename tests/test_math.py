import sys,unittest,copy,math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'server'))
from engine import generate,analyse,candidate_actions,validate_match
class MathChecks(unittest.TestCase):
 def setUp(self):self.m=generate()
 def test_weights(self):
  for e in self.m['events']:
   a=candidate_actions(e);self.assertAlmostEqual(sum(x['relative_weight'] for x in a),1,places=10)
   self.assertTrue(all(0<=x['relative_weight']<=1 for x in a))
 def test_event_shares(self):
  for n in range(0,91):
   a,b=analyse(self.m,n);self.assertAlmostEqual(a['event_share_percent']+b['event_share_percent'],100,places=6)
 def test_nonfinite(self):
  m=copy.deepcopy(self.m);m['events'][0]['pressure']=float('nan')
  with self.assertRaises(ValueError):validate_match(m)
 def test_order(self):
  m=copy.deepcopy(self.m);m['events'][2]['minute']=-1
  with self.assertRaises(ValueError):validate_match(m)
 def test_shot_index(self):
  for side in analyse(self.m):self.assertGreaterEqual(side['shot_threat_index'],0)
