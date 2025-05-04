import React, {useState} from 'react'
import Filters from './components/Filters'
import StatsChart from './components/StatsChart'
import LogTable from './components/LogTable'

const App = () => {
  const [filters, setFilters] = useState({});
  return (
    <div className="bg-gray-200">
    <h1 className="text-center text-3xl p-3 font-bold">Real-Time Log Analyzer & Visualizer</h1>
    <Filters onChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))} />
    <StatsChart />
    <LogTable filters={filters} />
  </div>  )
}

export default App