"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Facility knowledge base for the AI to answer from
const FACILITY_INFO = {
  name: "The Pawsome Retreat",
  location: "2847 Coastal Highway, Laguna Beach, CA 92651",
  phone: "(949) 555-PAWS",
  email: "hello@pawsomeretreat.com",
  hours: "Drop-off/Pick-up: 7am - 7pm daily. Staff on-site 24/7.",
  pricing: {
    standard: "$75/night — Private suite, orthopedic bed, 24/7 webcam, 2x daily group play, daily photo updates, premium food.",
    vip: "$110/night — Everything in Standard plus 3x daily private walks, nightly grooming, extended playtime, video calls with your pup, turndown service with treats.",
  },
  vaccinations: "Required: Rabies (current), DHPP/Distemper (current), Bordetella/Kennel Cough (within 12 months). All records must be from a licensed vet. Please bring records or email them at least 48 hours before check-in.",
  requirements: "All dogs must be spayed/neutered (exceptions for puppies under 6 months). Current flea/tick prevention required. Dogs must pass a brief temperament evaluation on first visit.",
  amenities: "Soundproof private cabins, orthopedic beds, 24/7 webcam access, outdoor play yards, splash pool (summer), climate-controlled rooms.",
  specialNeeds: "We accommodate dogs with anxiety, special diets, and medication schedules. Our staff is Fear-Free certified.",
  cancellation: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are charged one night's stay.",
  capacity: "We have 30 private suites. During holidays (Thanksgiving, Christmas, July 4th), we recommend booking 2-3 weeks in advance.",
}

// Simple keyword-based responses (no real AI needed for prototype)
function getResponse(message: string): string {
  const msg = message.toLowerCase()

  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate")) {
    return `We have two packages:\n\n**Standard Luxury:** ${FACILITY_INFO.pricing.standard}\n\n**VIP:** ${FACILITY_INFO.pricing.vip}\n\nWould you like to book a stay?`
  }

  if (msg.includes("vaccine") || msg.includes("vaccination") || msg.includes("shot") || msg.includes("record")) {
    return `**Required vaccinations:**\n\n${FACILITY_INFO.vaccinations}\n\nYou can upload records during the booking process, or email them to ${FACILITY_INFO.email}.`
  }

  if (msg.includes("hour") || msg.includes("open") || msg.includes("time") || msg.includes("drop off") || msg.includes("pick up") || msg.includes("drop-off") || msg.includes("pick-up")) {
    return `**Hours:** ${FACILITY_INFO.hours}\n\nDrop-off and pick-up are available anytime during operating hours. No appointment needed!`
  }

  if (msg.includes("location") || msg.includes("where") || msg.includes("address") || msg.includes("direction")) {
    return `We're located at **${FACILITY_INFO.location}**.\n\nRight off the Pacific Coast Highway, easy to find! Give us a call if you need directions: ${FACILITY_INFO.phone}`
  }

  if (msg.includes("cancel") || msg.includes("refund")) {
    return `**Cancellation Policy:** ${FACILITY_INFO.cancellation}`
  }

  if (msg.includes("anxiety") || msg.includes("nervous") || msg.includes("scared") || msg.includes("special need") || msg.includes("medication") || msg.includes("medicine")) {
    return `${FACILITY_INFO.specialNeeds}\n\nWe specialize in dogs with separation anxiety. Each anxious pup gets a personalized comfort plan. Just let us know during booking!`
  }

  if (msg.includes("require") || msg.includes("need") || msg.includes("bring") || msg.includes("what do i")) {
    return `**What you'll need:**\n\n${FACILITY_INFO.requirements}\n\n**Vaccination records:** ${FACILITY_INFO.vaccinations}\n\nYou can also bring your dog's favorite toy or blanket for comfort!`
  }

  if (msg.includes("book") || msg.includes("reserve") || msg.includes("available") || msg.includes("availability") || msg.includes("spot") || msg.includes("space")) {
    return `We'd love to host your pup! You can check availability and book directly on our website.\n\n${FACILITY_INFO.capacity}\n\nClick the **"Book a Suite"** button to get started!`
  }

  if (msg.includes("amenit") || msg.includes("facility") || msg.includes("room") || msg.includes("suite") || msg.includes("cabin")) {
    return `**Our amenities:**\n\n${FACILITY_INFO.amenities}\n\nEvery suite is designed for maximum comfort and your peace of mind.`
  }

  if (msg.includes("webcam") || msg.includes("camera") || msg.includes("watch") || msg.includes("monitor") || msg.includes("see my dog")) {
    return `Yes! All suites have **24/7 webcam access**. You'll get a private link after check-in so you can watch your pup anytime.\n\nVIP guests also get scheduled **video calls** with their dog!`
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good afternoon")) {
    return `Hi there! Welcome to The Pawsome Retreat! 🐾\n\nI can help you with:\n- Pricing & packages\n- Vaccination requirements\n- Hours & location\n- Booking a stay\n- Special needs accommodation\n\nWhat would you like to know?`
  }

  if (msg.includes("thank")) {
    return `You're welcome! If you have any other questions, I'm here to help. We can't wait to meet your pup! 🐾`
  }

  // Default fallback - lead capture opportunity
  return `Great question! I want to make sure you get the best answer. Could you leave your name and email, and our team will get back to you within a few hours?\n\nOr you can call us directly at **${FACILITY_INFO.phone}** during business hours.`
}

interface ChatMessage {
  id: number
  role: "user" | "assistant"
  content: string
}

// Lead capture state
interface LeadForm {
  name: string
  email: string
  phone: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm the Pawsome Retreat assistant. I can answer questions about our facility, pricing, vaccination requirements, and more. How can I help? 🐾",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", email: "", phone: "" })
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Show lead form after 4 messages from user
  useEffect(() => {
    if (messageCount >= 4 && !leadCaptured && !showLeadForm) {
      setShowLeadForm(true)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content:
            "You seem interested! Would you like us to save your info so we can follow up with personalized recommendations?",
        },
      ])
    }
  }, [messageCount, leadCaptured, showLeadForm])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setMessageCount((c) => c + 1)

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(userMessage.content)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
        },
      ])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  const handleLeadSubmit = () => {
    if (!leadForm.name.trim() || !leadForm.email.trim()) return
    setLeadCaptured(true)
    setShowLeadForm(false)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "assistant",
        content: `Thanks ${leadForm.name}! We've got your info. Our team will reach out to you at ${leadForm.email} soon. In the meantime, feel free to keep asking questions!`,
      },
    ])
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-full shadow-lg hover:bg-accent/90 transition-all hover:scale-105"
        >
          <MessageCircle className="size-5" />
          <span className="font-medium text-sm">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[550px] flex flex-col rounded-2xl shadow-2xl border border-border overflow-hidden bg-background">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Pawsome Assistant</p>
                <p className="text-xs text-primary-foreground/70">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/10 rounded-md transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[350px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="size-4" />
                  ) : (
                    <Bot className="size-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-1" : ""}>
                      {line.split("**").map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j}>{part}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="size-7 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="size-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="size-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="size-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Lead Capture Form */}
            {showLeadForm && !leadCaptured && (
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 space-y-2">
                <Input
                  placeholder="Your name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Email address"
                  type="email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Phone (optional)"
                  type="tel"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="h-8 text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleLeadSubmit}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-8 text-xs"
                  >
                    Submit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowLeadForm(false)}
                    className="h-8 text-xs"
                  >
                    Skip
                  </Button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 h-10"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="bg-accent text-accent-foreground hover:bg-accent/90 size-10 shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
