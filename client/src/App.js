import Homepage from './pages/Homepage'
import Onboarding from "./pages/Onboarding";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import {useCookies} from "react-cookie";
const App = () => {
    const[cookies,setCookie, removeCookie] = useCookies(['user'])

    const token = cookies.Token

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            {token && <Route path="/dashboard" element={<Dashboard/>}/>}
            {token && <Route path="/onboarding" element={<Onboarding/>}/>}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
