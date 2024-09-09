import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image1 from '@/app/assests/image-titan-1.webp'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
export default function HeroCarousel() {
  const carouselItems = [
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "Summer Collection",
      description: "Discover our latest summer styles",
      cta: "Shop Now",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "New Arrivals",
      description: "Be the first to get our newest products",
      cta: "Explore",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "Special Offer",
      description: "Get up to 50% off on selected items",
      cta: "View Deals",
    },
  ]

  return (
    <Carousel className=" max-w-[90%] mx-auto  mt-6 flex justify-center items-center">
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className=" basis-100" >
            <Card className="border-none w-[700px] h-[200px] rounded-md  ">
              <CardContent className="flex  items-center justify-center p-0">
                <div className="relative w-full h-full">
                  <Image
                    src={Image1}
                    width={1400}
                    height={400}
                    objectFit="fit"
                    alt={item.title}

                    className="w-full h-full object-fit rounded-md"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white mb-4">
                      {item.description}
                    </p>
                    <Button variant="secondary" size="lg">
                      {item.cta}
                    </Button>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}