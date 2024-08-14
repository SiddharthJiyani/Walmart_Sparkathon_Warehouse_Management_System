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
  manufacturerName: "",
  manufacturerCountry: "",
  manufacturerState: "",
  manufacturerCity: "",
  manufacturerPincode: "",
  manufacturerAdminContact: "",
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
  console.log("product", product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    console.log(e.target.files[0]);
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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);
    
    // Manufacturing details
    // formData.append("manufacturerName", product.manufacturerName);
    formData.append("manufacturerCountry", product.manufacturerCountry);
    formData.append("manufacturerState", product.manufacturerState);
    formData.append("manufacturerCity", product.manufacturerCity);
    formData.append("manufacturerPincode", product.manufacturerPincode);
    formData.append("manufacturerAdminContact", product.manufacturerAdminContact);
    formData.append("dateOfManufacture", product.dateOfManufacture);
  
    // Stop locations
    formData.append("lastStop", product.lastStop);
    formData.append("currentStop", product.currentStop);
    formData.append("nextStop", product.nextStop);
  
    console.log("formdata",...formData);
  
    dispatch(createProduct(formData));
  
    // navigate("/dashboard");
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
