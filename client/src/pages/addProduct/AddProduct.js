import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

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

  const { name, category, price, quantity  } = product;
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

  // const saveProduct = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("sku", generateKSKU(category));
  //   formData.append("category", category);
  //   formData.append("quantity", Number(quantity));
  //   formData.append("price", price);
  //   formData.append("description", description);
  //   formData.append("image", productImage);
    
  //   // Manufacturing details
  //   // formData.append("manufacturerName", product.manufacturerName);
  //   formData.append("manufacturerCountry", product.manufacturerCountry);
  //   formData.append("manufacturerState", product.manufacturerState);
  //   formData.append("manufacturerCity", product.manufacturerCity);
  //   formData.append("manufacturerPincode", product.manufacturerPincode);
  //   formData.append("manufacturerAdminContact", product.manufacturerAdminContact);
  //   formData.append("dateOfManufacture", product.dateOfManufacture);
  
  //   // Stop locations
  //   formData.append("lastStop", product.lastStop);
  //   formData.append("currentStop", product.currentStop);
  //   formData.append("nextStop", product.nextStop);
  
  //   console.log("formdata in Add product",formData);
  
  //   dispatch(createProduct(formData));
  
  //   // navigate("/dashboard");
  // };

  const saveProduct = async (e) => {
    e.preventDefault();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/products/`;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("sku", generateKSKU(product.category));
    formData.append("category", product.category);
    formData.append("quantity", Number(product.quantity));
    formData.append("price", product.price);
    formData.append("description", description);
    formData.append("image", {});
    formData.append("manufacturingWarehouse", JSON.stringify(product.manufacturingWarehouse));
    formData.append("lastStop", product.lastStop);
    formData.append("currentStop", product.currentStop);
    formData.append("nextStop", product.nextStop);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        // const data = await response.json();
        // console.log('Product created successfully:', data);
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
