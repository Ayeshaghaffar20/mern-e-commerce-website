import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from "react-router-dom"
import axios from "axios";

const NewArrivals = () => {

    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)


    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrivals = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getNewArrivals`);
            // console.log("New arrivals response:", response.data.message);
         
            
            setNewArrivals(response.data.message); // Adjust if message contains the array
            
          } catch (error) {
            console.error("Error fetching new arrivals:", error);
          }
        };
        fetchNewArrivals();
      }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offSetLeft)
        setCanScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const x = e.pageX - scrollRef.current.offSetLeft
        const walk = x - startX
        scrollRef.current.offSetLeft = scrollLeft - walk

    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)

    }






    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

    }


    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const scrollLeft = container.scrollLeft;
            const rightScrollable = container.scrollWidth > scrollLeft + container.clientWidth

            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(rightScrollable)
        }

    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons()
        }
    }, [newArrivals])


    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative '>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>Be the first to get your hands on our latest arrivals, featuring fresh designs and exciting new trends. From the season’s hottest picks to timeless classics, our new arrivals are here to refresh your wardrobe. Shop now and stay ahead of the curve with the newest styles!</p>


                {/* scroll Button  */}
                <div className='flex justify-end space-x-2 mt-6 pr-4'>
                    <button onClick={() => scroll("left")}
                        disabled={!canScrollLeft} className={`rounded border p-2 ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button onClick={() => scroll("right")} className={`rounded border p-2 ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* scrollable Content  */}

            <div ref={scrollRef} style={{ scrollBehavior: "smooth" }}
                className='container mx-auto relative space-x-6 px-6 pr-4 overflow-x-scroll flex  scrollbar-hide'
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUpOrLeave}
                onMouseUp={handleMouseUpOrLeave}
                onMouseMove={handleMouseMove} >

               
                {Array.isArray(newArrivals) && newArrivals.map((item) => (
                    
                    
                    <div key={item._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                      
                        <img src={item.images[0]?.url} alt="" draggable="false" className="w-full h-[400px] rounded-lg object-cover" />
                      
                        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white rounded-b-lg p-4 bg-opacity-50">
                            <Link to={`/product/${item._id}`} className="block">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="mt-1">${item.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}



            </div>
        </section>
    )
}

export default NewArrivals
