import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-[#0D5C63] via-[#0D5C63] to-[#095257]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground lg:text-6xl text-balance">
            Your Dog&apos;s Luxury Home Away From Home.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 lg:text-xl text-balance">
            The Peace-of-Mind Suite: 24/7 camera-monitored private cabins with daily digital pup-reports. Designed for the most anxious shadows.
          </p>
          <div className="mt-10">
            <Link href="/book">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 animate-pulse-accent text-lg px-8 py-6"
              >
                Check Availability
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            No commitment required. We&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 35.2C384 37 480 49 576 52.5C672 56 768 51 864 47.7C960 44.3 1056 42.7 1152 45C1248 47.3 1344 53.7 1392 56.8L1440 60V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
