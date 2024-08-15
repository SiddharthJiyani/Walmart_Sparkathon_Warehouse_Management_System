import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

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
 
  const saveProduct = async (e) => {
    e.preventDefault();
    toast.loading ('Updating product...');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const productId = product?._id;
    const API_URL = `${BACKEND_URL}/api/products/${productId}`;

    console.log('ProductImage:', productImage);
    let imageUrl = '';
    if (productImage) {        
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

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("quantity", Number(product.quantity));
    formData.append("price", product.price);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);
    formData.append("manufacturingWarehouse", JSON.stringify(product.manufacturingWarehouse));
    formData.append("lastStop", product.lastStop);
    formData.append("currentStop", product.currentStop);
    formData.append("nextStop", product.nextStop);

    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    try {
        const response = await fetch(API_URL, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
          toast.dismiss();
          toast.error('Failed to edit product');
          throw new Error('Failed to edit product');
        }

        // const data = await response.json();
        // console.log('Product created successfully:', data);
        toast.dismiss();
        toast.success('Product updated successfully');
        navigate('/dashboard');
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
        isEditMode={true}
      />
    </div>
  );
};

export default EditProduct;
