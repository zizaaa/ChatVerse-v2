import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import GlobalChat from "./components/chats/GlobalChat"
import PrivateChat from "./components/chats/PrivateChat"
import Index from "./components/discussion/Index"
import Form from "./components/forms/Form"
import Login from "./components/forms/Login"
import Register from "./components/forms/Register"
import authenticate from "./components/protected/auth"
import ProtectedRoute from "./components/protected/ProtectedRoutes"
import IsLogIn from "./components/protected/IsLogin"

function App() {


  return (
    <main 
      className="bg-taupe text-white flex items-center justify-center w-screen h-screen"
    >
        <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute authenticate={authenticate}>
                  <Layout/>
                </ProtectedRoute>
              }
            >
                <Route 
                  index 
                  element={
                    <GlobalChat/>
                  }
                />

                <Route 
                  path="/private-chats" 
                  element={
                    <PrivateChat/>
                  }
                />

                <Route 
                  path="/discussions" 
                  element={
                    <Index/>
                  }
                />
            </Route>

            <Route 
              path="/form" 
              element={
                <IsLogIn authenticate={authenticate}>
                  <Form/>
                </IsLogIn>
              }
            >
                <Route 
                  index 
                  element={
                    <Login/>
                  }
                />

                <Route 
                  path="/form/register" 
                  element={
                    <Register/>
                  }
                />
            </Route>

          <Route path="*" element={
            <Navigate to="/" replace />
          }/>
        </Routes>
    </main>
  )
}

export default App
