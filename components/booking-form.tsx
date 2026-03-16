"use client"

import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

const bookingSchema = z.object({
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  dogName: z.string().min(2, "Dog name must be at least 2 characters"),
  breed: z.string().min(2, "Breed must be at least 2 characters"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  email: z.string().email("Please enter a valid email address"),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  children: React.ReactNode
}

export function BookingForm({ children }: BookingFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [formData, setFormData] = useState<BookingFormData>({
    ownerName: "",
    dogName: "",
    breed: "",
    checkIn: "",
    checkOut: "",
    email: "",
    notes: "",
  })

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const result = bookingSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof BookingFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Thank you! We'll be in touch within 24 hours.", {
      description: `We received your booking request for ${formData.dogName}.`,
    })

    // Reset form
    setFormData({
      ownerName: "",
      dogName: "",
      breed: "",
      checkIn: "",
      checkOut: "",
      email: "",
      notes: "",
    })
    setIsSubmitting(false)

    // Close sheet after delay
    setTimeout(() => setOpen(false), 2000)
  }

  // Get tomorrow's date for min check-in
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Book Your Pup&apos;s Stay</SheetTitle>
          <SheetDescription>
            Fill out the form below and we&apos;ll get back to you within 24 hours to confirm availability.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 px-4">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="ownerName">Your Name</FieldLabel>
              <Input
                id="ownerName"
                placeholder="e.g., John Smith"
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                aria-invalid={!!errors.ownerName}
              />
              {errors.ownerName && <FieldError>{errors.ownerName}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Your Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="dogName">Dog&apos;s Name</FieldLabel>
              <Input
                id="dogName"
                placeholder="e.g., Barnaby"
                value={formData.dogName}
                onChange={(e) => handleChange("dogName", e.target.value)}
                aria-invalid={!!errors.dogName}
              />
              {errors.dogName && <FieldError>{errors.dogName}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="breed">Breed</FieldLabel>
              <Input
                id="breed"
                placeholder="e.g., Golden Retriever"
                value={formData.breed}
                onChange={(e) => handleChange("breed", e.target.value)}
                aria-invalid={!!errors.breed}
              />
              {errors.breed && <FieldError>{errors.breed}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="checkIn">Check-in Date</FieldLabel>
              <Input
                id="checkIn"
                type="date"
                min={minDate}
                value={formData.checkIn}
                onChange={(e) => handleChange("checkIn", e.target.value)}
                aria-invalid={!!errors.checkIn}
              />
              {errors.checkIn && <FieldError>{errors.checkIn}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="checkOut">Check-out Date</FieldLabel>
              <Input
                id="checkOut"
                type="date"
                min={formData.checkIn || minDate}
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                aria-invalid={!!errors.checkOut}
              />
              {errors.checkOut && <FieldError>{errors.checkOut}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="notes">Special Notes (Optional)</FieldLabel>
              <Textarea
                id="notes"
                placeholder="Any special needs, medications, dietary requirements..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="min-h-24"
              />
              {errors.notes && <FieldError>{errors.notes}</FieldError>}
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-6"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  Submitting...
                </>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  )
}
