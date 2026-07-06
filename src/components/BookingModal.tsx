import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const PACKAGES = [
  { name: 'Open Session', price: '₦75,000 / person', min: 1 },
  { name: 'Couples Session', price: '₦185,000 for 2', min: 2 },
  { name: 'Friendship Date', price: '₦75k–₦85k / person (min 3)', min: 3 },
  { name: 'Birthday Package', price: 'From ₦305,000 (min 4)', min: 4 },
  { name: 'Bridal Shower', price: '₦95,000 / person (min 5)', min: 5 },
  { name: 'Team Bonding', price: '₦150k flat + ₦75k/head (min 6)', min: 6 },
  { name: 'Healing Session (Solo)', price: '₦120,000', min: 1 },
  { name: 'Healing Circle', price: '₦95,000 / person (2–3 people)', min: 2 },
]

function getSaturdays(): string[] {
  const saturdays: string[] = []
  const now = new Date()
  const end = new Date('2026-11-30')
  const d = new Date(now)
  // advance to next Saturday
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7))
  while (d <= end) {
    saturdays.push(d.toLocaleDateString('en-NG', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }))
    d.setDate(d.getDate() + 7)
  }
  return saturdays
}

interface Props {
  open: boolean
  defaultPackage?: string
  onClose: () => void
}

export default function BookingModal({ open, defaultPackage, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    pkg: defaultPackage || PACKAGES[0].name,
    date: '',
    people: '1',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  if (!open) return null

  const saturdays = getSaturdays()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.date) {
      toast.error('Please fill in name, email and preferred date.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setDone(true)
      } else {
        const err = await res.json()
        toast.error(err.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-primary font-serif">Reserve Your Spot</h2>
            <p className="text-xs text-muted-foreground mt-0.5">We'll hold your spot for 48 hours after you submit.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {done ? (
          <div className="px-6 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-primary font-serif mb-2">You're registered.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Check your email for full session details and payment instructions.<br/>
              Your spot is held for 48 hours.
            </p>
            <Button onClick={onClose} className="w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="pkg">Package</Label>
              <select
                id="pkg"
                name="pkg"
                value={form.pkg}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {PACKAGES.map(p => (
                  <option key={p.name} value={p.name}>{p.name} — {p.price}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Preferred Saturday</Label>
              <select
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a date</option>
                {saturdays.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="people">Number of people</Label>
              <Input id="people" name="people" type="number" min="1" max="50"
                value={form.people} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full name <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address <span className="text-red-500">*</span></Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp number</Label>
              <Input id="whatsapp" name="whatsapp" placeholder="+234 800 000 0000" value={form.whatsapp} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional notes</Label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Allergies, accessibility needs, anything we should know..."
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : 'Reserve My Spot'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                You'll receive a confirmation email with payment details immediately.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
