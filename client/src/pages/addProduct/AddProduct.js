import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  manufacturingWarehouse: {
    country: "",
    state: "",
    city: "",
    pincode: "",
    warehouseAdminContact: "",
    dateOfManufacture: "",
  },
  dateOfManufacture: "",
  lastStop: "",
  currentStop: "",
  nextStop: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  // const { name, category, price, quantity  } = product;
  // console.log("product", product);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in product.manufacturingWarehouse) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        manufacturingWarehouse: {
          ...prevProduct.manufacturingWarehouse,
          [name]: value,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    // console.log(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

const saveProduct = async (e) => {
  e.preventDefault();
  toast.loading ('Creating product...');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_URL = `${BACKEND_URL}/api/products/`;

  // First, upload the image to Cloudinary
  let imageUrl = '';
  if (productImage) {
      const formData = new FormData();
      
      try {
        const image = new FormData();
        image.append('file', productImage);
        image.append('upload_preset', 'Walmart'); // Cloudinary preset
        image.append('cloud_name', 'djodcayme');
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djodcayme/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageUrl = imgData.url.toString();
      } catch (error) {
          console.error('Error uploading image:', error);
          return;
      }
  }

  // Now, send the product data to your backend
  let productData = new FormData();
  productData.append("name", product.name);
  productData.append("sku", generateKSKU(product.category));
  productData.append("category", product.category);
  productData.append("quantity", Number(product.quantity));
  productData.append("price", product.price);
  productData.append("description", description);
  productData.append("imageUrl", imageUrl);  // Add the Cloudinary URL
  productData.append("manufacturingWarehouse", JSON.stringify(product.manufacturingWarehouse));
  productData.append("lastStop", product.lastStop);
  productData.append("currentStop", product.currentStop);
  productData.append("nextStop", product.nextStop);


  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          body: productData,
          credentials: 'include',
      });

      if (!response.ok) {
        toast.dismiss();
        toast.error('Failed to create product');
        throw new Error('Failed to create product');
      }

      // const data = await response.json();
      // console.log('Product created successfully:', data);
      toast.dismiss();
      toast.success('Product created successfully');
      navigate('/dashboard');
  } catch (error) {
      console.error('Error:', error);
  }
};

  

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
