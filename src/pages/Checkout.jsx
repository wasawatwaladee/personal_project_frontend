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
    if (!addressSaved) return toast.warning("กรุณาบันทึกที่อยู่ก่อน");
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
                         focus:outline-none focus:ring-2 focus:ring-[#e19c5d] text-black"
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
