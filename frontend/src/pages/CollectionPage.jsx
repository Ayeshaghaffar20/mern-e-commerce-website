import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from './FilterSidebar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByFilter } from '../redux/slices/productSlices';

const CollectionPage = () => {
    const { collection } = useParams();
const [searchParams] = useSearchParams(); // ✅ no destructuring
const dispatch = useDispatch();
const { products, loading, error } = useSelector((state) => state.products);

const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null)
    // const [products,setProducts] = useState()
    const [isFilterSidebarOpen,setIsFilterSidebarOpen] = useState(false)

useEffect(()=>{
    dispatch(fetchProductByFilter({collection, ...queryParams}))
},[dispatch,collection,searchParams])


    const toggleSideBar = () =>{
        setIsFilterSidebarOpen(!isFilterSidebarOpen)
    }

    const handleClickOutSide = (e) =>{
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsFilterSidebarOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutSide);
        
        // ✅ Clean up on unmount
        return () => {
          document.removeEventListener("mousedown", handleClickOutSide);
        };
      }, []);

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         const fetchedProducts =[
    //             {
    //                  _id: 1,
    //                  name: "Product 1",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=1"}]
    //              },
    //               {
    //                  _id: 2,
    //                  name: "Product 2",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=2"}]
    //              },
    //               {
    //                  _id: 3,
    //                  name: "Product 3",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=3"}]
    //              },
    //               {
    //                  _id: 4,
    //                  name: "Product 4",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=4"}]
    //              },
    //               {
    //                  _id: 5,
    //                  name: "Product 5",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=5"}]
    //              },
    //               {
    //                  _id: 6,
    //                  name: "Product 6",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=6"}]
    //              },
    //               {
    //                  _id: 7,
    //                  name: "Product 7",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=7"}]
    //              },
    //               {
    //                  _id: 8,
    //                  name: "Product 8",
    //                  price:160,
    //                  images:[{url:"https://picsum.photos/500/500?random=8"}]
    //              },
    //          ];
    //          setProducts(fetchedProducts)

    //     },1000)
    // },[])



  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter button  */}
        <button onClick={toggleSideBar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2'/> Filters
        </button>

        {/* filter sidebar  */}

        <div ref={sidebarRef} className={`${isFilterSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 w-94 z-50 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>

        <div className='flex-grow  p-4'>
            <h2 className='mb-4 text-2xl uppercase'>All collection</h2>

            {/* Sort Option  */}
            <SortOption/>

            {/* Product Grid  */}

            <ProductGrid products={products} loading={loading} error={error}/>
        </div>


      
    </div>
  )
}

export default CollectionPage
