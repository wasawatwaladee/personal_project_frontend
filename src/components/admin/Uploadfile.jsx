import { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer"
import { uploadFiles } from "../../api/product";
import useUserStore from "../../stores/userStore";


const Uploadfile = ({form,setForm}) => {
const [isLoading, setIsLoading] = useState(false);
const token = useUserStore(state=>state.token)
  const handleOnChange = async(e)=>{
    const files = e.target.files
    if(files){
        setIsLoading(true)
        let allFlies = form.images //[]
        for(let i =0;i<files.length;i++){
            console.log(files[i]) //log ที่ละไฟล์

            //validate
            const file = files[i]
            if(!file.type.startsWith('image/')){
                toast.error(`File ${file.name} type is not supported`)
                continue //ถ้าเลือก 3 รูป ถ้ารูปแรกไม่ผ่านจะเช็คที่รูป 2 ต่อ
            }

            //Image Resize
            Resize.imageFileResizer(
              files[i],
              720,
              720,
              "JPEG",
              100,
              0,
              (data)=>{
                //endpoint Backend
                uploadFiles(token,data)
              },
              "base64"
            )
        }
        
        
    }
    // console.log(e.target.files)
    
  }
  
    return (
    <div>
        <input 
        onChange={handleOnChange}
        type="file" 
        name='images'
        multiple //เลือกรูปภาพได้หลายรูป
        
        />
    </div>
  )
}

export default Uploadfile