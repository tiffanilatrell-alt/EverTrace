import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-slate-600 md:flex-row">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">EverTrace</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <Link to="/about" className="transition hover:text-slate-900">About Us</Link>
          <Link to="/faq" className="transition hover:text-slate-900">FAQs</Link>
          <Link to="/resources" className="transition hover:text-slate-900">Related Articles</Link>
          <a
            href="https://www.facebook.com/profile.php?id=61578069147573&sk=about"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-900"
          >
            Facebook
          </a>
          <a href="mailto:hello@evertrace.life" className="transition hover:text-slate-900">Contact</a>
          <Link to="/privacy" className="transition hover:text-slate-900">Privacy Policy</Link>
          <Link to="/terms" className="transition hover:text-slate-900">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
