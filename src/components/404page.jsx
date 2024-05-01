import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <main className="w-full h-4/5 bg-slate-950 flex items-center justify-center">
        <section className="p-7 w-1/2 h-auto text-center">
            <p className="text-4xl font-semibold">Oops! Page Not Found</p>
            <p className="text-2xl font-medium m-3">The page you were looking for does not exist</p>
            <p>Go to Homepage. <Link to="/" className="text-green-700 underline">Click Here</Link> </p>
        </section>
    </main>
  )
}
export default NotFoundPage
