import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import productApi from '../../apis/product.api'
import Pagination from '../../component/Pagination'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.api'
import useQueryConfig from '../../hooks/useQueryConfig'


export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
//15-16/8-1//https://shopee.vn/B%C3%BAp-b%C3%AA-t%C3%B3c-m%C3%A2y-b%C3%BAp-b%C3%AA-elsa-%C4%91%E1%BB%93-ch%C6%A1i-cho-b%C3%A9-g%C3%A1i-i.42892452.21157291445?sp_atk=f00727ef-6ee3-4391-b35f-70eb94bb5c7a&xptdk=f00727ef-6ee3-4391-b35f-70eb94bb5c7a
//36//https://shopee.vn/-T%E1%BA%B6NG-%C4%90%C3%88N-LED-%C4%90%E1%BB%93-ch%C6%A1i-gi%C3%A1o-d%E1%BB%A5c-b%C3%A9-g%C3%A1i-lego-l%C3%A2u-%C4%91%C3%A0i-h%E1%BB%93ng-c%C3%B4ng-ch%C3%BAa-1000-chi-ti%E1%BA%BFt-i.395280427.24124039334?sp_atk=7efd47fc-86b9-49f4-93b8-83514d7fdf65&xptdk=7efd47fc-86b9-49f4-93b8-83514d7fdf65
