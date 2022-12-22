import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/globals.css'
import { StateContextProvider } from '../context'

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex mr-10 sm:mr-0 relative">
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </div>
    </StateContextProvider>
  )
}
