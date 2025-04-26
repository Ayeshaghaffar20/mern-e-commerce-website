import express from "express";
import Product from "../Models/ProductModle.js";
import Cart from "../Models/CartModel.js";


const getCart = async (userId, guestId) => {
    if (userId) {
      return await Cart.findOne({ user: userId });
    } else if (guestId) {
      return await Cart.findOne({ guestId });
    }
    return null;
  };
  
  export const creatCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found"
        });
      }
  
      let cart = await getCart(userId, guestId);
  
      if (cart) {
        const productIndex = cart.products.findIndex(
          (item) =>
            item.productId.toString() === productId &&
            item.size === size &&
            item.color === color
        );
  
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({
            productId,
            name: product.name,
            image: product.images[0]?.url,
            price: Number(product.price),
            size,
            color,
            quantity,
          });
        }
  
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
  
        await cart.save();
  
        return res.status(201).json({
          success: true,
          message: cart,
          
        });
  
      } else {
        const newCart = await Cart.create({
          user: userId ? userId : undefined,
          guestId: guestId ? guestId : "guest_" + new Date().getTime(),
          products: [
            {
              productId,
              name: product.name,
              image: product.images[0]?.url,
              price: Number(product.price),
              size,
              color,
              quantity,
            }
          ],
          totalPrice: Number((Number(product.price) * quantity).toFixed(2))
        });
  
        return res.status(201).json({
          success: true,
          message: "Cart created",
          data: newCart
        });
      }
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  export const UpdateCartProduct = async (req,res) =>{
    const {productId,quantity,size,color,guestId,userId} = req.body
    try {
        let cart = await getCart(userId,guestId)
        
        if(!cart) return res.status(404).json({
            success:false,
            message:('Product Not Found')
        })

        const productIndex = cart.products.findIndex(
            (item) =>
              item.productId.toString() === productId &&
              item.size === size &&
              item.color === color
          );
          if (productIndex > -1) {

            if(quantity >0 ){
                cart.products[productIndex].quantity = quantity;
            } else{
                cart.products.splice(productIndex,1)
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              );
        
              await cart.save();
        
              return res.status(201).json({
                success: true,
                message: "Cart updated",
                data: cart
              });

          } else{
            res.status(201).json({
                success: false,
                message: ("Cart Not Found")
              });
          }           


}  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const deleteCartProduct = async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
  
    try {
      let cart = await getCart(userId, guestId);
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found"
        });
      }
  
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );
  
      if (productIndex > -1) {
        // ✅ Remove product from array
        cart.products.splice(productIndex, 1);
  
        // ✅ Update total price
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
  
        await cart.save();
  
        return res.status(200).json({
          success: true,
          message: cart
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Product not found in cart"
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  
export const getAllCarts = async (req,res) =>{
    const {userId, guestId} = req.query

    try {
        let cart = await getCart(userId, guestId);
  
        if (cart) {
          return res.status(201).json({
            success: true,
            message: cart
          });
        } else{
        return res.status(404).json({
          success: false,
          message: "Cart not found"
        });
      
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
          });
    }
}

export const mergeCarts = async (req,res)=>{
    const {guestId} = req.body

    try {
        const guestCart = await Cart.findOne({guestId})
        const userCart = await Cart.findOne({user: req.user._id})

        if(guestCart){
            if(guestCart.products.length===0){
                res.status(404).json({
                    success: false,
                    message: ("Guest Cart is empty")
                  });
            }

            if(userCart){
                guestCart.products.forEach((guestItem)=>{
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                          item.productId.toString() === guestItem.productId.toString() &&
                          item.size === guestItem.size &&
                          item.color === guestItem.color
                      )

                      if(productIndex >-1){
                        userCart.products[productIndex].quantity += guestItem.quantity
                    }else{
                        userCart.products.push(guestItem)
                    }
                });

                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  );
            
                  await userCart.save();

                  try {
                    await Cart.findOneAndDelete({guestId})

                  } catch (error) {
                    console.log("Error Deleting guest Cart", error);
                  }
                  res.status(201).json({
                    success: true,
                    message: userCart
                  });
            }else{
                guestCart.user= req.user._id
                guestCart.guestId= undefined
                await guestCart.save()

                res.status(201).json({
                    success: true,
                    message: guestCart
                  })
            }
        }else{
            if(userCart){
                res.status(201).json({
                    success: true,
                    message: userCart
                  });
            }
            res.status(201).json({
                success: false,
                message:("Guest card not Found")
              });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
          });
        
    }
}