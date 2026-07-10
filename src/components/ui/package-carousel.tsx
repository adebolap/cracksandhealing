import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PackageCarouselImage {
  src: string
  alt: string
}

interface PackageCarouselProps {
  images: PackageCarouselImage[]
  imgClassName?: string
  badge?: React.ReactNode
  autoPlayMs?: number
}

export default function PackageCarousel({
  images,
  imgClassName = 'object-cover object-center',
  badge,
  autoPlayMs = 5000,
}: PackageCarouselProps) {
  const [index, setIndex] = useState(0)
  const count = images.length

  const goTo = useCallback((i: number) => {
    setIndex(((i % count) + count) % count)
  }, [count])

  useEffect(() => {
    if (count <= 1 || !autoPlayMs) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs)
    return () => clearInterval(id)
  }, [count, autoPlayMs])

  if (count === 0) return null

  return (
    <div className="h-48 overflow-hidden rounded-t-xl relative group">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${imgClassName} ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {badge}
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
