import { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer"
import { removeFiles, uploadFiles } from "../../api/product";
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
            // console.log(files[i]) //log ที่ละไฟล์

            //validate
            const file = files[i]
            if(!file.type.startsWith('image/')){
                toast.error(`File ${file.name} type is not supported`)
                continue //ถ้าเลือก 3 รูป ถ้ารูปแรกไม่ผ่านจะเช็คที่รูป 2 ต่อ
            }

            //Image Resize
            Resize.imageFileResizer(
              files[i],
              2025,
              2025,
              "JPEG",
              100,
              0,
              (data)=>{
                //endpoint Backend
                // uploadFiles(token,data)
                uploadFiles(token,{images:data})
                .then(res=>{
                  // console.log(res)
                  allFlies.push(res.data.result)
                  setForm({
                    ...form,
                    images:allFlies

                  })
                  toast.success("Upload image success")
                })
                .catch(err=>{
                  console.log(err)
                })
              },
              "base64"
            )
        }
        
        
    }
    // console.log(e.target.files)
    
  }
  const handleDelete = async(public_id)=>{
    // console.log(public_id)
    const images  = form.images
    removeFiles(token,public_id)
    .then((res)=>{
      const filterImages = images.filter((item,index)=>{
        return item.public_id !== public_id
      })
      setForm({
        ...form,
        images:filterImages
      })
      // console.log(res)
      toast.error("Delete image success")
    })  //ถ้าทำสำเร็จ
    .catch(err=>{
      console.log(err)
    }) 
  }
  // console.log(form)
  
    return (
    <div>

      <div className="flex mx-4 gap-4 my-4">
      {/* Image */}
      {
        form.images?.map((item,index)=>(
          <div key={index} className="relative" >
            <img className="w-24 h-24 hover:scale-105" src={item.url} alt="photo img" />
            <span 
            onClick={()=>handleDelete(item.public_id)}
            className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-md">X</span>
          </div>
        ))
      }
      </div>

      <div>
        <input 
        onChange={handleOnChange}
        type="file" 
        name='images'
        multiple //เลือกรูปภาพได้หลายรูป
        />
      </div>
    
    </div>
  )
}

export default Uploadfile