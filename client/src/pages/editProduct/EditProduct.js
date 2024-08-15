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
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
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
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const productId = product?._id;
    const API_URL = `${BACKEND_URL}/api/products/${productId}`;

    const formData = new FormData();
    formData.append("name", product.name);
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
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to edit product');
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
