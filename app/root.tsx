import { useState } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { useLocation } from 'react-router'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import type { Route } from './+types/root'
import stylesheet from './app.scss?url'
import ToolBarProvider from './providers/ToolBarProvider'
import SidebarNavigation from './components/sidebarNavigation'
import MainContent from './components/mainContent'
import iconShrinkscreen from './medias/svg/shrinkscreen.svg'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:400,700',
  },
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [isFullscreenView, setIsFullscreenView] = useState<boolean>(false)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="../public/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {isFullscreenView ? (
          <div className="fullscreen-view p-4">
            {children}
            <button
              type="button"
              className="bg-slate-200 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded shrink-button"
              onClick={() => setIsFullscreenView(false)}
              data-tooltip-id="shrinkScreen"
              data-tooltip-content="Back to classic view"
              data-tooltip-place="top"
            >
              <img className="block w-4 h-4" src={iconShrinkscreen} alt="Return to classic view" />
            </button>
            <Tooltip id="shrinkScreen" />
          </div>
        ) : (
          <div className="wrapper grid gap-4">
            <SidebarNavigation />
            <main className="container mx-auto mt-16">
              {location.pathname === '/' ? (
                children
              ) : (
                <ToolBarProvider>
                  <MainContent onFullscreenView={() => setIsFullscreenView(true)}>{children}</MainContent>
                </ToolBarProvider>
              )}
            </main>
          </div>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-center">
      <span className="text-gray-500 text-6xl block mb-4">
        <span>{message}</span>
      </span>
      <span className="text-gray-500 text-xl">{details}</span>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
