// Legal page is a normal page within the main site — it uses the shared
// Navbar/Footer/FloatingButtons from the root layout. This nested layout
// only overrides page metadata for routes under /legal.
export const metadata = {
  title: 'IndusVertex Law Firm — Legal Advisory & Litigation Services',
  description: 'IndusVertex Law Firm provides legal, compliance, litigation and advisory services to Industries, Corporates, Banks, NBFCs and Individual Clients across India.',
};

export default function LegalLayout({ children }) {
  return children;
}
