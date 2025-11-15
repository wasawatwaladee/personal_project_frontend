import { ShoppingCart } from 'lucide-react';

const ProductCard = ({item}) => {
  return (
    <div className='border rounded-md shadow-md p-2 w-48'>
        <div>


            {
                item.images &&item.images.length>0
                ?<img className='rounded-md w-full h-36 object-fill hover:scale-110 hover:duration-200' src={item.images[0].url}/>
                :
            <div className='w-full h-24 bg-gray-200 rounded-md 
            text-center flex items-center justify-center
            shadow'>
                No image
            </div>
            }
            
        </div>
        
        <div className='py-2'>
            <p className='text-xl'>{item.title}</p>
            <p className='text-sm text-gray-500'>{item.description}</p>
        </div>
        
        <div className="flex justify-between"> 
            <span className='text-sm font-bold'>{item.price}</span>
            <button className='bg-blue-500 rounded-md p-2 hover:bg-blue-700'><ShoppingCart /></button>
        </div>
    </div>
  )
}

export default ProductCard