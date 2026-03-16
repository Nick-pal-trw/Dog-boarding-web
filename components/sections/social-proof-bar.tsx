"use client"

import { Heart, Star, ShieldCheck, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const stats = [
  {
    icon: Heart,
    value: "4,500+",
    label: "Happy Stays",
    color: "orange",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Star Rating",
    color: "orange",
  },
  {
    icon: ShieldCheck,
    value: "0",
    label: "Safety Incidents",
    color: "teal",
  },
  {
    icon: Users,
    value: "Certified",
    label: "Canine Handlers",
    color: "teal",
  },
]

const colorClasses = {
  orange: {
    iconBox: "icon-box-orange",
    icon: "text-[#E86A33]",
    value: "text-[#E86A33]",
  },
  teal: {
    iconBox: "icon-box-teal",
    icon: "text-[#0D5C63]",
    value: "text-[#0D5C63]",
  },
}

export function SocialProofBar() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => {
            const colors = colorClasses[stat.color as keyof typeof colorClasses]
            return (
              <div 
                key={stat.label} 
                className={`glass-card rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center animate-scale-in ${isVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`${colors.iconBox} rounded-xl p-3 mb-4`}>
                  <stat.icon className={`size-6 lg:size-7 ${colors.icon}`} />
                </div>
                <span className={`text-3xl lg:text-4xl font-bold tracking-tight ${colors.value}`}>
                  {stat.value}
                </span>
                <span className="mt-2 text-sm lg:text-base font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
