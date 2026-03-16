"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    name: "Sarah M.",
    location: "Irvine, CA",
    dogName: "Barnaby",
    avatar: "SM",
    content:
      "I was terrified to leave Barnaby. Seeing him on the 24/7 camera changed everything. He came home happy and relaxed!",
    rating: 5,
  },
  {
    name: "Michael R.",
    location: "Newport Beach, CA",
    dogName: "Cooper",
    avatar: "MR",
    content:
      "The daily reports and photos gave me such peace of mind during my business trip. Truly exceptional care.",
    rating: 5,
  },
  {
    name: "Jessica T.",
    location: "Laguna Beach, CA",
    dogName: "Luna",
    avatar: "JT",
    content:
      "My anxious rescue finally found a place where she feels safe. The staff truly understands dogs with special needs.",
    rating: 5,
  },
]

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-12 lg:mb-16 animate-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl text-balance">
            What Pet Parents Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Don&apos;t just take our word for it. Hear from families who trusted us with their beloved pets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`glow-card-teal transition-all duration-300 hover:scale-[1.02] animate-fade-up animate-fade-up-delay-${index + 1} ${isVisible ? "is-visible" : ""}`}
            >
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#E86A33] text-[#E86A33]" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-foreground leading-relaxed text-base mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#0D5C63]/10">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0D5C63] to-[#1A7A82] text-white text-sm font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location} &middot; {testimonial.dogName}&apos;s parent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
