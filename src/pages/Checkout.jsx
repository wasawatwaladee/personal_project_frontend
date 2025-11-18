// // rafce
// import React, { useState, useEffect } from "react";

// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import { listUserCart, saveAddress } from "../api/user";
// import useUserStore from "../stores/userStore";
 


// const Checkout = () => {
//   // const [products, setProducts] = useState([]);
//   const user = useUserStore(state=>state.user)
//   const products = useUserStore(state=>state.products)
//   const carts = useUserStore(state=>state.carts)
//   const getTotalPrice = useUserStore(state=>state.getTotalPrice)
//   // const [cartTotal, setCartTotal] = useState(0);

//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     hdlGetUserCart();
//   }, []);

//   const hdlGetUserCart = async() => {
//     try{
      
//         await listUserCart()

//         // setProducts(res.data.products);
//         // setCartTotal(res.data.cartTotal);
//       } 
//       catch(err) {
//         console.log(err);
//       };

      
//   };

//   const hdlSaveAddress = () => {
//     if (!address) {
//       return toast.warning("Please fill address");
//     }
//     if(!user){
//        return toast.warning("Please Login")
//       }
//     saveAddress(address)
//       .then((res) => {
//         console.log(res);
//         toast.success(res.data.message);
//         setAddressSaved(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const hdlGoToPayment = () => {
//     if (!addressSaved) {
//       return toast.warning("Please save address");
//     }
//     navigate("/user/payment");
//   };

//   console.log('products',products);
//   console.log('carts',carts);

//   return (
//     <div className="mx-auto">
//       <div className="flex flex-wrap gap-4">
//         {/* Left */}
//         <div className="w-2/4">
//           <div
//             className="bg-gray-100 p-4 rounded-md 
//           border shadow-md space-y-4"
//           >
//             <h1 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h1>
//             <textarea
//               required
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="กรุณากรอกที่อยู่"
//               className="w-full px-2 rounded-md"
//             />
//             <button
//               onClick={hdlSaveAddress}
//               className="bg-blue-500 text-white
//             px-4 py-2 rounded-md shadow-md hover:bg-blue-700
//             hover:scale-105 hover:translate-y-1 hover:duration-200"
//             >
//               Save Address
//             </button>
//           </div>
//         </div>

//         {/* Right */}
//         <div className="w-2/4">
//           <div
//             className="bg-gray-100 p-4 rounded-md 
//           border shadow-md space-y-4"
//           >
//             <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

//             {/* Item List */}

//             {carts?.map((item, index) => (
//               <div key={index}>
//                 <div className="flex justify-between items-end">
//                   <div>
//                     <p className="font-bold">{item.title}</p>
//                     <p className="text-sm">
//                       จำนวน : {item.count} x {(item.price) }
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-red-500 font-bold">
//                       {(item.count * item.price)     }
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div>
//               <div className="flex justify-between">
//                 <p>ค่าจัดส่ง:</p>
//                 <p>0.00</p>
//               </div>
//               <div className="flex justify-between">
//                 <p>ส่วนลด:</p>
//                 <p>0.00</p>
//               </div>
//             </div>

//             <hr />
//             <div>
//               <div className="flex justify-between">
//                 <p className="font-bold">ยอดรวมสุทธิ:</p>
//                 <p className="text-red-500 font-bold text-lg">{getTotalPrice()}</p>
//               </div>
//             </div>

//             <hr />
//             <div>
//               <button
//                 onClick={hdlGoToPayment}
//                 // disabled={!addressSaved}
//                 className="bg-green-400 w-full p-2 rounded-md
//               shadow-md text-white hover:bg-green-600"
//               >
//                 ดำเนินการชำระเงิน
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// // import React, { useState } from 'react';

// // function Checkout() {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     address: '',
// //     city: '',
// //     province: '',
// //     zipCode: '',
// //     cardName: '',
// //     cardNumber: '',
// //     expDate: '',
// //     cvv: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Checkout Data Submitted:', formData);
// //     alert('ขอบคุณสำหรับคำสั่งซื้อ!');
// //   };

  
// //   return (
// //     <div className="min-h-screen bg-orange-50 p-4 sm:p-8"> {/* เปลี่ยนพื้นหลัง */}
// //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
// //         <h1 className="text-3xl font-bold text-stone-800 mb-6 border-b border-stone-200 pb-4"> {/* เปลี่ยนสี Text และ Border */}
// //           Checkout
// //         </h1>

// //         <form onSubmit={handleSubmit}>
// //           {/* === ส่วนที่อยู่จัดส่ง === */}
// //           <section className="mb-8">
// //             <h2 className="text-2xl font-semibold text-stone-700 mb-4"> {/* เปลี่ยนสี Text */}
// //               ที่อยู่สำหรับจัดส่ง
// //             </h2>
// //             <div className="grid grid-cols-1 gap-6">
// //               <div>
// //                 <label htmlFor="fullName" className="block text-sm font-medium text-stone-600"> {/* เปลี่ยนสี Text */}
// //                   ชื่อ-นามสกุล
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="fullName"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" // เปลี่ยนสี Border และ Focus
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="address" className="block text-sm font-medium text-stone-600">
// //                   ที่อยู่ (บ้านเลขที่, ถนน)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="address"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" // เปลี่ยนสี Border และ Focus
// //                   required
// //                 />
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //                 <div>
// //                   <label htmlFor="city" className="block text-sm font-medium text-stone-600">
// //                     อำเภอ/เขต
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="city"
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={handleChange}
// //                     className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" // เปลี่ยนสี Border และ Focus
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="province" className="block text-sm font-medium text-stone-600">
// //                     จังหวัด
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="province"
// //                     name="province"
// //                     value={formData.province}
// //                     onChange={handleChange}
// //                     className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" // เปลี่ยนสี Border และ Focus
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="zipCode" className="block text-sm font-medium text-stone-600">
// //                     รหัสไปรษณีย์
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="zipCode"
// //                     name="zipCode"
// //                     value={formData.zipCode}
// //                     onChange={handleChange}
// //                     className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" // เปลี่ยนสี Border และ Focus
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </section>

        

// //           {/* === ปุ่ม Submit === */}
// //           <div className="mt-10">
// //             <button
// //               type="submit"
// //               className="w-full bg-orange-600 text-white text-lg font-bold py-3 px-6 rounded-md shadow-md hover:bg-orange-700 transition duration-300" // เปลี่ยนสีปุ่ม
// //             >
// //               ชำระเงิน (Pay Now)
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Checkout


import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { listUserCart, saveAddress } from "../api/user";
import useUserStore from "../stores/userStore";

const Checkout = () => {
  const user = useUserStore((state) => state.user);
  const carts = useUserStore((state) => state.carts);
  const getTotalPrice = useUserStore((state) => state.getTotalPrice);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart();
  }, []);

  const hdlGetUserCart = async () => {
    try {
      await listUserCart();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlSaveAddress = () => {
    if (!address) return toast.warning("กรุณากรอกที่อยู่");
    if (!user) return toast.warning("กรุณาเข้าสู่ระบบ");

    saveAddress(address)
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => console.log(err));
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) return toast.warning("Please save address");
    navigate("/user/payment");
  };

  return (
    <div className="min-h-screen bg-[#f1e3c7] py-10 px-4">
      <div className="max-w-5xl mx-auto flex  gap-6">

        {/* LEFT */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#fffaf5] p-6 rounded-2xl border border-[#edb394] shadow-md space-y-4">
            <h1 className="font-bold text-xl text-[#C55939]">
              ที่อยู่ในการจัดส่ง
            </h1>

            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่..."
              className="w-full px-3 py-2 rounded-xl border border-[#edb394] bg-white 
                         focus:outline-none focus:ring-2 focus:ring-[#e19c5d]"
              rows={4}
            />

            <button
              onClick={hdlSaveAddress}
              className="bg-[#C55939] text-white px-4 py-2 rounded-xl 
                         shadow-md w-full hover:bg-[#e19c5d] 
                         transition-all duration-200"
            >
              บันทึกที่อยู่
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#fffaf5] p-6 rounded-2xl border border-[#edb394] shadow-md space-y-4">
            <h1 className="font-bold text-xl text-[#C55939]">คำสั่งซื้อของคุณ</h1>

            {/* Item List */}
            {carts?.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-end py-2 border-b border-[#f1e3c7]"
              >
                <div>
                  <p className="font-semibold text-stone-800">{item.title}</p>
                  <p className="text-sm text-stone-600">
                    จำนวน : {item.count} x {item.price}
                  </p>
                </div>

                <div>
                  <p className="text-[#C55939] font-bold">
                    {item.count * item.price} ฿
                  </p>
                </div>
              </div>
            ))}

            {/* Shipping + Discount */}
            <div className="text-stone-700">
              <div className="flex justify-between">
                <p>ค่าจัดส่ง:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ส่วนลด:</p>
                <p>0.00</p>
              </div>
            </div>

            <hr />

            {/* Total */}
            <div className="flex justify-between">
              <p className="font-bold text-stone-800">ยอดรวมสุทธิ:</p>
              <p className="text-[#C55939] font-bold text-xl">{getTotalPrice()} ฿</p>
            </div>

            <hr />

            {/* Payment Button */}
            <button
              onClick={hdlGoToPayment}
              className="bg-[#C55939] text-white w-full py-3 rounded-xl shadow-md
                         hover:bg-[#e19c5d] transition-all duration-200"
            >
              ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
