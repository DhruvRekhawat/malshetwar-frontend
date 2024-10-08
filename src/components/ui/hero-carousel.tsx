"use client"

import * as React from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Image1 from '../../app/assests/image-titan-1.webp'
import Image2 from '../../app/assests/Image-titan-2.webp'
import Image3 from '../../app/assests/Image-titan-4.webp'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
export default function HeroCarousel() {
  const carouselItems = [
    {
      image: Image1,
      title: "Summer Collection",
      description: "Discover our latest summer styles",
      cta: "Shop Now",
    },
    {
      image: Image2,
      title: "New Arrivals",
      description: "Be the first to get our newest products",
      cta: "Explore",
    },
    {
      image: Image3,
      title: "Special Offer",
      description: "Get up to 50% off on selected items",
      cta: "View Deals",
    },
  ]


  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  React.useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 2000) // Change slide every 3 seconds

    return () => clearInterval(intervalId)
  }, [api])

  return (
    <Carousel 
    setApi={setApi}
    opts={{
      loop:true,
    }}

    className=" max-w-[90%] mx-auto mt-6 flex justify-center items-center">
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className=" basis-100" >
            <Card className="border-none w-[350px] h-[100px] sm:w-[700px] sm:h-[200px] rounded-md  ">
              <CardContent className="flex  items-center justify-center p-0">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
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