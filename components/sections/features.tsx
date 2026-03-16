"use client"

import { Gamepad2, Home, Stethoscope } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: Gamepad2,
    title: "Stay-and-Play Daycare",
    description:
      "Indoor/outdoor social play with temperament testing. Your pup will enjoy supervised playtime with compatible friends in our secure, climate-controlled facility.",
    color: "orange",
  },
  {
    icon: Home,
    title: "Peace-of-Mind Suite",
    description:
      "Sound-proof private cabins with 24/7 webcam access and orthopedic beds. Watch your furry friend anytime, anywhere with our live streaming technology.",
    color: "teal",
  },
  {
    icon: Stethoscope,
    title: "Premium Wellness",
    description:
      "Daily health checks and medication administration by trained staff. We monitor your dog's well-being and keep you informed with detailed daily reports.",
    color: "green",
  },
]

const colorClasses = {
  orange: {
    iconBox: "icon-box-orange",
    icon: "text-[#E86A33]",
  },
  teal: {
    iconBox: "icon-box-teal",
    icon: "text-[#0D5C63]",
  },
  green: {
    iconBox: "icon-box-green",
    icon: "text-green-600",
  },
}

export function Features() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-12 lg:mb-16 animate-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl text-balance">
            Everything Your Dog Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            From active playtime to restful retreats, we provide comprehensive care tailored to your dog&apos;s unique personality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses]
            return (
              <Card
                key={feature.title}
                className={`glass-card transition-all duration-300 hover:scale-[1.02] animate-fade-up animate-fade-up-delay-${index + 1} ${isVisible ? "is-visible" : ""}`}
              >
                <CardHeader>
                  <div className={`mb-4 inline-flex size-14 items-center justify-center rounded-xl ${colors.iconBox}`}>
                    <feature.icon className={`size-7 ${colors.icon}`} />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
