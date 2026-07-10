import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, Phone, MapPin, Star, Sparkles, Heart, Users, MessageCircle, Gem, HeartHandshake, Building2 } from 'lucide-react'
import BookingModal from '@/components/BookingModal'
import PackageCarousel from '@/components/ui/package-carousel'

const testimonials = [
  {
    text: 'Truly beautiful. Truly God-inspired. Kelly Praise\'s pieces speak love, comfort, encouragement and reassurance.',
    author: 'Chisom A., Lagos',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.19(2)_7ceaef3d.jpeg',
  },
  {
    text: 'Every piece I buy from your store is precious. Quality, beauty, value for money: all at the top.',
    author: 'Tolu M., Abuja',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.20_4e4692d8.jpeg',
  },
  {
    text: 'You have the best customer service I\'ve ever experienced. Your jewellery is top notch quality.',
    author: 'Funke O., Lagos',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.21(1)_fb908a57.jpeg',
  },
  {
    text: 'I almost cried when I got my jewellery. The intentionality in creating it was very evident.',
    author: 'Ngozi B., Lagos',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.21_64f53779.jpeg',
  },
]

const faqs = [
  {
    q: "What's included in the Kintsugi DIY Repair Kit?",
    a: 'Each kit includes: non-toxic gold or silver powder, a mixing stick, 25ml epoxy glue, a mixing bowl, 2 brushes, a ceramic practice bowl, protective gloves, a step-by-step manual, and keepsake stickers. Enough for up to 3 repairs.',
  },
  {
    q: 'Is Kintsugi difficult? Do I need prior experience?',
    a: 'Not at all. Our kits are designed for beginners with clear instructions and a practice piece included. Imperfections are part of the art.',
  },
  {
    q: 'How long does shipping take? Do you ship internationally?',
    a: 'We ship worldwide. Nigeria: 3–5 business days. West Africa: 7–10 days. Europe & North America: 10–14 days. All orders include tracking.',
  },
  {
    q: 'How far in advance do I need to book a session?',
    a: 'Open sessions require at least 72 hours (3 days) notice. For Private 1-on-1 and Bond Together (corporate) sessions, reach out via WhatsApp to discuss availability and confirm your date. For groups of 10+, 4 weeks notice is appreciated.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Credit/debit cards (Visa, Mastercard) and bank transfers via Paystack. Open, Couples, Bond Together, and Private sessions require full payment to confirm. Friendship Date and Golden Hour require a 50% non-refundable deposit, with the balance due 5 business days before your session.',
  },
]

const openImages = [
  { src: '/solo%20session.jpeg', alt: 'Open kintsugi session' },
  { src: '/friends-quotes.jpeg', alt: 'Guests holding finished kintsugi bowls at an open session' },
]

const couplesImages = [
  { src: '/frienship%20date%203.jpeg', alt: 'Couples kintsugi session' },
  { src: '/couple-session-2.jpeg', alt: 'A couple gluing their kintsugi bowls together' },
]

const friendshipImages = [
  { src: '/friendship%20date.jpeg', alt: 'Friendship date kintsugi session' },
  { src: '/friends-quotes.jpeg', alt: 'A group of friends holding their finished kintsugi bowls' },
]

const goldenHourImages = [
  { src: '/friendship%20date%202.jpeg', alt: 'Golden Hour celebration kintsugi session' },
  { src: '/bridal-shower-boxes.jpeg', alt: 'Bridal shower gift table set with Kelly Praise kits' },
  { src: '/bridal-shower-group.jpeg', alt: 'Bridal shower group photo with the bride-to-be' },
]

const bondTogetherImages = [
  { src: '/teambonding%20pic.jpeg', alt: 'Bond Together team kintsugi session' },
  { src: '/team-bonding-2.jpeg', alt: 'A large team celebrating together after their session' },
]

const privateImages = [
  { src: '/private%20session.jpeg', alt: 'Private kintsugi session' },
]

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingPackage, setBookingPackage] = useState<string | undefined>(undefined)

  const openBooking = (pkg?: string) => {
    setBookingPackage(pkg)
    setBookingOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/kellyraise@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: 'New message from Cracks & Healing website' }),
      })
      if (res.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.")
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex flex-col leading-tight">
            <a href="#top" className="text-lg font-bold text-primary font-serif tracking-wide">Cracks &amp; Healing</a>
            <span className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase hidden md:block">Broken Made Beautiful</span>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setNavOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-accent" />
            <span className="block w-6 h-0.5 bg-accent" />
            <span className="block w-6 h-0.5 bg-accent" />
          </button>

          <div className={`${navOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto flex-col md:flex-row bg-card md:bg-transparent border-b md:border-0 border-border p-4 md:p-0 gap-6 md:gap-8 shadow-md md:shadow-none`}>
            <a href="#packages" className="text-sm font-semibold text-muted-foreground hover:text-primary capitalize transition-colors" onClick={() => setNavOpen(false)}>Sessions</a>
            <a href="#shop" className="text-sm font-semibold text-muted-foreground hover:text-primary capitalize transition-colors" onClick={() => setNavOpen(false)}>Shop</a>
            <a href="#contact" className="text-sm font-semibold text-muted-foreground hover:text-primary capitalize transition-colors" onClick={() => setNavOpen(false)}>Contact</a>
            <button
              className="text-sm px-4 py-2 bg-accent text-primary rounded-lg font-bold hover:bg-accent/90 transition-colors text-left md:text-center"
              onClick={() => { setNavOpen(false); openBooking() }}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative min-h-[90vh] flex items-end">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.23_ab0f432a.jpeg"
          alt="Beautifully repaired Kintsugi ceramics with gold"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative container pb-16 pt-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6 text-accent text-xs font-bold tracking-[0.2em] uppercase">
              <span className="block w-8 h-px bg-accent" />
              Kintsugi Workshops &middot; Lagos
              <span className="block w-8 h-px bg-accent" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-5 leading-tight">
              Cracks &amp; <span className="italic text-accent">Healing</span>
            </h1>
            <p className="text-base text-white/75 mb-5 leading-relaxed max-w-md">
              Broken and repaired becomes more beautiful for having been broken. We bring that practice to Lagos: kits for home, and workshops that stay with you.
            </p>
            <p className="text-white/60 text-sm mb-8 italic">"Wholeness doesn't mean no imperfections. It means no part left out."</p>
            <div className="flex gap-4 flex-wrap">
              <a href="#shop"><Button size="lg">Shop Now</Button></a>
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-white/70 text-white font-semibold text-sm hover:bg-white hover:text-background transition-colors"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 bg-background border-t border-border">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-accent" />
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Sessions &amp; Packages</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3 italic">Every kind of healing, priced honestly.</h2>
            <p className="text-base text-foreground/60 italic mb-3">For anyone who wants to slow down, make something beautiful, and leave with a piece that is entirely their own.</p>
            <p className="text-base text-foreground/70">Whether you're coming alone, with friends, or bringing your whole team, there's a session for you. All packages include materials, expert facilitation, and your take-home piece.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* 1. Open */}
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <PackageCarousel images={openImages} />
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Open</CardTitle>
                <CardDescription>For anyone who wants to slow down, make something beautiful, and leave with a piece that is entirely their own. No experience needed.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 2 hour guided kintsugi session</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit · Welcome drink</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Light bite (pastry or sandwich)</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Step-by-step guidance throughout</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Finished piece to take home</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦79,500 <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Saturdays only · Open to all · No experience needed</p>
                  <p className="text-xs text-muted-foreground mb-3">Add-on: Elevated refreshments +₦15,000/person · Off-site +₦80,000</p>
                  <button
                    onClick={() => openBooking('Open')}
                    className="w-full mt-1 inline-flex items-center justify-center h-10 px-4 rounded-md bg-accent text-primary font-bold text-sm hover:bg-accent/90 transition-colors"
                  >
                    Book a Spot
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-2">Full payment required to confirm.</p>
                </div>
              </CardContent>
            </Card>

            {/* 2. Couples */}
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <PackageCarousel images={couplesImages} />
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Couples</CardTitle>
                <CardDescription>For two people who want to create something together — whether you are celebrating, reconnecting, or simply spending time differently.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 2 hour private guided session</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit for each person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Welcome mocktail per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Shared grazing board</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> A finished piece each to take home</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦185,000 <span className="text-base font-normal text-muted-foreground">for 2</span></p>
                  <p className="text-xs text-muted-foreground mb-3">Add-on: Elevated refreshments +₦15,000/person · Off-site +₦80,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20the%20Couples%20session." target="_blank" rel="noreferrer">
                    <Button className="w-full">Book via WhatsApp</Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground mt-2">Full payment required to confirm.</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. Friendship Date */}
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <PackageCarousel images={friendshipImages} />
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Friendship Date</CardTitle>
                <CardDescription>For your closest people — the ones you want to do something meaningful with, beyond dinner and a movie.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 2 hour private guided session</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Welcome mocktail per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Shared grazing platter for the group</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> A finished piece each to take home</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦85,000 <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Minimum 3 people · from ₦255,000</p>
                  <p className="text-xs text-muted-foreground mb-3">Add-on: Elevated refreshments +₦15,000/person · Off-site +₦80,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Friendship%20Date%20session." target="_blank" rel="noreferrer">
                    <Button className="w-full">Book via WhatsApp</Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground mt-2">50% deposit to confirm · balance 5 days before.</p>
                </div>
              </CardContent>
            </Card>

            {/* 4. Golden Hour */}
            <Card className="border-2 border-accent hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
              <PackageCarousel
                images={goldenHourImages}
                badge={<div className="absolute top-3 right-3 z-10 bg-terra text-terra-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
              />
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                  <Gem className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Golden Hour</CardTitle>
                <CardDescription>For every milestone worth marking — birthdays, bridal showers, graduations, and any moment that deserves to be celebrated properly.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 2.5 hour private guided session</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Welcome mocktail per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Shared grazing platter for the group</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Special distinction for the guest of honour</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> A finished piece each to take home</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦85,000 <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Minimum 5 people · from ₦425,000</p>
                  <p className="text-xs text-muted-foreground mb-3">Add-on: Elevated refreshments +₦15,000/person · Catering referral available · Off-site +₦80,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Golden%20Hour%20session." target="_blank" rel="noreferrer">
                    <Button className="w-full">Book via WhatsApp</Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground mt-2">50% deposit to confirm · balance 5 days before.</p>
                </div>
              </CardContent>
            </Card>

            {/* 5. Bond Together */}
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <PackageCarousel images={bondTogetherImages} imgClassName="object-cover object-top" />
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Bond Together</CardTitle>
                <CardDescription>For teams and organisations who want to do something genuinely memorable — creative, intentional, and worth talking about long after.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 2 to 2.5 hour private facilitated session</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Welcome drink per person</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Light finger food spread for the group</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Kintsugi philosophy intro: resilience &amp; team culture</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Available at our space or yours</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦150k <span className="text-base font-normal text-muted-foreground">flat + ₦79,500/head</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Minimum 6 people · from ₦627,000</p>
                  <p className="text-xs text-muted-foreground mb-3">Add-on: Elevated refreshments +₦15,000/person · Catering referral available · Off-site +₦100,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Bond%20Together%20for%20my%20team." target="_blank" rel="noreferrer">
                    <Button className="w-full">Get a Quote</Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground mt-2">Full payment required to confirm.</p>
                </div>
              </CardContent>
            </Card>

            {/* 6. Private (Breathe) — full width */}
            <div className="md:col-span-2 xl:col-span-1">
              <Card className="border-border bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-all duration-300 hover:border-accent/40 h-full flex flex-col">
                <PackageCarousel images={privateImages} />
                <CardHeader>
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <HeartHandshake className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle>Private</CardTitle>
                  <CardDescription>No group. No schedule to keep up with. Just you — or your closest few — with all the time and space you need. Bespoke, unhurried, deeply personal.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 justify-between gap-6">
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex gap-2"><span className="text-accent">✓</span> 2.5 to 3 hour fully private session</li>
                    <li className="flex gap-2"><span className="text-accent">✓</span> Full kintsugi kit per person</li>
                    <li className="flex gap-2"><span className="text-accent">✓</span> Styled welcome drink · personal grazing spread</li>
                    <li className="flex gap-2"><span className="text-accent">✓</span> A small personal touch — a card, a treat</li>
                    <li className="flex gap-2"><span className="text-accent">✓</span> Completely unhurried pace throughout</li>
                    <li className="flex gap-2"><span className="text-accent">✓</span> A finished piece to take home</li>
                  </ul>
                  <p className="text-xs text-muted-foreground italic">A mindful craft experience, not a clinical service.</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-border">
                      <div>
                        <p className="font-semibold text-primary text-sm">Solo — 1:1 with Kelly</p>
                        <p className="text-xs text-muted-foreground">Fully private &amp; bespoke</p>
                      </div>
                      <p className="text-xl font-bold text-primary">₦150,000</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-border">
                      <div>
                        <p className="font-semibold text-primary text-sm">Private Group (1–4 people)</p>
                        <p className="text-xs text-muted-foreground">Off-site +₦80,000</p>
                      </div>
                      <p className="text-xl font-bold text-primary">₦130,000<span className="text-sm font-normal text-muted-foreground">/person</span></p>
                    </div>
                    <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Private%20session." target="_blank" rel="noreferrer">
                      <Button className="w-full">Book via WhatsApp</Button>
                    </a>
                    <p className="text-xs text-center text-muted-foreground">Full payment required to confirm.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          <div className="mt-10 max-w-2xl mx-auto text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Deposits:</span> Open, Couples, Bond Together &amp; Private require full payment. Friendship Date &amp; Golden Hour require a 50% non-refundable deposit, with balance due 5 business days before the session.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Cancellations</span> within 48 hours are non-refundable. Rescheduling requires at least 7 business days' notice. No-shows are billed at the confirmed headcount — your kit can be sent to you, delivery costs apply.
            </p>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-16 bg-card border-t border-border">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-accent" />
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Take it home</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3 italic">Shop Our DIY Kits</h2>
            <p className="text-base text-foreground/70 max-w-2xl">
              Everything you need for up to 3 repairs: non-toxic powder, epoxy glue, brushes, a practice bowl, and a step-by-step manual.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Kintsugi DIY Repair Kit (Gold)',
                price: '₦42,000',
                img: 'https://www.kellypraise.com/cdn/shop/files/9496B945-DEA4-41F8-B40F-06B5F624D948.jpg?v=1731190498&width=800',
                link: 'https://www.kellypraise.com/products/kitsungi-diy-repair-kit?variant=46058959569141',
              },
              {
                name: 'Kintsugi DIY Repair Kit (Silver)',
                price: '₦42,000',
                img: 'https://www.kellypraise.com/cdn/shop/files/B0B2C2B8-007D-47AC-9F56-689164B4FB60.jpg?v=1731190542&width=800',
                link: 'https://www.kellypraise.com/products/kitsungi-diy-repair-kit',
              },
            ].map(item => (
              <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-64 overflow-hidden bg-muted">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-semibold text-primary mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">{item.price}</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm">Buy Now</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-px bg-accent" />
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Community</p>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2 italic">What Our Community Says</h2>
          <p className="text-sm text-muted-foreground mb-10">100+ reviews from our workshop participants</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-28 overflow-hidden bg-muted">
                  <img src={t.img} alt="" className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                  </div>
                  <p className="text-foreground/80 leading-relaxed italic text-sm mb-3">"{t.text}"</p>
                  <p className="font-semibold text-primary text-xs">{t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-background border-t border-border">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-accent" />
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Get in touch</p>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4 italic">Start a Conversation</h2>
            <p className="text-foreground/70 mb-10">Questions about our kits or sessions? We'd love to hear from you.</p>
            <div className="space-y-6">
              {([
                { Icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', href: null },
                { Icon: Mail, label: 'Email', value: 'cracksandhealing@gmail.com', href: 'mailto:cracksandhealing@gmail.com' },
                { Icon: Phone, label: 'WhatsApp', value: '+234 811 399 3291', href: 'https://wa.me/2348113993291' },
              ] as const).map(({ Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-0.5 text-sm">{label}</h4>
                    {href ? (
                      <a href={href} className="text-accent hover:text-accent/80 text-sm">{value}</a>
                    ) : (
                      <p className="text-foreground/70 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-primary font-semibold mb-1.5 block">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="email" className="text-primary font-semibold mb-1.5 block">Email Address</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div>
                <Label htmlFor="message" className="text-primary font-semibold mb-1.5 block">Message</Label>
                <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} className="resize-none" required />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
              <p className="text-xs text-foreground/60 text-center">We'll get back to you within 24 hours.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-card border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-6 h-px bg-accent" />
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">FAQ</p>
            <span className="block w-6 h-px bg-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-10 text-center italic">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-5">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 text-center">
            <p className="text-foreground/70 mb-4 text-sm">Still have questions?</p>
            <a href="https://wa.me/2348113993291?text=Hi%20Cracks%20and%20Healing%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25d366] hover:bg-[#1da851] text-white">Chat on WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border" style={{ background: '#111110', color: '#9e9880' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3 font-serif text-sm" style={{ color: '#f0ebe1' }}>Cracks &amp; Healing</h4>
              <p className="text-xs leading-relaxed" style={{ color: '#6e6b5e' }}>Broken made beautiful. Kintsugi workshops and DIY repair kits from Lagos, Nigeria.</p>
              <p className="text-xs mt-2 italic" style={{ color: '#6e6b5e' }}>Every Saturday · Artzmania, Lekki Phase 1</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm" style={{ color: '#f0ebe1' }}>Explore</h4>
              <ul className="space-y-2 text-xs">
                {[['packages', 'Sessions & Packages'], ['shop', 'DIY Kits'], ['contact', 'Contact Us'], ['faq', 'FAQ']].map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="hover:text-accent transition-colors" style={{ color: '#6e6b5e' }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm" style={{ color: '#f0ebe1' }}>Contact</h4>
              <ul className="space-y-2 text-xs" style={{ color: '#6e6b5e' }}>
                <li>Lagos, Nigeria</li>
                <li><a href="mailto:cracksandhealing@gmail.com" className="hover:text-accent transition-colors" style={{ color: '#6e6b5e' }}>cracksandhealing@gmail.com</a></li>
                <li><a href="https://wa.me/2348113993291" className="hover:text-accent transition-colors" style={{ color: '#6e6b5e' }}>+234 811 399 3291</a></li>
                <li><a href="https://www.instagram.com/cracksandhealing/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" style={{ color: '#6e6b5e' }}>@cracksandhealing</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 text-xs text-center" style={{ borderTop: '1px solid #2e2c25', color: '#4a4840' }}>
            <p>&copy; {new Date().getFullYear()} Cracks &amp; Healing &middot; Lagos, Nigeria</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2348113993291?text=Hi%20Cracks%20and%20Healing%2C%20I%27m%20interested%20in%20your%20Kintsugi%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-[#25d366] hover:bg-[#1da851] text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <BookingModal
        open={bookingOpen}
        defaultPackage={bookingPackage}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
