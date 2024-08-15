import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import { getWarehouses } from "../../../services/authService";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  isEditMode
}) => {
  const [warehouses, setWarehouses] = useState([]);
  const getWarehousesDetails = async () => {
    const data = await getWarehouses();
    console.log("warehouse data",data)
    setWarehouses(data);
  }

  useEffect(() => {
    getWarehousesDetails();
  }, []);


  return (
    <div className="add-product">
      {/* Product details form */}
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct} >
          <div className="form"> 
            {/* Product Details */}
            <div>
              <Card cardClass={"group"}>
                <label>Product Image</label>
                <code className="--color-dark">
                  Supported Formats: jpg, jpeg, png
                </code>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                  {...(isEditMode ? {} : { required: true })}
                />

                {imagePreview != null ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="product" />
                  </div>
                ) : (
                  <p>No image set for this poduct.</p>
                )}
              </Card>
              <label>Product Name:</label>
              <input
                type="text"
                placeholder="Product name"
                name="name"
                value={product?.name}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Product Category:</label>
              {/* <input
                type="text"
                placeholder="Product Category"
                name="category"
                value={product?.category}
                onChange={handleInputChange}
                required
              /> */}
              <select
                name="category"
                value={product?.category}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="appliances">Home appliances</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="home">Home Decor</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="others">Others</option>
                </select>

              <label>Product Price:</label>
              <input
                type="text"
                placeholder="Product Price"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Product Quantity:</label>
              <input
                type="text"
                placeholder="Product Quantity"
                name="quantity"
                value={product?.quantity}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Product Description:</label>
              <div className="desp">
                <ReactQuill
                  theme="snow" 
                  value={description}
                  onChange={setDescription}
                  modules={ProductForm.modules}
                  formats={ProductForm.formats}
                />
              </div>
            </div>
            
            {/* Manufacturer's details */}
            <div>
              {/* <label>Manufacturer Name:</label>
              <input
                type="text"
                placeholder="Manufacturer Name"
                name="manufacturerName"
                value={product?.manufacturerName}
                onChange={handleInputChange}
                required
              /> */}

              <label>Manufacturer Country:</label>
              <input
                type="text"
                placeholder="Manufacturer Country"
                name="country"
                value={product?.manufacturingWarehouse?.country}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Manufacturer State:</label>
              <input
                type="text"
                placeholder="Manufacturer State"
                name="state"
                value={product?.manufacturingWarehouse?.state}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Manufacturer City:</label>
              <input
                type="text"
                placeholder="Manufacturer City"
                name="city"
                value={product?.manufacturingWarehouse?.city}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Manufacturer Pincode:</label>
              <input
                type="text"
                placeholder="Manufacturer Pincode"
                name="pincode"
                value={product?.manufacturingWarehouse?.pincode}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Manufacturer Admin Contact:</label>
              <input
                type="text"
                placeholder="Manufacturer Admin Contact"
                name="warehouseAdminContact"
                value={product?.manufacturingWarehouse?.warehouseAdminContact}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Date of Manufacture:</label>
              <input
                type="date"
                placeholder="Date of Manufacture"
                name="dateOfManufacture"
                value={product?.manufacturingWarehouse?.dateOfManufacture}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />
            </div>

            {/* Stops ( Current location of where product is)*/}
            <div>
              <label>Last stop : </label>
              <select
                name="lastStop"
                value={product?.lastStop}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>

              <label>Current Location : </label>
              <select
                name="currentStop"
                value={product?.currentStop}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>

              <label>Next Stop: </label>
              <select
                name="nextStop"
                value={product?.nextStop}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>

          
        </form>
      </Card>


    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;