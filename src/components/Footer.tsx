import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full bg-primary py-16 lg:py-20 border-t border-accentcyan/20">
      <div className="max-w-[120rem] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl text-transparent bg-clip-text bg-gradient-to-r from-accentcyan to-accentmagenta tracking-wider">
                VIENTO +
              </span>
            </Link>
            <p className="font-paragraph text-base text-primary-foreground/70 max-w-sm">
              Showcasing visual excellence through innovative design and curated imagery.
            </p>
          </div>

          {/* Quick Links */}
          <div id="about">
            <h3 className="font-heading text-xl text-primary-foreground mb-6">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <a
                href="#gallery"
                className="block font-paragraph text-base text-primary-foreground/70 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accentcyan hover:to-accentmagenta transition-all duration-300"
              >
                Gallery
              </a>
              <a
                href="#about"
                className="block font-paragraph text-base text-primary-foreground/70 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accentcyan hover:to-accentmagenta transition-all duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="block font-paragraph text-base text-primary-foreground/70 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accentcyan hover:to-accentmagenta transition-all duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-6">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <p className="font-paragraph text-base text-primary-foreground/70">
                info@viento.gallery
              </p>
              <p className="font-paragraph text-base text-primary-foreground/70">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accentcyan/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              © {currentYear} Viento Gallery. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accentcyan hover:to-accentmagenta transition-all duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accentcyan hover:to-accentmagenta transition-all duration-300"
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
