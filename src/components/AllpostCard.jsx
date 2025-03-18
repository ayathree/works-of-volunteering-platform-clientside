import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { TbUrgent } from "react-icons/tb";


const AllPostCard = ({post}) => {
    const{urgency,about,location,category}=post;
    console.log(post)
    return (
        <div className="border-2 mt-10 border-black mx-20  p-5 shadow-2xl bg-blue-50 ">
            <div className="flex justify-end items-end">
                      
                      <p className={`flex items-center gap-1 ${
        urgency === "Urgent" ? "bg-red-500"
          : urgency === "Low"
          ? "bg-yellow-500"
          : urgency === "Medium"
          ? "bg-green-500"
          : "text-black"
      } px-2 font-semibold border-black border-2`}>
          <TbUrgent /> {urgency}
          </p>
  </div>
  
  <p className=" text-xl font-semibold mt-5">{about} </p>
      
          <div className="flex flex-col justify-start items-start gap-3 mt-6">
         <p className="flex items-start gap-1">
          <FaLocationDot /> {location}
         </p>
           <p className="flex items-start gap-1">
           <BiSolidCategory/> {category}
             </p>
               </div>
                                         
               
           <div className="flex flex-col justify-start mt-3">
              <p className="underline font-bold text-2xl">Message Section</p>
              <textarea type="text" className="outline-2 mt-5 h-30 p-2 " placeholder="write here" />
  
        
          <button className="bg-blue-600 p-2 px-5 text-white btn mt-5 w-24 text-xl">Send</button>
         
           </div>
            
        </div>
    );
};

export default AllPostCard;