import React, { useRef, useState } from 'react';
import { ImPlus } from "react-icons/im";
import { BiLoaderAlt } from "react-icons/bi";
import ImgPopup from './Components/ImgPopup'
import ResultPopup from './Components/ResultPopup'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [prediction,setPrediction] = useState(false);

  const fileInputRef = useRef(null);
  const handleDeviceImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setLoader(true);
    setSelectedImage(imgUrl);
    predictImage(file);
  }

  const handlePreloadedImage = async(image) => {
    try {
      setLoader(true)
      setSelectedImage(image);
      setShowPopup(false);

      const response = await fetch(image);
      const blob = await response.blob();

      const file = new File(
        [blob],image.split("/").pop(),
        {
          type:blob.type,
        }
      );

      await predictImage(file)
    } catch (error) {
      alert("Error : ",error);
      setLoader(false);
    }
  }

  const handleImageLoad = () => {
    setLoader(false);
  }

  const predictImage = async(image)=>{
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("file",image);

      const res = await fetch(`${BACKEND_URL}/predict`,{
        method:"POST",
        body:formData
      })

      if(!res.ok){
        throw new Error("Prediction failed");
      }

      const result = await res.json();
      setPrediction(result);
    } catch (error) {
      alert("Error : ",error);
    }finally{
      setLoader(false);
    }
  };
  return (
    <div className="relative min-h-screen w-screen bg-mauve-900 overflow-hidden">
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleDeviceImage}
      />
      <style>{`
        @keyframes animated-dots {
          0% { background-position: 0 0, 4px 4px; }
          100% { background-position: 8px 0, 12px 4px; }
        }

        .animate-dots {
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.8) 20%, transparent 20%),
            radial-gradient(rgba(255, 255, 255, 1) 20%, transparent 20%);
          background-position: 0 0, 4px 4px;
          background-size: 8px 8px;
          animation: animated-dots 0.5s infinite linear;
        }

        .retro-shadow {
          box-shadow:
            0.5px 0.5px 0 0 #292524,
            1px 1px 0 0 #292524,
            1.5px 1.5px 0 0 #292524,
            2px 2px 0 0 #292524,
            2.5px 2.5px 0 0 #292524,
            3px 3px 0 0 #292524,
            0 0 0 2px #fafaf9,
            0.5px 0.5px 0 2px #fafaf9,
            1px 1px 0 2px #fafaf9,
            1.5px 1.5px 0 2px #fafaf9,
            2px 2px 0 2px #fafaf9,
            2.5px 2.5px 0 2px #fafaf9,
            3px 3px 0 2px #fafaf9,
            3.5px 3.5px 0 2px #fafaf9,
            4px 4px 0 2px #fafaf9;
        }

        .retro-shadow:hover {
          box-shadow: 0 0 0 2px #fafaf9;
        }
      `}</style>

      <div className="absolute -mb-8 md:-mb-40 inset-0 flex lg:items-center items-end justify-center pointer-events-none select-none overflow-hidden">
        <h1
          className="
            font-black
            leading-none
            sm:tracking-widest
            tracking-tighter
            text-white/5
            text-[45vw]
            sm:text-[45vw]
            md:text-[35vw]
            lg:text-[30rem]
          "
        >
          CNN
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center gap-2 mb-8">

        {/* Upload Icon */}
        <div className="relative flex items-center justify-center md:w-80 md:h-60 gap-2 m-20 py-0 w-[80%] h-60 border-4 border-gray-300 rounded-xl bg-stone-800/50 shadow-lg overflow-hidden">
          {
            loader && (
              <BiLoaderAlt className='absolute z-20 text-yellow-400 text-6xl animate-spin' />
            )
          }

          {
            selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected steel defect"
                onLoad={handleImageLoad}
                className={`w-full  h-full  object-cover  transition-opacity  duration-300  ${loader ? "opacity-0" : "opacity-100"}`}
              />
            ) : (
              <ImPlus
                className=" text-yellow-400 md:text-9xl text-8xl md:p-6 p-3"
              />
            )
          }
          {/* <p className="text-white font-bold">
            {selectedImage ? " " : "Upload a picture"}
          </p> */}
        </div>

        <div className="flex flex-col gap-6 w-full justify-center items-center px-5 sm:px-0">

          <button

            onClick={() => fileInputRef.current.click()}
            className="
              relative p-0.5
              cursor-pointer
              font-bold
              text-stone-800
              leading-none
              text-center
              bg-stone-800
              rounded-full
              -translate-x-1 -translate-y-1
              outline-2 outline-transparent
              outline-offset-5
              transition-all duration-150
              ease-in-out
              hover:translate-x-0
              hover:translate-y-0
              active:outline-yellow-400
              focus-visible:outline-yellow-400
              focus-visible:outline-dashed
              retro-shadow
            "
          >
            <div className="relative pointer-events-none bg-yellow-400 border-2 border-white/30 rounded-full overflow-hidden">

              <div className="absolute inset-0 rounded-full opacity-50 mix-blend-hard-light animate-dots" />

              <span className="relative flex items-center justify-center py-3 px-6 gap-1 drop-shadow-[0_-1px_0_rgba(255,255,255,0.25)]">
                Choose from device
              </span>

            </div>
          </button>

          <p className="font-bold text-white tracking-widest text-sm">
            OR
          </p>

          <button
            onClick={() => setShowPopup(true)}
            className="
              relative p-0.5
              cursor-pointer
              font-bold
              text-stone-800
              leading-none
              text-center
              bg-stone-800
              rounded-full
              -translate-x-1 -translate-y-1
              outline-2 outline-transparent
              outline-offset-5
              transition-all duration-150
              ease-in-out
              hover:translate-x-0
              hover:translate-y-0
              active:outline-cyan-400
              focus-visible:outline-cyan-400
              focus-visible:outline-dashed
              retro-shadow
            "
          >
            <div className="relative pointer-events-none bg-cyan-400 border-2 border-white/30 rounded-full overflow-hidden">

              <div className="absolute inset-0 rounded-full opacity-50 mix-blend-hard-light animate-dots" />

              <span className="relative flex items-center justify-center py-3 px-6 gap-1 drop-shadow-[0_-1px_0_rgba(255,255,255,0.25)]">
                Choose pre-loaded image
              </span>

            </div>
          </button>

        </div>
      </div>
      {showPopup && (
        <ImgPopup
          onClose={() => setShowPopup(false)}
          onSelect={handlePreloadedImage}
        />
      )}
      {(loader || prediction) && (
        <ResultPopup
          result={prediction}
          image={selectedImage}
          loading={loader}
          onClose={() => setPrediction(null)}
        />
      )}
    </div>
  );
};

export default App;