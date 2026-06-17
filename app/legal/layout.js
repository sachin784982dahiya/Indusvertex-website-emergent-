// Standalone layout for the legal page — no Navbar, Footer, or FloatingButtons.
// This overrides the root layout for all routes under /legal.
export const metadata = {
  title: 'IndusVertex Law Firm — Legal Advisory & Litigation Services',
  description: 'IndusVertex Law Firm provides legal, compliance, litigation and advisory services to Industries, Corporates, Banks, NBFCs and Individual Clients across India.',
};

export default function LegalLayout({ children }) {
  return children;
}
