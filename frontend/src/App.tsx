import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signup} from "../pages/Signup.tsx";
import {Authentication} from "../pages/Authentication.tsx";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path={"/"} element={<Signup/>}/>
          <Route path={"/authentication"} element={<Authentication/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
