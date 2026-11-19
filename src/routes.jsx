import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Academics from './pages/Academics.jsx'
import Campus from './pages/Campus.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'academics', element: <Academics /> },
      { path: 'campus', element: <Campus /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'contact', element: <Contact /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
