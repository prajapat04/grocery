import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCart from '../components/ProductCart';

const Products = () => {
  const { products, searchQuery } = useContext(AppContext);
  const [filterdProducts, setFilterdProducts] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterdProducts(
        products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterdProducts(products);
    }
  }, [Products, searchQuery]);
  return (
    <div className='mt-16'>
      <h1 className='text-3xl lg:text-4xl font-medium'>All Products</h1>
      <div className='my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
        {
          filterdProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCart key={index} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Products