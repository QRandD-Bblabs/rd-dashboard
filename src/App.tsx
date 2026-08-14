import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ExecutiveOverview } from './pages/ExecutiveOverview';
import { Portfolio } from './pages/Portfolio';
import { InitiativeDetail } from './pages/InitiativeDetail';
import { Roadmap } from './pages/Roadmap';
import { Capacity } from './pages/Capacity';
import { OperatingModel } from './pages/OperatingModel';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminSolutions } from './pages/admin/AdminSolutions';
import { AdminInitiatives } from './pages/admin/AdminInitiatives';
import { AdminRisks } from './pages/admin/AdminRisks';
import { AdminCapacity } from './pages/admin/AdminCapacity';
import { AdminOpportunities } from './pages/admin/AdminOpportunities';
import { AdminRoadmap } from './pages/admin/AdminRoadmap';
import { AdminKnowledge } from './pages/admin/AdminKnowledge';
import { AdminAccelerator } from './pages/admin/AdminAccelerator';
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
        <Route path="opportunities" element={<AdminOpportunities />} />
        <Route path="roadmap" element={<AdminRoadmap />} />
        <Route path="knowledge" element={<AdminKnowledge />} />
        <Route path="accelerator" element={<AdminAccelerator />} />
      </Route>

      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<ExecutiveOverview />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/initiative/:id" element={<InitiativeDetail />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/capacity" element={<Capacity />} />
              <Route path="/operating-model" element={<OperatingModel />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
