import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const PACKAGES = [
  { name: 'Open', price: '₦79,500 / person' },
  { name: 'Couples', price: '₦185,000 for 2' },
  { name: 'Friendship Date', price: '₦85,000 / person (min 3)' },
  { name: 'Golden Hour', price: '₦85,000 / person (min 5)' },
  { name: 'Bond Together', price: '₦150k flat + ₦79,500/head (min 6)' },
  { name: 'Private — Solo (1:1 with Kelly)', price: '₦150,000' },
  { name: 'Private — Group (1–4 people)', price: '₦130,000 / person' },
]

function getSaturdays(): string[] {
  const saturdays: string[] = []
  const now = new Date()
  const end = new Date('2026-11-30')
  const d = new Date(now)
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1e1e18',
  border: '1px solid #38362d',
  borderRadius: 4,
  padding: '10px 14px',
  fontSize: 14,
  color: '#d4cfc4',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#6e6b5e',
  marginBottom: 8,
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
  const today = new Date().toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

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
      const text = await res.text()
      if (res.ok) {
        setDone(true)
      } else {
        let msg = 'Something went wrong. Please try again.'
        try { msg = JSON.parse(text).error || msg } catch { msg = `Error ${res.status}: ${text.slice(0, 120)}` }
        toast.error(msg)
        console.error('Book API error:', res.status, text)
      }
    } catch (err) {
      console.error('Book fetch error:', err)
      toast.error('Could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      />

      {/* Card */}
      <div style={{
        position: 'relative',
        background: '#2b2b22',
        borderRadius: 4,
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        fontFamily: 'Arial, sans-serif',
        color: '#d4cfc4',
      }}>

        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #38362d', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-block', background: '#3a3a2e', color: '#9e9880', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 2, marginBottom: 14 }}>
              CRACKS &amp; HEALING &middot; {today}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#f0ebe1', lineHeight: 1.2 }}>
              Reserve your spot.<br />
              <span style={{ fontStyle: 'italic', color: '#c9a96e' }}>Cracks &amp; Healing</span>
            </div>
            <p style={{ fontSize: 13, color: '#9e9880', lineHeight: 1.6, marginTop: 10 }}>
              Fill in your details and we'll send payment instructions right away.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6e6b5e', padding: 4, flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        {done ? (
          /* Success state */
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#3a3a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 22, color: '#c9a96e' }}>✓</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#f0ebe1', marginBottom: 10 }}>
              You're registered.
            </div>
            <p style={{ fontSize: 14, color: '#9e9880', lineHeight: 1.7, marginBottom: 28 }}>
              Check your email for session details and payment instructions.<br />
              Your spot is held for 48 hours.
            </p>
            <div style={{ background: '#1e1e18', border: '1px solid #38362d', borderRadius: 4, padding: '16px 20px', fontSize: 12, color: '#6e6b5e', lineHeight: 1.7, marginBottom: 24 }}>
              Questions? Chat with us on <a href="https://wa.me/2348113993291" style={{ color: '#c9a96e', textDecoration: 'none' }}>WhatsApp</a>
            </div>
            <button
              onClick={onClose}
              style={{ width: '100%', padding: '12px 0', background: '#c9a96e', color: '#1e1e18', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: '0.04em' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Session Details block */}
            <div style={{ background: '#242420', margin: '0 32px', marginTop: 20, borderRadius: 4, padding: '20px 24px' }}>
              <div style={labelStyle}>Session Details</div>
              <hr style={{ border: 'none', borderTop: '1px solid #38362d', marginBottom: 16 }} />

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="pkg" style={labelStyle}>Package</label>
                <select id="pkg" name="pkg" value={form.pkg} onChange={set} style={{ ...inputStyle, appearance: 'none' }}>
                  {PACKAGES.map(p => (
                    <option key={p.name} value={p.name} style={{ background: '#1e1e18' }}>
                      {p.name} — {p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="date" style={labelStyle}>Preferred Saturday *</label>
                <select id="date" name="date" value={form.date} onChange={set} required style={{ ...inputStyle, appearance: 'none', color: form.date ? '#d4cfc4' : '#6e6b5e' }}>
                  <option value="" style={{ background: '#1e1e18' }}>Select a date</option>
                  {saturdays.map(s => <option key={s} value={s} style={{ background: '#1e1e18' }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="people" style={labelStyle}>Number of guests</label>
                <input id="people" name="people" type="number" min="1" max="50" value={form.people} onChange={set} style={inputStyle} />
              </div>
            </div>

            {/* Contact Details block */}
            <div style={{ background: '#242420', margin: '8px 32px 0', borderRadius: 4, padding: '20px 24px' }}>
              <div style={labelStyle}>Your Details</div>
              <hr style={{ border: 'none', borderTop: '1px solid #38362d', marginBottom: 16 }} />

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="name" style={labelStyle}>Full name *</label>
                <input id="name" name="name" placeholder="Your name" value={form.name} onChange={set} required style={inputStyle} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="email" style={labelStyle}>Email address *</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={set} required style={inputStyle} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="whatsapp" style={labelStyle}>WhatsApp number</label>
                <input id="whatsapp" name="whatsapp" placeholder="+234 800 000 0000" value={form.whatsapp} onChange={set} style={inputStyle} />
              </div>

              <div>
                <label htmlFor="notes" style={labelStyle}>Additional notes</label>
                <textarea id="notes" name="notes" placeholder="Allergies, accessibility needs, anything we should know..." value={form.notes} onChange={set} rows={3}
                  style={{ ...inputStyle, resize: 'none', fontFamily: 'Arial, sans-serif' }} />
              </div>
            </div>

            {/* Notice */}
            <div style={{ background: '#1e1e18', border: '1px solid #38362d', margin: '8px 32px 0', borderRadius: 4, padding: '14px 20px' }}>
              <p style={{ fontSize: 12, color: '#6e6b5e', lineHeight: 1.7, textAlign: 'center', margin: 0 }}>
                Your spot is held for 48 hours. Payment confirms your registration. Spots are limited.
              </p>
            </div>

            {/* Submit */}
            <div style={{ padding: '20px 32px 28px' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '13px 0',
                  background: submitting ? '#8a7040' : '#c9a96e',
                  color: '#1e1e18',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {submitting ? <><Loader2 size={16} className="animate-spin" />Sending...</> : 'Reserve My Spot'}
              </button>
              <p style={{ fontSize: 11, color: '#4a4840', textAlign: 'center', marginTop: 10 }}>
                You'll receive a confirmation email with payment details immediately.
              </p>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}
