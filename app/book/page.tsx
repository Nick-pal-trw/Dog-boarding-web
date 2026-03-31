"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { format, differenceInDays } from "date-fns"
import { DateRange } from "react-day-picker"
import {
  PawPrint,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Dog,
  CreditCard,
  CheckCircle2,
  Upload,
  Star,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STEPS = [
  { id: 1, label: "Dates", icon: CalendarDays },
  { id: 2, label: "Pet Info", icon: Dog },
  { id: 3, label: "Package", icon: Star },
  { id: 4, label: "Payment", icon: CreditCard },
  { id: 5, label: "Confirmed", icon: CheckCircle2 },
]

const PACKAGES = [
  {
    id: "standard",
    name: "Standard Luxury",
    price: 75,
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
    id: "vip",
    name: "VIP (Very Important Pup)",
    price: 110,
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

// Fake availability data - some dates are "limited" or "full"
function getDateStatus(date: Date): "available" | "limited" | "full" {
  const day = date.getDate()
  const month = date.getMonth()
  // Simulate some full/limited dates
  if (day === 15 || day === 16 || day === 25) return "full"
  if (day === 14 || day === 17 || day === 24 || day === 26) return "limited"
  if (month === 6 && (day >= 1 && day <= 7)) return "limited" // summer busy
  return "available"
}

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    dogName: "",
    breed: "",
    age: "",
    weight: "",
    spayNeuter: "",
    feedingInstructions: "",
    medications: "",
    behaviorNotes: "",
    specialRequests: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = () => {
    // Fake file upload
    setUploadedFiles((prev) => [...prev, `vaccination-record-${prev.length + 1}.pdf`])
  }

  const numberOfNights = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from)
    }
    return 0
  }, [dateRange])

  const selectedPlan = PACKAGES.find((p) => p.id === selectedPackage)
  const totalPrice = selectedPlan ? selectedPlan.price * numberOfNights : 0

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.ownerName.trim()) newErrors.ownerName = "Required"
    if (!formData.email.trim()) newErrors.email = "Required"
    if (!formData.phone.trim()) newErrors.phone = "Required"
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Required"
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Required"
    if (!formData.dogName.trim()) newErrors.dogName = "Required"
    if (!formData.breed.trim()) newErrors.breed = "Required"
    if (!formData.age.trim()) newErrors.age = "Required"
    if (!formData.weight.trim()) newErrors.weight = "Required"
    if (!formData.spayNeuter) newErrors.spayNeuter = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && (!dateRange?.from || !dateRange?.to)) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && !selectedPackage) return
    if (step === 4) {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setStep(5)
      }, 2000)
      return
    }
    setStep((s) => Math.min(s + 1, 5))
  }

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <PawPrint className="size-8 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                The Pawsome Retreat
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Steps */}
          {step < 5 && (
            <div className="mb-10">
              <div className="flex items-center justify-between">
                {STEPS.filter((s) => s.id < 5).map((s, i) => {
                  const Icon = s.icon
                  const isActive = step === s.id
                  const isCompleted = step > s.id
                  return (
                    <div key={s.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex items-center justify-center size-10 rounded-full border-2 transition-all ${
                            isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : isActive
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="size-5" />
                          ) : (
                            <Icon className="size-5" />
                          )}
                        </div>
                        <span
                          className={`mt-2 text-xs font-medium ${
                            isActive ? "text-accent" : isCompleted ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-3 mt-[-20px] ${
                            step > s.id ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  When is your pup staying?
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Select your check-in and check-out dates
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">Limited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <span className="text-muted-foreground">Full</span>
                </div>
              </div>

              <Card className="glass-card">
                <CardContent className="flex justify-center pt-6">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => {
                      if (date < tomorrow) return true
                      return getDateStatus(date) === "full"
                    }}
                    modifiers={{
                      limited: (date) => getDateStatus(date) === "limited",
                    }}
                    modifiersClassNames={{
                      limited: "!bg-yellow-100 !text-yellow-800",
                    }}
                  />
                </CardContent>
              </Card>

              {dateRange?.from && dateRange?.to && (
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-semibold text-foreground">
                          {format(dateRange.from, "EEE, MMM d, yyyy")}
                        </p>
                      </div>
                      <ArrowRight className="size-5 text-muted-foreground" />
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-semibold text-foreground">
                          {format(dateRange.to, "EEE, MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Badge variant="secondary" className="text-sm">
                        {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Pet & Owner Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Tell us about you & your pup
                </h1>
                <p className="mt-2 text-muted-foreground">
                  We need a few details to prepare for your dog&apos;s stay
                </p>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Owner Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Full Name *</FieldLabel>
                        <Input
                          placeholder="John Smith"
                          value={formData.ownerName}
                          onChange={(e) => handleChange("ownerName", e.target.value)}
                          aria-invalid={!!errors.ownerName}
                        />
                        {errors.ownerName && <FieldError>{errors.ownerName}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel>Email *</FieldLabel>
                        <Input
                          type="email"
                          placeholder="john@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <FieldError>{errors.email}</FieldError>}
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Phone *</FieldLabel>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <FieldError>{errors.phone}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel>Emergency Contact *</FieldLabel>
                        <Input
                          placeholder="Jane Smith"
                          value={formData.emergencyContact}
                          onChange={(e) => handleChange("emergencyContact", e.target.value)}
                          aria-invalid={!!errors.emergencyContact}
                        />
                        {errors.emergencyContact && <FieldError>{errors.emergencyContact}</FieldError>}
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel>Emergency Contact Phone *</FieldLabel>
                      <Input
                        type="tel"
                        placeholder="(555) 987-6543"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                        aria-invalid={!!errors.emergencyPhone}
                      />
                      {errors.emergencyPhone && <FieldError>{errors.emergencyPhone}</FieldError>}
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Dog Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Dog&apos;s Name *</FieldLabel>
                        <Input
                          placeholder="Buddy"
                          value={formData.dogName}
                          onChange={(e) => handleChange("dogName", e.target.value)}
                          aria-invalid={!!errors.dogName}
                        />
                        {errors.dogName && <FieldError>{errors.dogName}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel>Breed *</FieldLabel>
                        <Input
                          placeholder="Golden Retriever"
                          value={formData.breed}
                          onChange={(e) => handleChange("breed", e.target.value)}
                          aria-invalid={!!errors.breed}
                        />
                        {errors.breed && <FieldError>{errors.breed}</FieldError>}
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field>
                        <FieldLabel>Age *</FieldLabel>
                        <Input
                          placeholder="3 years"
                          value={formData.age}
                          onChange={(e) => handleChange("age", e.target.value)}
                          aria-invalid={!!errors.age}
                        />
                        {errors.age && <FieldError>{errors.age}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel>Weight *</FieldLabel>
                        <Input
                          placeholder="65 lbs"
                          value={formData.weight}
                          onChange={(e) => handleChange("weight", e.target.value)}
                          aria-invalid={!!errors.weight}
                        />
                        {errors.weight && <FieldError>{errors.weight}</FieldError>}
                      </Field>
                      <Field>
                        <FieldLabel>Spayed/Neutered *</FieldLabel>
                        <Select
                          value={formData.spayNeuter}
                          onValueChange={(val) => handleChange("spayNeuter", val)}
                        >
                          <SelectTrigger aria-invalid={!!errors.spayNeuter}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.spayNeuter && <FieldError>{errors.spayNeuter}</FieldError>}
                      </Field>
                    </div>
                  </FieldGroup>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Vaccination Records</CardTitle>
                  <CardDescription>
                    Required: Rabies, DHPP (Distemper), and Bordetella (Kennel Cough). Must be current.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFileUpload}
                      className="w-full border-dashed border-2 h-20 flex flex-col gap-1"
                    >
                      <Upload className="size-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload vaccination records (PDF, JPG, PNG)
                      </span>
                    </Button>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file}
                        className="flex items-center gap-2 rounded-md bg-secondary p-3 text-sm"
                      >
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Care Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel>Feeding Instructions</FieldLabel>
                      <Textarea
                        placeholder="e.g., 1 cup of dry food twice daily (morning and evening). Brand: Blue Buffalo."
                        value={formData.feedingInstructions}
                        onChange={(e) => handleChange("feedingInstructions", e.target.value)}
                        className="min-h-20"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Medications</FieldLabel>
                      <Textarea
                        placeholder="e.g., Apoquel 16mg once daily with food for allergies."
                        value={formData.medications}
                        onChange={(e) => handleChange("medications", e.target.value)}
                        className="min-h-20"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Behavioral Notes</FieldLabel>
                      <Textarea
                        placeholder="e.g., Friendly with other dogs but anxious during thunderstorms. Loves belly rubs."
                        value={formData.behaviorNotes}
                        onChange={(e) => handleChange("behaviorNotes", e.target.value)}
                        className="min-h-20"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Special Requests</FieldLabel>
                      <Textarea
                        placeholder="e.g., Please give extra blankets at night, he gets cold."
                        value={formData.specialRequests}
                        onChange={(e) => handleChange("specialRequests", e.target.value)}
                        className="min-h-20"
                      />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Package Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Choose {formData.dogName || "your pup"}&apos;s package
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {numberOfNights} {numberOfNights === 1 ? "night" : "nights"} &middot;{" "}
                  {dateRange?.from && format(dateRange.from, "MMM d")} -{" "}
                  {dateRange?.to && format(dateRange.to, "MMM d, yyyy")}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {PACKAGES.map((plan) => {
                  const isSelected = selectedPackage === plan.id
                  const planTotal = plan.price * numberOfNights
                  return (
                    <Card
                      key={plan.id}
                      className={`relative cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-accent glow-card-orange"
                          : "glass-card hover:scale-[1.02]"
                      } ${plan.popular ? "border-accent border-2" : ""}`}
                      onClick={() => setSelectedPackage(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                          Most Popular
                        </Badge>
                      )}
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="size-6 text-accent" />
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-foreground">
                            ${plan.price}
                          </span>
                          <span className="text-muted-foreground ml-2">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="size-4 text-accent shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <div className="w-full text-center">
                          <p className="text-lg font-bold text-foreground">
                            Total: ${planTotal}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            for {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Review & Pay
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Review your booking details below
                </p>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-muted-foreground">Guest</span>
                    <span className="font-medium text-right">{formData.dogName} ({formData.breed})</span>

                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium text-right">{formData.ownerName}</span>

                    <span className="text-muted-foreground">Check-in</span>
                    <span className="font-medium text-right">
                      {dateRange?.from && format(dateRange.from, "EEE, MMM d, yyyy")}
                    </span>

                    <span className="text-muted-foreground">Check-out</span>
                    <span className="font-medium text-right">
                      {dateRange?.to && format(dateRange.to, "EEE, MMM d, yyyy")}
                    </span>

                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-right">
                      {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
                    </span>

                    <span className="text-muted-foreground">Package</span>
                    <span className="font-medium text-right">{selectedPlan?.name}</span>

                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium text-right">${selectedPlan?.price}/night</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-accent">${totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                  <CardDescription>
                    Your payment will be held for 24 hours while we review your pet&apos;s records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel>Card Number</FieldLabel>
                      <Input placeholder="4242 4242 4242 4242" />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Expiry</FieldLabel>
                        <Input placeholder="MM / YY" />
                      </Field>
                      <Field>
                        <FieldLabel>CVC</FieldLabel>
                        <Input placeholder="123" />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel>Name on Card</FieldLabel>
                      <Input placeholder="John Smith" defaultValue={formData.ownerName} />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>

              <p className="text-xs text-center text-muted-foreground">
                By clicking Pay Now, you agree to our terms. Your payment will be held for 24 hours while we review your pet&apos;s vaccination records. If everything checks out, your reservation is confirmed. If there are any issues, we&apos;ll refund you in full and let you know what&apos;s needed.
              </p>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-8 text-center py-8">
              <div className="flex justify-center">
                <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="size-10 text-green-600" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  You&apos;re Booked!
                </h1>
                <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
                  We&apos;ve reserved a spot for {formData.dogName}. A confirmation email has been sent to{" "}
                  <span className="font-medium text-foreground">{formData.email}</span>.
                </p>
              </div>

              <Card className="glass-card max-w-md mx-auto">
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking ID</span>
                      <span className="font-mono font-medium">#PWR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guest</span>
                      <span className="font-medium">{formData.dogName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dates</span>
                      <span className="font-medium">
                        {dateRange?.from && format(dateRange.from, "MMM d")} -{" "}
                        {dateRange?.to && format(dateRange.to, "MMM d")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-medium">{selectedPlan?.name}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-bold">Total Charged</span>
                      <span className="font-bold text-accent">${totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card max-w-md mx-auto bg-blue-50/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary mt-0.5">1.</span>
                      We&apos;ll review {formData.dogName}&apos;s vaccination records within 24 hours.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary mt-0.5">2.</span>
                      If everything looks good, your reservation is confirmed and payment goes through.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary mt-0.5">3.</span>
                      If something&apos;s missing, we&apos;ll refund you and email you exactly what&apos;s needed.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Link href="/">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <PawPrint className="size-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
              ) : (
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="size-4 mr-2" />
                    Cancel
                  </Button>
                </Link>
              )}

              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!dateRange?.from || !dateRange?.to)) ||
                  (step === 3 && !selectedPackage) ||
                  isProcessing
                }
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {isProcessing ? (
                  <>Processing Payment...</>
                ) : step === 4 ? (
                  <>Pay ${totalPrice}</>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="size-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
