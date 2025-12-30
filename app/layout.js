import './globals.css'

export const metadata = {
  title: 'Horus Heresy Battle Repository',
  description: 'Catalog battles, engagements, and campaigns from the Horus Heresy with tabletop gaming adaptations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-slate-900 via-red-950 to-slate-900 text-gray-100">
        {children}
      </body>
    </html>
  )
}
