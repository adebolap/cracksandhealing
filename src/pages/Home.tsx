import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, Phone, MapPin, Star, Sparkles, Heart, Users, ShoppingBag, MessageCircle, Gem, HeartHandshake, Building2, Flame } from 'lucide-react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

const testimonials = [
  {
    text: 'Truly beautiful. Truly God-inspired. Kelly Praise\'s pieces are not just timeless, elegant and stylish, they speak love, comfort, encouragement and reassurance.',
    author: 'Verified Customer',
    rating: 5,
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.19(2)_7ceaef3d.jpeg',
  },
  {
    text: 'Every piece I buy from your store is precious. Quality, beauty, value for money, all at the top. Thank you most especially for the meaning each piece affirms.',
    author: 'Verified Customer',
    rating: 5,
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.20_4e4692d8.jpeg',
  },
  {
    text: 'You have the best customer service I\'ve ever experienced. I love how intentional every conversation is. Your jewellery is top notch quality.',
    author: 'Verified Customer',
    rating: 5,
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.21(1)_fb908a57.jpeg',
  },
  {
    text: 'I almost cried when I got my jewellery. The packaging and the piece really had me emotional. The intentionality in creating it was very evident.',
    author: 'Verified Customer',
    rating: 5,
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513933452/fWNnRpeZbww7L9TXKj2SnP/WhatsAppImage2026-04-10at13.04.21_64f53779.jpeg',
  },
]

const shopItems = [
  {
    id: 1,
    name: 'Kintsugi DIY Repair Kit — Gold',
    price: '₦42,000',
    img: 'https://www.kellypraise.com/cdn/shop/files/9496B945-DEA4-41F8-B40F-06B5F624D948.jpg?v=1731190498&width=800',
    link: 'https://www.kellypraise.com/products/kitsungi-diy-repair-kit?variant=46058959569141',
  },
  {
    id: 2,
    name: 'Kintsugi DIY Repair Kit — Silver',
    price: '₦42,000',
    img: 'https://www.kellypraise.com/cdn/shop/files/B0B2C2B8-007D-47AC-9F56-689164B4FB60.jpg?v=1731190542&width=800',
    link: 'https://www.kellypraise.com/products/kitsungi-diy-repair-kit',
  },
]

const faqs = [
  {
    q: "What's included in the Kintsugi DIY Repair Kit?",
    a: (
      <span>
        Each kit includes: non-toxic gold or silver powder, a mixing stick, 20ml top-quality epoxy glue, one mixing bowl, 2 paint brushes, 1 ceramic practice bowl, protective gloves, a step-by-step manual, and keepsake stickers. Enough for up to 3 repairs depending on size.
      </span>
    ),
  },
  {
    q: 'Is Kintsugi difficult? Do I need prior experience?',
    a: 'Not at all! Kintsugi is accessible to everyone regardless of experience. Our kits are designed for beginners with clear instructions and a practice piece included. The beauty of Kintsugi is that imperfections are part of the art.',
  },
  {
    q: 'How long does shipping take? Do you ship internationally?',
    a: (
      <span>
        We ship worldwide. Nigeria: 3–5 business days. West Africa: 7–10 days. Europe & North America: 10–14 days. Other regions: 14–21 days. All orders include tracking. For rush shipping, contact us via WhatsApp.
      </span>
    ),
  },
  {
    q: 'How far in advance do I need to book a session?',
    a: 'At least 2 weeks for standard sessions. For groups of 10+, 4 weeks notice is appreciated. Last-minute availability — contact us via WhatsApp to check.',
  },
  {
    q: 'Can I book for a group (bridal shower, team building, birthday)?',
    a: 'Absolutely! We specialise in group experiences for bridal showers, birthdays, team bonding, and night-out events. Groups of 10+ welcome. Contact us via WhatsApp to discuss your group.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Credit/debit cards (Visa, Mastercard), bank transfers via Paystack, and mobile money. For DIY session bookings, a deposit secures your spot with the balance due before the session.',
  },
]

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'cracksandhealing' })
      cal('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

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
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#top" className="text-xl font-bold text-primary font-serif">Cracks & Healing</a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setNavOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-primary" />
            <span className="block w-6 h-0.5 bg-primary" />
            <span className="block w-6 h-0.5 bg-primary" />
          </button>

          <div className={`${navOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto flex-col md:flex-row bg-white md:bg-transparent border-b md:border-0 border-border p-4 md:p-0 gap-4 md:gap-8 shadow-md md:shadow-none`}>
            {['packages', 'shop', 'contact'].map(id => (
              <a key={id} href={`#${id}`} className="text-sm font-semibold text-muted-foreground hover:text-primary capitalize transition-colors" onClick={() => setNavOpen(false)}>
                {id}
              </a>
            ))}
            <a href="#booking" className="text-sm px-4 py-2 bg-accent text-primary rounded-lg font-bold hover:bg-accent/90 transition-colors" onClick={() => setNavOpen(false)}>
              Book Now
            </a>
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
            <div className="inline-block mb-5 px-4 py-1.5 bg-accent/20 backdrop-blur-sm rounded-full text-accent text-sm font-bold border border-accent/30">
              Restore Your Favourites
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-5 leading-tight">
              Cracks &amp; <span className="text-accent">Healing</span>
            </h1>
            <p className="text-lg text-white/80 mb-4 leading-relaxed">
              Transform broken ceramics into beautiful art with our premium Kintsugi DIY repair kits. Based in Lagos, Nigeria.
            </p>
            <p className="text-accent font-semibold italic mb-8">
              "Wholeness doesn't mean imperfections—it means no part left out."
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#shop"><Button size="lg">Shop Now</Button></a>
              <a href="#booking"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Book a Session</Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 bg-accent/5 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Sessions &amp; Packages</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">Every kind of healing, priced honestly.</h2>
            <p className="text-base text-foreground/70">Whether you're coming alone, with friends, or bringing your whole team — there's a session for you. All packages include materials, expert facilitation, and your take-home piece.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Standard */}
            <Card className="border-border bg-white hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Open Session</CardTitle>
                <CardDescription>Join our regular community workshop. Meet new people, slow down, and make something beautiful.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> Up to 8 participants</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Saturdays &amp; Sundays, 2 hrs</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Kit, instruction &amp; refreshments included</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Take home your repaired piece</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦75,000 <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <a href="#booking"><Button className="w-full mt-3">Book a Spot</Button></a>
                </div>
              </CardContent>
            </Card>

            {/* Couples */}
            <Card className="border-border bg-white hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Couples Session</CardTitle>
                <CardDescription>An intimate, extended experience for two — with storytelling prompts and a paired reflection card.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> Private session for 2</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Guided reflection &amp; storytelling prompts</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Paired keepsake card</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Both kits &amp; materials included</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦185,000 <span className="text-base font-normal text-muted-foreground">for 2</span></p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20the%20Couples%20Session." target="_blank" rel="noreferrer">
                    <Button className="w-full mt-3">Book via WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Friendship / Girls' Night */}
            <Card className="border-border bg-white hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Friendship Date</CardTitle>
                <CardDescription>Relaxed, celebratory, and social. Light refreshments, curated playlist, and a healing conversation to open.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 3–5 people</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Refreshments &amp; curated playlist</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Opening reflection prompt</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> All materials included</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦75k–₦85k <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <p className="text-xs text-muted-foreground mb-3">Minimum 3 people — from ₦255,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Friendship%20Date%20session." target="_blank" rel="noreferrer">
                    <Button className="w-full">Book via WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Birthday */}
            <Card className="border-border bg-white hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Birthday Package</CardTitle>
                <CardDescription>Honour the celebrant with a gold-ribbon piece, personalised keepsake card, and a session that feels special.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> Birthday honoree + guests</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Gold-ribbon distinction for celebrant</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Personalised birthday keepsake card</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Minimum 4 people (honoree + 3)</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">From ₦305,000</p>
                  <p className="text-xs text-muted-foreground mb-3">Honoree ₦65k · Guests ₦80k each</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Birthday%20Package." target="_blank" rel="noreferrer">
                    <Button className="w-full">Book via WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Bridal */}
            <Card className="border-2 border-accent bg-white hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                  <Gem className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Bridal Shower</CardTitle>
                <CardDescription>Lagos's most intentional bridal experience — curated, Instagrammable, and deeply meaningful for the bride and her circle.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> Bride + party (min. 5 people)</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Gold/rose-gold finish for the bride</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Bridal keepsake card &amp; certificate</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Pre-session release reflection ritual</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Social-media ready workspace styling</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦95,000 <span className="text-base font-normal text-muted-foreground">/ person</span></p>
                  <p className="text-xs text-muted-foreground mb-3">Minimum 5 people — from ₦475,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20the%20Bridal%20Shower%20package." target="_blank" rel="noreferrer">
                    <Button className="w-full">Enquire via WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Corporate */}
            <Card className="border-border bg-white hover:shadow-lg transition-all duration-300 hover:border-accent/40 flex flex-col">
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Team Bonding / Corporate</CardTitle>
                <CardDescription>A philosophy-led team experience built around resilience, imperfection, and connection. Trusted by teams globally.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-6">
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-accent">✓</span> Minimum 6 people</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Philosophy intro: resilience &amp; team culture</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Flat session fee + per-head rate</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> On-site option available (Lagos)</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Full payment upfront for confirmed booking</li>
                </ul>
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">₦150k <span className="text-base font-normal text-muted-foreground">flat + ₦75k/head</span></p>
                  <p className="text-xs text-muted-foreground mb-3">Min. engagement ₦600,000 · 10 people = ₦900,000</p>
                  <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Team%20Bonding%20for%20my%20company." target="_blank" rel="noreferrer">
                    <Button className="w-full">Get a Quote</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Healing — full width */}
            <div className="md:col-span-2 xl:col-span-3">
              <Card className="border-border bg-gradient-to-r from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300 hover:border-accent/40">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <HeartHandshake className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 font-serif">Healing Session</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      Our most intentional offering — a solo 1:1 or small circle experience designed for people in a season of grief, transition, or burnout. You'll set a healing intention, repair your piece with care, and close with a quiet reflection. Bespoke, unhurried, and deeply personal.
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      This is a mindful craft experience, not a clinical service. For people who need space to breathe and create.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-border">
                      <div>
                        <p className="font-semibold text-primary text-sm">Solo — 1:1 with Kelly</p>
                        <p className="text-xs text-muted-foreground">Private, bespoke session</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">₦120,000</p>
                        <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Solo%20Healing%20Session." target="_blank" rel="noreferrer">
                          <Button size="sm" className="mt-2">Book Now</Button>
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-border">
                      <div>
                        <p className="font-semibold text-primary text-sm">Healing Circle — 2–3 people</p>
                        <p className="text-xs text-muted-foreground">Shared intentional experience</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">₦95,000<span className="text-sm font-normal text-muted-foreground">/person</span></p>
                        <a href="https://wa.me/2348113993291?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Healing%20Circle%20session." target="_blank" rel="noreferrer">
                          <Button size="sm" className="mt-2">Book Now</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All private packages require a 50% non-refundable deposit at booking. Balance due 48 hours before your session.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-background border-t border-border">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Loved by Our Community</h2>
          <p className="text-base text-foreground/70 mb-10">Real stories from people who've transformed their broken ceramics into treasured pieces.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-32 overflow-hidden bg-gray-50">
                  <img src={t.img} alt="" className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 leading-relaxed italic text-sm">"{t.text}"</p>
                  <p className="font-semibold text-primary text-sm">{t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 p-8 bg-accent/5 rounded-xl border border-accent/20 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
            </div>
            <p className="text-2xl font-bold text-primary mb-1">4.8 out of 5</p>
            <p className="text-foreground/70 text-sm">Based on 100+ verified customer reviews</p>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-16 bg-accent/5 border-t border-border">
        <div className="container">
          <div className="flex items-start justify-between mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Shop Our DIY Kits</h2>
              <p className="text-lg text-foreground/70 max-w-2xl">
                Our Kintsugi DIY Repair Kits include everything you need — non-toxic powder, epoxy glue, brushes, a practice bowl, and a step-by-step manual. Enough for up to 3 repairs.
              </p>
            </div>
            <ShoppingBag className="w-10 h-10 text-accent opacity-20 hidden md:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shopItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-64 overflow-hidden bg-gray-50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-5">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                  </div>
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
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.kellypraise.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg">View Full Shop</Button>
            </a>
            <a href="https://www.kellypraise.com/collections" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">Explore Jewellery Collection</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-16 bg-white border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Book a Session</h2>
            <p className="text-lg text-foreground/70">
              Join us for an immersive Kintsugi experience. Sessions run Saturdays only, May–November 2026. All materials, expert instruction, and your take-home ceramic piece included.
            </p>
          </div>

          <div className="rounded-xl border border-border overflow-hidden bg-white shadow-sm">
            <Cal
              namespace="cracksandhealing"
              calLink="cracksandhealing/120mins"
              style={{ width: '100%', height: 'min(700px, 85vh)', overflow: 'scroll' }}
              config={{ layout: 'month_view', theme: 'light' }}
            />
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              After booking you'll be redirected to complete payment via Paystack. Your spot is confirmed once payment is received.
            </p>
            <p className="text-sm text-muted-foreground">
              Prefer to book directly?{' '}
              <a
                href="https://wa.me/2348113993291?text=Hi%20Cracks%20%26%20Healing%2C%20I%27d%20like%20to%20book%20a%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                Message us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-background border-t border-border">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-lg text-foreground/70 mb-10">Have questions about our Kintsugi kits or sessions? We'd love to hear from you.</p>
            <div className="space-y-6">
              {([
                { Icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', href: null },
                { Icon: Mail, label: 'Email', value: 'kellyraise@gmail.com', href: 'mailto:kellyraise@gmail.com' },
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
            <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-4 text-center">
              {[['100+', 'Happy Customers'], ['4.8★', 'Rating'], ['Lagos', 'Based']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-bold text-accent mb-1">{val}</p>
                  <p className="text-xs text-foreground/60">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-border">
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
      <section id="faq" className="py-16 bg-white border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-foreground/70">Find answers to common questions about our Kintsugi kits, sessions, and shipping.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-5">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 p-6 bg-accent/5 border border-accent/20 rounded-xl text-center">
            <p className="text-foreground/70 mb-4 text-sm">Didn't find your answer? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/2348113993291?text=Hi%20Cracks%20and%20Healing%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Chat on WhatsApp</Button>
              </a>
              <a href="mailto:kellyraise@gmail.com">
                <Button variant="outline">Email Us</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3 font-serif">Cracks & Healing</h4>
              <p className="text-sm opacity-80">Transforming broken ceramics into beautiful art through the ancient Japanese art of Kintsugi.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {['packages', 'shop', 'booking', 'contact', 'faq'].map(id => (
                  <li key={id}><a href={`#${id}`} className="opacity-80 hover:opacity-100 capitalize">{id}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.instagram.com/cracksandhealing/" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100">Instagram</a></li>
                <li><a href="https://www.kellypraise.com" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100">Kelly Praise Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Lagos, Nigeria</li>
                <li><a href="mailto:kellyraise@gmail.com" className="hover:opacity-100">kellyraise@gmail.com</a></li>
                <li><a href="https://wa.me/2348113993291" className="hover:opacity-100">+234 811 399 3291</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4">
            <p>&copy; {new Date().getFullYear()} Cracks and Healing. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100">Privacy Policy</a>
              <a href="#" className="hover:opacity-100">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/2348113993291?text=Hi%20Cracks%20and%20Healing%2C%20I%27m%20interested%20in%20your%20Kintsugi%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  )
}
