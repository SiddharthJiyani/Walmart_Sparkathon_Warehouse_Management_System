import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehouseForm from '../../components/warehouse/AddWarehouse';
import { toast } from 'react-toastify';
import { getWarehouses } from '../../services/authService';
import './Warehouse.scss';

const initialState = {
  name: "",
  type: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  warehouseAdminContact: "",
};

const Warehouse = () => {
  const [warehouse, setWarehouse] = useState(initialState);
  const [warehousesList, setWarehousesList] = useState([]);
  const navigate = useNavigate();

  const getWarehousesDetails = async () => {
    try {
      const data = await getWarehouses();
      setWarehousesList(data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  }

  useEffect(() => {
    getWarehousesDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [name]: value,
    }));
  };

  const saveWarehouse = async (e) => {
    e.preventDefault();
    toast.loading('Creating warehouse...');

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/warehouses/`;

    const warehouseData = {
      name: warehouse.name,
      type: warehouse.type,
      country: warehouse.country,
      state: warehouse.state,
      city: warehouse.city,
      pincode: warehouse.pincode,
      warehouseAdminContact: warehouse.warehouseAdminContact,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warehouseData),
        credentials: 'include',
      });

      if (!response.ok) {
        toast.dismiss();
        toast.error('Failed to create warehouse');
        throw new Error('Failed to create warehouse');
      }

      toast.dismiss();
      toast.success('Warehouse created successfully');
      getWarehousesDetails(); 
      setWarehouse(initialState); 
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();
      console.error('Error:', error);
    }
  };

  return (
    <div className="warehouse-container">
      <h3 className="--mt">Add New Warehouse</h3>
      <WarehouseForm
        warehouse={warehouse}
        handleInputChange={handleInputChange}
        saveWarehouse={saveWarehouse}
      />

      <div className="warehouse-list">
        <h4>Current Warehouses</h4>
        {warehousesList.length === 0 ? (
          <p>No warehouses available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Pincode</th>
                <th>Admin Contact</th>
              </tr>
            </thead>
            <tbody>
              {warehousesList.map((warehouse, index) => (
                <tr key={index}>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.type}</td>
                  <td>{`${warehouse.city}, ${warehouse.state}, ${warehouse.country}`}</td>
                  <td>{warehouse.pincode}</td>
                  <td>{warehouse.warehouseAdminContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Warehouse;
