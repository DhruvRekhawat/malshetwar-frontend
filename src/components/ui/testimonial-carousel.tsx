"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO, TechCorp",
    content: "This product has revolutionized our workflow. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Bob Smith",
    role: "Designer, CreativeCo",
    content: "I&apos;ve never used a more intuitive and powerful tool. It&apos;s a game-changer.",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Carol Davis",
    role: "Freelancer",
    content: "As a freelancer, this has saved me countless hours. Worth every penny!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "David Brown",
    role: "Marketing Manager, BrandX",
    content: "Our team&apos;s productivity has soared since we started using this. Amazing!",
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="container px-0 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          What Our Customers Say
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-4 py-2">
                  <Card className="bg-white dark:bg-gray-800 border-none shadow-lg h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute sm:left-2 left-[2px]   top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute sm:right-2 right-[2px] top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </section>
  )
}