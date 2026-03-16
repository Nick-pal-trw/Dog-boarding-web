"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingForm } from "@/components/booking-form"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const plans = [
  {
    name: "Standard Luxury",
    price: "$75",
    period: "per night",
    description: "Perfect for social dogs who love making friends",
    features: [
      "Private suite with orthopedic bed",
      "24/7 webcam access",
      "Group play sessions (2x daily)",
      "Daily photo updates",
      "Fresh water & premium food",
    ],
    popular: false,
  },
  {
    name: "VIP (Very Important Pup)",
    price: "$110",
    period: "per night",
    description: "Premium care for dogs who deserve the best",
    features: [
      "Everything in Standard Luxury",
      "1-on-1 private walks (3x daily)",
      "Nightly grooming & brush-out",
      "Extended playtime sessions",
      "Video call with your pup",
      "Turndown service with treats",
    ],
    popular: true,
  },
]

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-12 lg:mb-16 animate-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose the perfect package for your pup. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-300 hover:scale-[1.02] animate-fade-up animate-fade-up-delay-${index + 1} ${isVisible ? "is-visible" : ""} ${
                plan.popular 
                  ? "glow-card-orange border-accent border-2" 
                  : "glow-card-teal"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl lg:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="size-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <BookingForm>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    size="lg"
                  >
                    Reserve Now
                  </Button>
                </BookingForm>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
