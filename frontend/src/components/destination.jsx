// components/Destination.js
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';
import { CiHeart, CiCamera } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  MdStar,
  MdCheck,
  MdPeopleOutline,
  MdLocationPin,
  MdArrowRightAlt,
} from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { WiTime3 } from "react-icons/wi";

// Import `Carousel` với dynamic import để tắt SSR
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Places = ({ image, country, tours, column }) => (
  <div className={`relative overflow-hidden h-[270px] lg:col-span-${column}`}>
    <img src={image} alt="" className="h-full w-full rounded-lg object-cover hoverImg" />
    <p className="text-3xl text-white font-semibold absolute left-6 bottom-6">{country}</p>
    <button className="bg-orange text-white rounded-lg px-4 py-2 text-xs font-semibold absolute top-4 right-4">
      {tours} TOURS
    </button>
  </div>
);

const Tours = ({ image, name }) => (
  <div>
    <div className="relative overflow-hidden rounded-t-lg">
      <img src={image} alt="" className="rounded-t-lg hoverImg" />
      <div className="absolute flex justify-between top-4 left-4 right-4">
        <p className="bg-[#14B0C3] rounded-md px-4 py-1 text-white text-sm">FEATURED</p>
        <button className="bg-[#00000066] p-1 rounded-md">
          <CiHeart className="text-white text-xl" />
        </button>
      </div>
    </div>
    <div className="border border-[#ebe6de] rounded-b-lg relative">
      <div className="absolute w-full h-5 -top-5 bg-white rounded-t-[20px]"></div>
      <div className="p-6 pt-0">
        <div className="flex items-center gap-4 justify-between">
          <span className="flex justify-center">
            {[...Array(5)].map((_, index) => (
              <MdStar key={index} className="text-[#ffa801] text-xl" />
            ))}
            <p className="text-[#757783] pl-2">4.6</p>
          </span>
          <span className="flex gap-2">
            <div className="relative">
              <CiCamera />
              <button className="bg-orange text-xs rounded-full text-white w-4 h-4 flex items-center justify-center absolute top-0 right-0">
                5
              </button>
            </div>
            <IoVideocamOutline size={30} />
          </span>
        </div>
        <h4 className="text-xl font-semibold py-2 hover:text-orange">{name}</h4>
        <span className="flex items-center gap-2">
          <MdLocationPin className="text-orange text-xl" />
          <p className="text-[#757783] text-sm">Ha Noi, Viet Nam</p>
        </span>
        <span className="text-[#757783] flex py-4">
          From <p className="text-orange">$59.00</p>
        </span>
        <div className="bg-[#FAF8F4] flex justify-between py-4 px-4">
          <span className="flex items-center gap-2">
            <WiTime3 className="text-orange" /> 10 days
          </span>
          <span className="flex items-center gap-2">
            <MdPeopleOutline className="text-orange" /> 50
          </span>
          <a href="#" className="flex items-center gap-2 text-orange text-sm font-bold mt-2">
            explore <MdArrowRightAlt />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const flights = [
  {
    id: 1,
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    date: "26/01/2025",
    price: "979.000",
    views: "Đã xem: 7 phút trước",
    image: "/landmark81.jpg",
    position: "1/16"
  },
  {
    id: 2,
    from: "Hà Nội",
    to: "Đà Nẵng",
    date: "19/01/2025",
    price: "1.153.000",
    views: "Đã xem: 4 phút trước",
    image: "/golden_bridge.jpg",
    position: "2/16"
  },
  {
    id: 3,
    from: "Hà Nội",
    to: "Đà Lạt",
    date: "14/01/2025",
    price: "957.000",
    views: "Đã xem: 7 phút trước",
    image: "/dalat_diocese_cathedral.jpg",
    position: "3/16"
  },
  {
    id: 4,
    from: "Hà Nội",
    to: "Huế",
    date: "24/12/2024",
    price: "1.162.000",
    views: "Đã xem: 42 phút trước",
    image: "/tuduc_tomb.jpg",
    position: "4/16"
  },
]

export default function Destination() {
  return (
    <div className="lg:mt-60 mt-10" data-aos="fade-down">
      
      <div className="max-w-[1200px] px-6 mx-auto text-center">
      <p className="text-orange text-xl">Featured Flights</p>
      <h4 className="font-bold lg:text-[50px] text-[30px] py-4">Our Most Popular Flights</h4>

      {/* Select Dropdowns */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Select Location */}
        <Select defaultValue="hanoi">
          <SelectTrigger className="w-[240px] border border-gray-300 rounded-lg">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Hà Nội (HAN), Việt Nam</SelectItem>
            <SelectItem value="hcm">TP. Hồ Chí Minh (SGN), Việt Nam</SelectItem>
            <SelectItem value="danang">Đà Nẵng (DAD), Việt Nam</SelectItem>
          </SelectContent>
        </Select>

        {/* Select Budget */}
        <Select defaultValue="budget">
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg">
            <SelectValue placeholder="Select Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Under $100</SelectItem>
            <SelectItem value="mid-range">$100 - $500</SelectItem>
            <SelectItem value="luxury">Above $500</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Button */}
        <Button variant="link" className="text-blue-600">
          Clear
        </Button>
      </div>

      {/* Flights List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden group cursor-pointer">
            <div className="relative">
              
              {/* Flight Position */}
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {flight.position}
              </div>

              {/* Flight Image */}
              <Image
                src={flight.image}
                alt={`${flight.from} to ${flight.to}`}
                width={600}
                height={400}
                className="object-cover h-60 w-full group-hover:scale-105 transition-transform duration-300"
              />

              {/* Flight Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-4 text-white">
                  <div className="text-lg font-semibold">
                    {flight.from} to {flight.to}
                  </div>
                  <div className="text-xl font-bold mb-2">{flight.date}</div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <CardContent className="p-4 bg-orange bg-opacity-30">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="text-xl font-bold">{flight.price} VND*</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{flight.views}</div>
                  <div className="text-sm text-muted-foreground">One Way / Economy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    
    </div>
      
      
      <div className="bg-[url(/bg-line-bird.png)] bg-no-repeat py-16">
        <div className="lg:flex max-w-[1200px] px-6 mx-auto gap-8">
          <div className="relative lg:w-1/2" data-aos="fade-down">
            <img src="/image-6.jpg" alt="" />
            <div className="absolute top-4 right-4">
              <p className="text-orange font-semibold text-[80px]">30%</p>
              <p className="text-[50px] font-semibold -mt-8">Discount</p>
            </div>
            <button className="bg-white shadow-md px-12 py-4 absolute left-4 top-1/2 rounded-xl">
              <p className="text-gray text-xs font-medium">Book Tour Now</p>
              <p className="font-semibold text-lg">66888000</p>
            </button>
          </div>
          <div className="lg:w-1/2" data-aos="fade-up">
            <p className="text-orange text-xl">Get to know us</p>
            <h4 className="font-bold lg:text-[50px] text-[30px] py-4">Plan Your Trip with Trevily</h4>
            <p className="text-[#757783] leading-8 mb-8">
              There are many variations of passages available, but the majority have suffered alteration.
            </p>
            <span className="flex items-center gap-4 py-2 font-medium">
              <MdCheck className="bg-orange text-white rounded-xl" /> Invest in your simply neighborhood
            </span>
            <div className="mt-8">
              <button className="bg-orange text-white text-xs font-bold rounded-md px-8 h-12 hoverBtn">
                BOOK WITH US NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-10 px-6" data-aos="fade-down">
        <p className="text-orange text-xl pb-2">Featured news</p>
        <h4 className="lg:text-[50px] text-[30px] font-bold">Highlighted Information</h4>
        <div className="pt-8">
          <Carousel
            partialVisible={false}
            swipeable
            draggable={false}
            responsive={responsive}
            ssr={false}
            infinite
            autoPlay
            arrows
            keyBoardControl
            itemClass="carouselItem"
          >
            <Tours image="/tour-1.jpg" name="Ha Noi to Ho Chi Minh city" />
            <Tours image="/tour-2.jpg" name="Ha Noi to Da Nang city" />
            <Tours image="/tour-3.jpg" name="Ha Noi to Da Lat" />
            <Tours image="/tour-4.jpg" name="Ha Noi to Hue" />
            <Tours image="/tour-5.jpg" name="Ha Noi to Bangkok" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}