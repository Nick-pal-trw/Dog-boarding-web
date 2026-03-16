import Link from "next/link"
import { PawPrint, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/booking-form"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="size-8" />
              <span className="text-lg font-semibold">The Pawsome Retreat</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Premium dog boarding in Orange County. Where your furry family members get the luxury treatment they deserve.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Pawsome Lane<br />
                  Orange County, CA 92618
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0" />
                <a href="tel:+19495551234" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  (949) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0" />
                <a href="mailto:hello@pawsomeretreat.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  hello@pawsomeretreat.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & CTA */}
          <div>
            <h3 className="font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0" />
                <span className="text-primary-foreground/80">Drop-off: 7am - 7pm</span>
              </li>
              <li className="pl-8 text-primary-foreground/80">Pick-up: 7am - 7pm</li>
              <li className="pl-8 text-primary-foreground/80">Staff on-site: 24/7</li>
            </ul>
            <BookingForm>
              <Button
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Start Your Reservation
              </Button>
            </BookingForm>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 rounded-lg bg-primary-foreground/10 p-8 text-center">
          <MapPin className="size-12 mx-auto mb-4 text-primary-foreground/50" />
          <p className="text-primary-foreground/70">
            Conveniently located in the heart of Orange County
          </p>
          <p className="text-sm text-primary-foreground/50 mt-2">
            Interactive map coming soon
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} The Pawsome Retreat. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
