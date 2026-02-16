import React, { useEffect } from "react";
import logo from '../img/logo.png';
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import shop from '../img/shop.jpg';

export default function Home() {
  
  const getProduct = useUserStore(state=>state.getProduct)
  const products = useUserStore(state=>state.products)
  const addToCart = useUserStore(state=>state.addToCart)
  console.log('products', products)
  const navigate= useNavigate()


  const handleClick=(item)=>{
     addToCart(item)
    navigate('/shop')
  }

useEffect(()=>{
  getProduct()
},[])

  return (
    <div className="min-h-screen bg-[#f1e3c7] text-white">
      {/* Hero */}
      <section 
       style={{ backgroundImage: `url(${logo})` }}
      className="w-full h-[70vh]  bg-cover bg-center flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/60 p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">Warm • Cozy</h1>
          <p className="text-lg text-stone-700 mb-6">Steamed buns made fresh daily with love and tradition.</p>
          <button onClick={()=>navigate('/shop')} className="px-6 py-3 bg-[#C55939] text-white rounded-xl hover:bg-stone-700 transition">Order Now</button>
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-6xl mx-auto py-16 px-5">
        <h2 className="text-3xl font-semibold text-stone-900 mb-10 text-center">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={item.images?.[0]?.url } className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
                <p className="text-stone-600 mt-1">{item.price}</p>
                <button onClick={()=>handleClick(item)} className="mt-4 w-full py-2 bg-[#C55939] text-white rounded-lg hover:bg-stone-700 transition">Shop now</button>
              </div>
            </div>
          ))}
        </div>
      </section>


          {/* Our History Section */}
<section className="bg-stone-100 py-20 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* Left Image */}
    <div className="flex justify-center"
    >
      <img 
      src={shop}
        
        className="rounded-3xl shadow-xl w-full h-full flex items-center justify-center "
      />
    </div>

    {/* Right Content */}
    <div className="text-center md:text-left">
      <h2 className="text-3xl font-semibold text-stone-900 mb-6">
        Our History
      </h2>
      {/* <p className="text-stone-700 text-lg leading-relaxed mb-5">
        Cozy Bun began in a small family kitchen where traditional steaming
        techniques and secret recipes were passed through generations.
      </p> */}
      <p className="text-stone-700 text-lg leading-relaxed">
        จุดเริ่มต้นของเรามาจากความทรงจำที่แสนอบอุ่น... ความสุขง่ายๆ ที่ได้เห็นไอร้อนกรุ่นลอยขึ้นจากซาลาเปาลูกขาวในตอนเช้า

จากก้นครัวเล็กๆ ที่เราตั้งใจนวดแป้งและปรุงไส้ เพื่อให้ได้รสชาติที่ "เหมือนคนในครอบครัวทำให้ทาน" ความหลงใหลนั้นได้เติบโตขึ้นมาเป็นร้านซาลาเปาแห่งนี้

หัวใจของเราคือความสดใหม่ เรานวดแป้งเองทุกวัน คัดสรรวัตถุดิบอย่างดีที่สุด ไส้หมูสับที่ชุ่มฉ่ำ ไส้ครีมคัสตาร์ดที่หอมหวานละมุน ทุกลูกปั้นด้วยมือ ปั้นด้วยความรัก

เราไม่ได้เพียงแค่ขายซาลาเปา แต่เราอยากส่งต่อความอร่อย ความอิ่มท้อง และความรู้สึกดีๆ หวังว่าซาลาเปาของเราจะเป็นพลังงานที่ยอดเยี่ยม เพื่อเริ่มต้นวันดีๆ ของคุณ
      </p>
    </div>

  </div>
</section>

      {/* About Section */}
      <section className="bg-white py-20 px-5 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-stone-900 mb-6">Cozy Buns, Made with Care</h2>
          <p className="text-stone-700 leading-relaxed text-lg">
            Every bun is crafted from a traditional recipe, steamed fresh daily, and filled with rich, creamy flavors.
            Enjoy a warm and comforting moment in every bite.
          </p>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="py-10 text-center text-stone-600 text-sm border-t border-stone-200">
        © 2025 Cozy Bun Co. All rights reserved.
      </footer>
    </div>
  );
}