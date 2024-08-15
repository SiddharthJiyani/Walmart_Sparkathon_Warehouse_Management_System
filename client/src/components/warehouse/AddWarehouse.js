import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../card/Card";
import { getWarehouses } from "../../services/authService";
import "./AddWarehouse.scss";

const WarehouseForm = ({
  Warehouse,
  handleInputChange,
  saveWarehouse,
  isEditMode
}) => {


  return (
    <div className="add-warehouse">
      {/* Warehouse details form */}
      <Card cardClass={"card"}>
        <form onSubmit={saveWarehouse} >
          <div className="form" >
            
            {/* Warehouse's details */}
            <div
              style={
                {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem"
                }
              }
            >
              <label>Warehouse Name:</label>
              <input
                type="text"
                placeholder="Warehouse Name"
                name="name"
                value={Warehouse?.name}
                onChange={handleInputChange}
                required
              />

              <label>Warehouse Type:</label>
              <select
                name="type"
                value={Warehouse?.name}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="storage">Storage</option>
                <option value="distributor">Distribution</option>
                <option value="retail">Retail</option>
              </select>


              <label>Warehouse Country:</label>
              <input
                type="text"
                placeholder="Warehouse Country"
                name="country"
                value={Warehouse?.country}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Warehouse State:</label>
              <input
                type="text"
                placeholder="Warehouse State"
                name="state"
                value={Warehouse?.state}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Warehouse City:</label>
              <input
                type="text"
                placeholder="Warehouse City"
                name="city"
                value={Warehouse?.city}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Warehouse Pincode:</label>
              <input
                type="text"
                placeholder="Warehouse Pincode"
                name="pincode"
                value={Warehouse?.pincode}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />

              <label>Warehouse Admin Contact:</label>
              <input
                type="text"
                placeholder="Warehouse Admin Contact"
                name="warehouseAdminContact"
                value={Warehouse?.warehouseAdminContact}
                onChange={handleInputChange}
                {...(isEditMode ? {} : { required: true })}
              />
            </div>

          </div>
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Warehouse
            </button>
          </div>

          
        </form>
      </Card>


    </div>
  );
};


export default WarehouseForm;