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
              </ul>
            </nav>

            <Routes>
              <Route path="/todo" element={<Todo />} />
              <Route path="/nestedCheckboxes" element={<NestedCheckboxes />} />
              <Route path="/carousel" element={<Carousel />} />
              <Route path="/apiHealthDashboard" element={<ApiHealthDashboard />} />
              <Route path="/eventLogger" element={<EventLogger />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
