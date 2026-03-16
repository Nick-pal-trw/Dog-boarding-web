"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const faqs = [
  {
    question: "Do you specialize in dogs with separation anxiety?",
    answer:
      "Absolutely! Our Peace-of-Mind Suites were specifically designed for anxious dogs. We offer sound-proof cabins, calming music, and staff trained in anxiety management techniques. Many of our clients bring dogs with separation anxiety, and we've had tremendous success helping them feel comfortable.",
  },
  {
    question: "Is there 24/7 staff on-site?",
    answer:
      "Yes, we have trained staff members on-site around the clock. Your dog is never left alone. Our overnight team conducts regular check-ins and is always available to provide comfort, handle any needs, or respond to emergencies.",
  },
  {
    question: "How do the webcam and daily reports work?",
    answer:
      "Each suite has a dedicated webcam that you can access anytime through our secure app or website. You'll also receive daily digital 'pup-reports' via email that include photos, activity summaries, feeding logs, and notes from our staff about your dog's day.",
  },
  {
    question: "Do you accommodate dogs who aren't social with others?",
    answer:
      "Yes! We understand that not every dog enjoys group play. Our VIP package includes private walks and solo playtime. We also have separate play areas and can customize a schedule that keeps your dog comfortable and stress-free.",
  },
  {
    question: "What happens in a medical emergency?",
    answer:
      "Safety is our top priority. All staff are trained in pet first aid. We have a relationship with a 24-hour emergency veterinary clinic just 5 minutes away. In case of any health concern, we contact you immediately and take swift action to ensure your dog's well-being.",
  },
]

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="faq" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-12 lg:mb-16 animate-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Got questions? We&apos;ve got answers. If you don&apos;t see what you&apos;re looking for, reach out to us directly.
          </p>
        </div>

        <Accordion type="single" collapsible className={`w-full animate-fade-up animate-fade-up-delay-1 ${isVisible ? "is-visible" : ""}`}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-foreground/80">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
