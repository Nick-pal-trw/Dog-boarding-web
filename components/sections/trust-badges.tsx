import { Award, Shield, Trophy } from "lucide-react"

const badges = [
  {
    icon: Shield,
    name: "PACCC Certified",
    description: "Professional Animal Care Certification Council",
    color: "teal",
  },
  {
    icon: Award,
    name: "Fear-Free Certified",
    description: "Fear Free Certified Facility",
    color: "orange",
  },
  {
    icon: Trophy,
    name: "Best of OC 2025",
    description: "Best Pet Boarding in Orange County",
    color: "green",
  },
]

const colorClasses = {
  teal: {
    iconBox: "icon-box-teal",
    icon: "text-[#0D5C63]",
  },
  orange: {
    iconBox: "icon-box-orange",
    icon: "text-[#E86A33]",
  },
  green: {
    iconBox: "icon-box-green",
    icon: "text-green-600",
  },
}

export function TrustBadges() {
  return (
    <section className="py-12 lg:py-16 bg-background border-t border-[#0D5C63]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wide">
          Trusted and Certified
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {badges.map((badge) => {
            const colors = colorClasses[badge.color as keyof typeof colorClasses]
            return (
              <div key={badge.name} className="glass-card rounded-2xl px-6 py-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]">
                <div className={`flex size-12 items-center justify-center rounded-xl ${colors.iconBox}`}>
                  <badge.icon className={`size-6 ${colors.icon}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
