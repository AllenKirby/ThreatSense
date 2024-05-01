import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"

//layout
import RootLayout from '../layout/RootLayout'

//components
import Home from '../components/home'
import CheckFile from '../components/checkfile'
import NotFoundPage from "../components/404page"
import Output from "../components/output"

import supabase from '../config/supabaseClient'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/checkfile" element={<CheckFile />}/>
      <Route path="/:prediction" element={<Output/>} />


      <Route path="*" element={<NotFoundPage/>} />
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