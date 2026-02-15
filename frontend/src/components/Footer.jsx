import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const healthConcerns = [
    "CHILD NUTRITION",
    "CHOLESTEROL",
    "DEPRESSION",
    "DIABETES",
    "HYPERTENSION / BP",
    "LIVER / KIDNEY",
    "MENS PROBLEMS",
  ];

  const quickLinks = [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
  ];

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-lime-300 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* Brand Section */}
            <div className="flex flex-col items-start gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">Ayurveda</div>
                <div className="text-sm text-gray-700">Medicine Store</div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="rounded-full bg-white p-2 hover:scale-110 transition-transform"
                >
                  <Facebook className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 hover:scale-110 transition-transform"
                >
                  <Twitter className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 hover:scale-110 transition-transform"
                >
                  <Instagram className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 hover:scale-110 transition-transform"
                >
                  <Youtube className="h-5 w-5 text-gray-800" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 hover:scale-110 transition-transform"
                >
                  <Send className="h-5 w-5 text-gray-800" />
                </a>
              </div>
            </div>

            {/* Shop By Concern */}
            <div>
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Shop By Concern
              </h3>
              <ul className="space-y-3">
                {healthConcerns.map((concern) => (
                  <li key={concern}>
                    <a
                      href="#"
                      className="text-sm text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      {concern}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Contact Us
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-gray-800" />
                  <div>
                    <p className="text-sm text-gray-800">+91 92121 31725</p>
                    <p className="text-sm text-gray-800">9555511725</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-gray-800" />
                  <p className="text-sm text-gray-800">
                    Info@ayurvedamedicine.com
                  </p>
                </div>

                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gray-800" />
                  <div className="text-sm text-gray-800">
                    <p>Office Address 138, Pocket -1,</p>
                    <p>Phase -1, Netaji Subhash</p>
                    <p>Apartments, Sector 13, Dwarka</p>
                    <p>New Delhi -110078</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-green-800 px-4 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white text-center md:text-left">
            Copyright © {currentYear} Ayurveda Medicine. All rights reserved.
          </p>

          <a
            href="https://wa.me/919212131725"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with us
          </a>
        </div>
      </div>
    </footer>
  );
}
