import { Link } from "react-router";


const CreateEvents = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="border-2 border-black  max-w-lg   p-3 shadow-2xl mt-20 bg-blue-50">
           <h1 className="uppercase font-bold text-3xl text-center">Volunteer Event create Form</h1>
           <form  >
            <div className="flex flex-row justify-center items-center gap-6 mt-4">
            <div className="flex flex-col">
               <label className="text-xl font-semibold">Title</label>
                
                <input className="outline p-2" type="text" placeholder="title"  />
                
                <label className="text-xl font-semibold">Description</label>
                
                <input  className="outline p-2" type="text-area" placeholder="description"  />
                
                <label className="text-xl font-semibold">Date</label>
                
                <input  className="outline p-2" type="date" placeholder="date"  />
               </div>
                <div className="flex flex-col">
                <label className="text-xl font-semibold">Time</label>
                
                <input  className="outline p-2" type="time" placeholder="time"  />
                <label className="text-xl font-semibold">Location</label>
                
                <input  className="outline p-2" type="text" placeholder="location"  />
                <label className="text-xl font-semibold">Category</label>
                
                <input  className="outline p-2" type="text" placeholder="category"  />
                </div>

            </div>
              
                <br />
                <div className="flex justify-center items-center">

                <button className="disabled:opacity-70 bg-blue-600 p-2 text-white btn mt-3 " >Create</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default CreateEvents;