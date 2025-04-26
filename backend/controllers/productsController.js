import express from "express";
import Product from "../Models/ProductModle.js";

export const addNewProduct = async (req,res) =>{
    const {name,description,price,discountPrice,countInstock,category,brand,sizes,colors,collection,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku} = req.body
     try {
        const product = new Product({
            name,description,price,discountPrice,countInstock,category,brand,sizes,colors,collection,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku, user:req.user._id})

            const createdProduct = await product.save()
            res.status(201).json({
                success:true,
                message:("Product Created" , createdProduct)
            })


     } catch (error) {
        res.status(404).json({
            success:false,
            message: error.message
        })
        
     }
}

//Update the Product

export const updateProduct = async (req,res) =>{
    try {
        const {name,description,price,discountPrice,countInstock,category,brand,sizes,colors,collection,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku} = req.body

    const findProduct = await Product.findById(req.params.id)

    if(findProduct){
        findProduct.name = name || findProduct.name
        findProduct.description = description || findProduct.description
        findProduct.price = price || findProduct.price
        findProduct.discountPrice = discountPrice || findProduct.discountPrice
        findProduct.countInstock = countInstock || findProduct.countInstock
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.sizes = sizes || findProduct.sizes
        findProduct.colors = colors || findProduct.colors
        findProduct.collection = collection || findProduct.collection
        findProduct.material = material || findProduct.material
        findProduct.gender = gender || findProduct.gender
        findProduct.images = images || findProduct.images
        findProduct.isFeatured = isFeatured !== undefined ? isFeatured : findProduct.isFeatured
        findProduct.isPublished = isPublished !== undefined ? isPublished : findProduct.isPublished
        findProduct.tags = tags || findProduct.tags
        findProduct.dimensions = dimensions || findProduct.dimensions
        findProduct.weight = weight || findProduct.weight
        findProduct.sku = sku || findProduct.sku

         const updatedProduct = await findProduct.save()
         res.status(201).json({
            success:true,
            message: ("prodct Updates", updatedProduct)
         })
    } else{
        res.status(404).json({
            success:false,
            message:("Product Not Found")
        })
    }
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const deleteProduct = async (req,res) =>{
    try {
        const findProduct = await Product.findById(req.params.id)
        
        if(findProduct){
            await findProduct.deleteOne()

            res.status(201).json({
                success:true,
                message:("Product deleted"),
                productID: findProduct._id
            })
        }else{
            res.status(404).json({
                success:false,
                message:("product Not found")
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}

export const getProductsByQuery = async (req, res) => {
    try {
      const {
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
      } = req.query;
  
      let query = {};
  
      // Collection filter
      if (collection && collection.toLowerCase() !== "all") {
        query.collections = collection;
      }
  
      // Category filter
      if (category && category.toLowerCase() !== "all") {
        query.category = category;
      }
  
    // Convert material to case-insensitive regex
          if (material) {
    const materials = material.split(",").map(mat => new RegExp(`^${mat}$`, "i"));
    query.material = { $in: materials };
          }
  
      // Brand filter
      if (brand) {
        query.brand = { $in: brand.split(",") };
      }
  
      // Size filter
      if (size) {
        query.sizes = { $in: size.split(",") };
      }
  
      // Color filter
      // Convert color values to case-insensitive regex


           if (color) {
               const colors = color.split(",").map(col => new RegExp(`^${col}$`, "i"));
               query.colors = { $in: colors };
              }
      // Gender filter
      if (gender) {
        query.gender = gender;
      }
  
      // Price filter (✅ FIXED HERE)
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      // Search
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
  
      // Sorting logic
      let sort = {};
      if (sortBy) {
        switch (sortBy) {
          case "priceAsc":
            sort = { price: 1 };
            break;
          case "priceDesc":
            sort = { price: -1 };
            break;
          case "Popularity":
            sort = { rating: -1 };
            break;
          default:
            break;
        }
      }
  
      // ✅ Log query for debugging
    //   console.log("Final Query:", query);
  
      // Fetch filtered and sorted products
      const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
  
      res.status(200).json({
        success: true,
        message: products,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const bestSellingProduct = async (req,res)=>{
    try {
      const bestSeller = await Product.findOne().sort({rating:-1})

      if(bestSeller){
        res.status(201).json({
          success:true,
          message:("Best Selling Product" , bestSeller)
      })
        
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
    });

      
    }
  }

  export const getNewArrivals = async (req,res)=>{
    try {
    //  const newArrivals = await Product.findOne().sort({createdAt:-1}).limit(8)
      const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);


      if (newArrivals) {
        res.status(201).json({
          success:true,
          message:("New Arrival Product" ,newArrivals)
        })
        
      }else{
        res.status(404).json({
          success:false,
          message:("No New product is avalible")
          
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
    });

      
    }
  }


  export const getSingleProduct = async (req,res)=>{
    try {
        const findSingleProduct = await Product.findById(req.params.id)

        if(findSingleProduct){
            res.status(201).json({
                success:true,
                message:("Find Product" , findSingleProduct)
            })
        }else{
            res.status(404).json({
                success:false,
                message:("Product Not Found")
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

        
    }
  }

  export const getSimilarProduct = async (req,res)=>{
    const {id} = req.params

    try {
      const product = await Product.findById(id)

      if(!product){
        res.status(404).json({
          success:false,
          message:("Product Not found")
        })
      }

      const similarProducts = await Product.find({
        _id:{$ne: id},
        gender:product.gender,
        category:product.category
      }).limit(4) 

      res.status(201).json({
        success:true,
        message:("similar Prduct" , similarProducts)
      })


    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
    })
      
    }
  }

  