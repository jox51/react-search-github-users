import React from "react"
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom"
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react"

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const client = process.env.REACT_APP_AUTH0_CLIENT_ID

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  )
}

export default App
