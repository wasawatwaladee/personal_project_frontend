import { ShoppingCart } from 'lucide-react';
import useUserStore from '../../stores/userStore';

const ProductCard = ({item}) => {
    const addToCart = useUserStore(state=>state.addToCart)
  return (
    <div className='bg-white rounded-2xl shadow-md border border-[#edb394] p-4 w-56 
                    hover:shadow-xl transition-all duration-300"'>
        <div className='overflow-hidden rounded-xl'>
            {
                item.images &&item.images.length>0
                ?<img className='w-full h-40 object-cover 
                       hover:scale-110 transition duration-300' src={item.images[0].url}/>
                :
            <div className='w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-stone-500"'>
                No image
            </div>
            }
            
        </div>
        
        <div className='py-2'>
            <p className='text-lg font-semibold text-stone-800'>{item.title}</p>
            <p className='text-sm text-stone-500 line-clamp-2 min-h-[40px]'>{item?.description}</p>
        </div>
        
        <div className="flex justify-between items-center"> 
            <span className='text-lg font-bold text-[#C55939]'>{item.price}</span>
            <button className='tbg-[#C55939] bg-[#e19c5d] rounded-xl p-2 
                     hover:bg-[#C55939] transition-all duration-200 shadow-sm'
            onClick={()=>addToCart(item)}
            ><ShoppingCart  />
            </button>
        </div>
    </div>
  )
}

export default ProductCard