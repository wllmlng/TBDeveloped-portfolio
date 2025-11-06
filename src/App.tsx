import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Todo from './projects/Todo/Todo';
import NestedCheckboxes from './projects/NestedCheckboxes/NestedCheckboxes';
import Carousel from './projects/Carousel/Carousel';
import ApiHealthDashboard from './projects/ApiHealthDashboard/ApiHealthDashboard';
import EventLogger from './projects/EventLogger/EventLogger'
import DeepLAutomatedTranslation from './projects/DeepLAutomatedTranslation/DeepLAutomatedTranslation';
import GalaxyDefender from './projects/GalaxyDefender/GalaxyDefender';

import './i18n'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/todo">Todo</Link>
                </li>
                <li>
                  <Link to="/nestedCheckboxes">NestedCheckboxes</Link>
                </li>
                <li>
                  <Link to="/carousel">Carousel</Link>
                </li>
                <li>
                  <Link to="/apiHealthDashboard">ApiHealthDashboard</Link>
                </li>
                <li>
                  <Link to="/eventLogger">EventLogger</Link>
                </li>
                <li>
                  <Link to="/deepLAutomatedTranslation">DeepLAutomatedTranslation</Link>
                </li>
                <li>
                  <Link to="/galaxyDefender">GalaxyDefender</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/todo" element={<Todo />} />
              <Route path="/nestedCheckboxes" element={<NestedCheckboxes />} />
              <Route path="/carousel" element={<Carousel />} />
              <Route path="/apiHealthDashboard" element={<ApiHealthDashboard />} />
              <Route path="/eventLogger" element={<EventLogger />} />
              <Route path="/deepLAutomatedTranslation" element={<DeepLAutomatedTranslation />} />
              <Route path="/galaxyDefender" element={<GalaxyDefender />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
