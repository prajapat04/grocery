import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCart from '../components/ProductCart';

export const ProductCategory = () => {

  const { products, navigate } = useContext(AppContext);
  const { category } = useParams();
  const searchCategory = categories.find((item) => item.path.toLowerCase() === category.toLowerCase());

  const filterProduct = products.filter((product) =>
    product.category.toLowerCase()=== category
  );
  return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
          <h1 className='text-3xl md:w-4xl font-medium'>{searchCategory.text.toLocaleUpperCase()}</h1>
        </div>
      )}
      {
        filterProduct.length > 0 ? (
          <div>
            <div className='my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
              {
                filterProduct.map((prodcut, index) => (
                  <ProductCart key={index} product={prodcut} />
                ))
              }
            </div>
          </div>
        ) : (
          <div className='text-3xl md:text-4xl font-medium'>
            <h1>No Product Found.</h1>
          </div>
        )
      }
    </div>
  )
}
