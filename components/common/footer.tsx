import Link from "next/link";
import { ArrowRight, FileText, Github, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: "Pricing", href: "/#pricing" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Dashboard", href: "/dashboard" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container mx-auto py-12 lg:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-gray-200">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Quicker</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Transform lengthy PDFs into clear, concise summaries in seconds. Save hours of reading time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Quicker. All rights reserved.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors duration-150"
          >
            Start summarizing free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;