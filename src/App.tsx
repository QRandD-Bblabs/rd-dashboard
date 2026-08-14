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
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminSolutions } from './pages/admin/AdminSolutions';
import { AdminInitiatives } from './pages/admin/AdminInitiatives';
import { AdminRisks } from './pages/admin/AdminRisks';
import { AdminCapacity } from './pages/admin/AdminCapacity';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<div className="mx-auto max-w-[1000px] px-4 py-8">{<AdminLogin />}</div>} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8">
              <AdminHome />
            </div>
          </ProtectedRoute>
        }
      >
        <Route path="solutions" element={<AdminSolutions />} />
        <Route path="initiatives" element={<AdminInitiatives />} />
        <Route path="risks" element={<AdminRisks />} />
        <Route path="capacity" element={<AdminCapacity />} />
      </Route>

      <Route
        path="/*"
        element={
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
        }
      />
    </Routes>
  );
}

export default App;
