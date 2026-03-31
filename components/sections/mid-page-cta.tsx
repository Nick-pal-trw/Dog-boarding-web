import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MidPageCTA() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-[#0D5C63] via-[#0D5C63] to-[#095257]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground lg:text-3xl text-balance">
            Ready to Book Your Pup&apos;s Stay?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto text-balance">
            Join thousands of happy pet parents who trust us with their furry family members.
          </p>
          <div className="mt-8">
            <Link href="/book">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8"
              >
                Check Availability
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
