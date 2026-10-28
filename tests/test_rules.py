import unittest,sys,copy
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parents[1]/'server'))
from engine import generate,validate_match,orchestrate,overlay_packet,match_recap,contextual_narrative
class CompetitionRulesTests(unittest.TestCase):
 def setUp(self):self.m=generate()
 def test_synthetic_validation(self):self.assertTrue(validate_match(self.m))
 def test_real_data_rejected(self):
  m=copy.deepcopy(self.m);m['metadata']['synthetic']=False
  with self.assertRaises(ValueError):validate_match(m)
 def test_illegal_coords_rejected(self):
  m=copy.deepcopy(self.m);m['events'][0]['x']=999
  with self.assertRaises(ValueError):validate_match(m)
 def test_all_audiences_differ(self):
  e=self.m['events'][5]
  self.assertEqual(len({contextual_narrative(e,a,'en') for a in ('fan','broadcast','analyst')}),3)
 def test_machine_readable_overlay(self):
  o=overlay_packet(self.m,10);self.assertEqual(o['schema'],'bodymap.overlay.v1');self.assertEqual(o['display_ms'],600000)
 def test_failure_fallback(self):
  r=orchestrate(self.m,2,inject_failure='Gesture Intelligence');self.assertEqual(r['handoffs'][2]['status'],'fallback')
 def test_recap(self):self.assertEqual(len(match_recap(self.m)['key_moments']),5)
 def test_bad_mode(self):
  with self.assertRaises(ValueError):orchestrate(self.m,1,audience='unknown')
if __name__=='__main__':unittest.main()
