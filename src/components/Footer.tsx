import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full bg-primary py-16 lg:py-20 border-t border-primary-foreground/10">
      <div className="max-w-[120rem] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl text-primary-foreground tracking-wide">
                GALLERY
              </span>
            </Link>
            <p className="font-paragraph text-base text-primary-foreground/60 max-w-sm">
              A curated collection of visual excellence and inspiring imagery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg text-primary-foreground mb-6">
              Navigation
            </h3>
            <nav className="space-y-3">
              <a
                href="#gallery"
                className="block font-paragraph text-base text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="block font-paragraph text-base text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg text-primary-foreground mb-6">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <p className="font-paragraph text-base text-primary-foreground/60">
                info@gallery.com
              </p>
              <p className="font-paragraph text-base text-primary-foreground/60">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/50">
              © {currentYear} Gallery. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
