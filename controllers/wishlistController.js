const Wishlist = require('../model/wishlist.model')

const createWishlistHandler = async (req, res) => {
    const newWishllist = new Wishlist(req.body);
    try{
        const savedWishlist = await newWishllist.save();
        res.status(201).json(savedWishlist)
    }catch(err){
        res.status(500).json({message: "failed to create wishlist"})
    }
}

const deleteWishlistHandler = async (req, res) => {
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({message: "Hotel deleted from Wishlist"})
    }catch(err){
        res.status(500).json({message: "could not delete hotel from wishlist"});
    }
}

const getWishlistHandler = async (req, res) => {
    try{
        const wishlist = await Wishlist.find();
        wishlist ? res.json(wishlist) : res.json({message: "no item found in wishlist"})
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = { createWishlistHandler, deleteWishlistHandler, getWishlistHandler };