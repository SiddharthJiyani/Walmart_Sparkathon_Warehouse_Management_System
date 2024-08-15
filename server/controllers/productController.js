const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const {fileSizeFormatter} = require('../utiles/fileUpload');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
 
//create product
const createProduct = asyncHandler(async (req, res) => {
    const {name, sku, category, quantity, price, description, manufacturingWarehouse, lastStop, currentStop, nextStop,imageUrl} = req.body;

    //validation
    if(!name || !category || !quantity || !price || !description || !manufacturingWarehouse || !currentStop){
        res.status(400);
        throw new Error('Please add all fields');
    }
    console.log('Manufacturing warehouse:', manufacturingWarehouse);
    let parsedManufacturingWarehouse;
    try {
        parsedManufacturingWarehouse = JSON.parse(manufacturingWarehouse);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid manufacturingWarehouse format');
    }


    // handle image upload
    // let fileData = {};
    // if (req.file) {
    //     // save image to cloudinary
    //     let uploadedFile;
    //     try {
    //         uploadedFile = await cloudinary.uploader.upload(req.file.path, {
    //             folder: "Walmart's Inventory",
    //             resource_type: 'image',
    //         });
    //         console.log('Uploaded file:', uploadedFile);
    //     } catch (error) {
    //         res.status(500);
    //         throw new Error('Image upload failed');
    //     }
        
    //     fileData = {
    //         fileName: req.file.originalname,
    //         filePath: uploadedFile.secure_url,
    //         fileType: req.file.mimetype,
    //         fileSize: fileSizeFormatter(req.file.size, 2),
    //     };
    // }   

    // console.log('File data:', fileData);


    //create product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image : imageUrl,
        manufacturingWarehouse: parsedManufacturingWarehouse,
        lastStop,
        currentStop,
        nextStop
    }).then((product) => {
        console.log('Product creation success');
    }).catch((error) => {
        console.error('Error creating product:', error);
    }); 
    // console.log('ok');
    res.status(201).json(product);
});

//get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({user: req.user.id}).sort('-createdAt');
    res.status(200).json(products);
})

//get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //if product doesnt exist
    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }

    //match product to user
    // if(product.user.toString() !== req.user.id){
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }
    res.status(200).json(product);
})

const getProductByName = asyncHandler(async (req, res) => {
	const product = await Product.findOne({name: { $regex: new RegExp(name, "i") },});
	//if product doesnt exist
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	res.status(200).json(product);
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //if product doesnt exist
    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }

    //match product to user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    await product.deleteOne();
    res.status(200).json({message: 'Product removed'});
})

//update product
const updateProduct = asyncHandler(async (req, res) => {
    const {name, category, quantity, price, description, manufacturingWarehouse, lastStop, currentStop, nextStop,imageUrl } = req.body;
    const  {id} = req.params;

    const product = await Product.findById(id);

    //if product doesnt exist
    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }

    //match product to user
    // if(product.user.toString() !== req.user.id){
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }

    let parsedManufacturingWarehouse;
    try {
        parsedManufacturingWarehouse = JSON.parse(manufacturingWarehouse);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid manufacturingWarehouse format');
    }

    //handle image upload @siddharth also set the image in the edit product so previous image is not lost
    let fileData={};
    // if(req.file){
    //     //save image to cloudinary
    //     let uploadadedFile ;
    //     try {
    //         uploadadedFile = await cloudinary.uploader.upload(req.file.path),{
    //             folder : 'SoftLoom App',
    //             resource_type : 'image',
    //         }
    //     }catch(error){
    //         res.status(500);
    //         throw new Error('Image upload failed');
    //     }
    //     fileData = {
    //         fileName : req.file.originalname,
    //         filePath : uploadadedFile.secure_url,
    //         fileType : req.file.mimetype,
    //         fileSize : fileSizeFormatter(req.file, 2),
    //     };
    // }

    //update product
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id: id},
        {
                name,
                category,
                quantity,
                price,
                description,
                image : imageUrl,
                manufacturingWarehouse: parsedManufacturingWarehouse,
                lastStop,
                currentStop,
                nextStop
        },
        {
            new: true,
            runValidators: true
        }
    ).then(() => {
        console.log('Product updated successfully');
    }).catch((error) => {
        console.error('Error updating product:', error);
    })
    // console.log("Updated product:", updatedProduct);
    
    res.status(200).json(updatedProduct);
})

const getAllProducts = asyncHandler(async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products);
    }
    catch(error){
        res.status(500);
        throw new Error('Server error');
    }
})


module.exports = {
	createProduct,
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	getAllProducts,
	getProductByName
};