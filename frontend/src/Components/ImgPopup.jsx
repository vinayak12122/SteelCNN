import React from 'react'
import { GiTireIronCross } from "react-icons/gi";

const classes = [
  {
    name: "Crazing",
    images: [
      "/images/crazing/crazing_1.jpg",
      "/images/crazing/crazing_2.jpg",
      "/images/crazing/crazing_3.jpg",
      "/images/crazing/crazing_4.jpg",
      "/images/crazing/crazing_5.jpg",
      "/images/crazing/crazing_6.jpg",
    ],
  },
  {
    name: "Inclusion",
    images: [
      "/images/inclusion/inclusion_1.jpg",
      "/images/inclusion/inclusion_2.jpg",
      "/images/inclusion/inclusion_3.jpg",
      "/images/inclusion/inclusion_4.jpg",
      "/images/inclusion/inclusion_5.jpg",
      "/images/inclusion/inclusion_6.jpg",
    ],
  },
  {
    name: "Patches",
    images: [
      "/images/patches/patches_1.jpg",
      "/images/patches/patches_2.jpg",
      "/images/patches/patches_3.jpg",
      "/images/patches/patches_4.jpg",
      "/images/patches/patches_5.jpg",
      "/images/patches/patches_6.jpg",
    ],
  },
  {
    name: "Pitted Surface",
    images: [
      "/images/pitted_surface/pitted_surface_1.jpg",
      "/images/pitted_surface/pitted_surface_2.jpg",
      "/images/pitted_surface/pitted_surface_3.jpg",
      "/images/pitted_surface/pitted_surface_4.jpg",
      "/images/pitted_surface/pitted_surface_5.jpg",
      "/images/pitted_surface/pitted_surface_6.jpg",
    ],
  },
  {
    name: "Rolled-in Scale",
    images: [
      "/images/rolled_in_scale/rolled-in_scale_1.jpg",
      "/images/rolled_in_scale/rolled-in_scale_2.jpg",
      "/images/rolled_in_scale/rolled-in_scale_3.jpg",
      "/images/rolled_in_scale/rolled-in_scale_4.jpg",
      "/images/rolled_in_scale/rolled-in_scale_5.jpg",
      "/images/rolled_in_scale/rolled-in_scale_6.jpg",
    ],
  },
  {
    name: "Scratches",
    images: [
      "/images/scratches/scratches_1.jpg",
      "/images/scratches/scratches_2.jpg",
      "/images/scratches/scratches_3.jpg",
      "/images/scratches/scratches_4.jpg",
      "/images/scratches/scratches_5.jpg",
      "/images/scratches/scratches_6.jpg",
    ],
  },
];

const ImgPopup = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-mauve-900 border-2 border-white/20 rounded-2xl shadow-2xl flex flex-col">

        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white">
              Test the CNN
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Select an image from one of the six defect classes
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <GiTireIronCross size={22} />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-hide p-6 space-y-10">

          {classes.map((item) => (
            <section
            key={item.name}
            >
              <h3 className='text-xl font-black text-white mb-4 capitalize tracking-wider '>
                {item.name}
              </h3>

              <div
              className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3'
              >
                {item.images.map((image,index) =>(
                  <button
                  key={image}
                  onClick={()=>onSelect(image)}
                    className='group aspect-square bg-stone-800 border-2 border-white/10 rounded-lg overflow-hidden hover:border-cyan-400 hover:-translate-y-1 transition-all duration-200'
                  >
                    <img src={image} alt={`${item.name} ${index + 1}`} 
                    className='
                    w-full h-full object-cover group-hover:scale-110 transition-transform duration-300
                    '/>
                  </button>
                ))}
              </div>
            </section>
          ))}

        </div>
      </div>
    </div>
  )
}

export default ImgPopup