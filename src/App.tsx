import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ExecutiveOverview } from './pages/ExecutiveOverview';
import { Portfolio } from './pages/Portfolio';
import { ClaraCommandCenter } from './pages/ClaraCommandCenter';
import { Roadmap } from './pages/Roadmap';
import { OpportunityPipeline } from './pages/OpportunityPipeline';
import { Capacity } from './pages/Capacity';
import { SolutionInventory } from './pages/SolutionInventory';
import { KnowledgeAccelerator } from './pages/KnowledgeAccelerator';
import { RisksDecisions } from './pages/RisksDecisions';
import { OperatingModel } from './pages/OperatingModel';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ExecutiveOverview />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/clara" element={<ClaraCommandCenter />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/opportunities" element={<OpportunityPipeline />} />
        <Route path="/capacity" element={<Capacity />} />
        <Route path="/solutions" element={<SolutionInventory />} />
        <Route path="/knowledge" element={<KnowledgeAccelerator />} />
        <Route path="/risks" element={<RisksDecisions />} />
        <Route path="/operating-model" element={<OperatingModel />} />
      </Routes>
    </Layout>
  );
}

export default App;
