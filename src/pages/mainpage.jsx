import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"

//layout
import RootLayout from '../layout/RootLayout'

//components
import Home from '../components/home'
import Test from '../components/test-network'

import supabase from '../config/supabaseClient'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/testnetwork" element={<Test />}/>
    </Route>
  )
)

const mainpage = () => {
  console.log(supabase)
  return (
    <main className="w-full h-screen font-poppins bg-slate-950 text-white">
      <RouterProvider router={router}/>
    </main>
  )
}

export default mainpage