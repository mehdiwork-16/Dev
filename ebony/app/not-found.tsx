import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ebony-black text-center px-6">
      <div>
        <p className="font-display text-8xl font-black text-gold-gradient mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-ebony-muted mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-gold px-8 py-3.5 text-xs tracking-[0.2em] z-10 relative inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
