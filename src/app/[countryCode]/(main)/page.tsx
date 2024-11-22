import { Product } from "@medusajs/medusa"
import { Metadata } from "next"
import Image from "next/image"
import CollectionImage from '../../../app/assests/demo-glasses-img-01.webp'
import BannerImage from '../../../app/assests/demo-glasses-banner.webp'
import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import TestimonialCarousel from "components/ui/testimonial-carousel"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordian"

export const metadata: Metadata = {
  title: "Malshetwar Eyewear",
  description:
    "Discover the perfect fusion of Indian style and global vision at Malshetwar, your go-to online eyewear shop. Explore our vast collection of premium eyeglasses, sunglasses, and contact lenses, featuring both beloved Indian brands and international favorites. From classic designs to the latest fashion trends, we cater to diverse Indian tastes and preferences. Enjoy the convenience of virtual try-on technology, expert advice from our experienced optometrists, and swift delivery across India. Whether you're looking for everyday spectacles, stylish sun protection, or special occasion frames, Malshetwar offers quality eyewear solutions for men, women, and children. Experience the ease of online shopping with the trust of a proud Indian company. Visit Malshetwar today and see India in a whole new light!",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  console.log(countryCode,collections)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className=" my-12 py-12 grid grid-cols-1 sm:grid-cols-2 place-items-center ">
        <div className="flex flex-col justify-center items-center sm:items-start gap-4">
        <h2 className=" font-semibold text-ui-fg-muted text-lg">Contemporary Design</h2>
        <h1 className=" text-3xl sm:w-[60%] sm:text-4xl text-center sm:text-start">The Spring <span className=" font-bold text-sky-900 ">Summer</span> Cool Collection.</h1>
        <Link href="/in/collections/featured"><button className="py-6 px-12 bg-sky-900 text-lg text-white text-bold rounded-full my-4 hover:translate-x-1 hover:-translate-y-1 shadow-md transition-all">Shop Collections </button></Link>
        </div>
        <Image src={CollectionImage} alt=""></Image>
      </div>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <div className="w-full flex justify-center items-center p-12 my-12">
        <div className="">
      <Image src={BannerImage} alt="banner" className="object-cover"></Image>
      </div>
      </div>
      <TestimonialCarousel></TestimonialCarousel>
{/* 
      <div className="w-full h-44 bg-sky-200 flex justify-center items-center my-12">
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

      </div> */}
    </>
  )
}
