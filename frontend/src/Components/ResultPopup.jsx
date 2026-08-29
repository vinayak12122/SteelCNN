import React from 'react'
import { GiTireIronCross } from 'react-icons/gi';

const ResultPopup = ({ result, image, onClose }) => {

    if (!result) return null;

    const probabilities = result.probabilities;

    return (
        <div className="fixed  inset-0  z-50  flex  items-center  justify-center  bg-black/70  backdrop-blur-sm  px-4">
            <div className=" relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-mauve-900 border-2 border-white/20 rounded-2xl shadow-2xl p-6 scrollbar-hide">
                <div className=" flex items-center justify-between mb-6 pb-4 border-b border-white/10 ">

                    <div>
                        <h2 className="text-2xl font-black text-white">
                            CNN Prediction
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Steel defect classification result
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className='p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition'
                    >
                        <GiTireIronCross size={22} />
                    </button>
                </div>
                <div className="
          grid
          md:grid-cols-2
          gap-6
          items-center 
        ">

                    {/* Image */}
                    <div className="
            aspect-square
            bg-stone-950
            rounded-xl
            overflow-hidden
            border-2
            border-white/10
          ">
                        <img
                            src={image}
                            alt="Selected steel defect"
                            className="w-full h-full object-contain"
                        />
                    </div>


                    {/* Prediction */}
                    <div className="space-y-5">

                        <div>
                            <p className="text-sm text-gray-400">
                                Predicted Class
                            </p>

                            <h3 className={` text-4xl font-black  capitalize mt-1 class-text-${result.prediction.class}`}>
                                {result.prediction.class.replaceAll("_", " ")}
                            </h3>
                        </div>


                        {/* Confidence */}
                        <div className="py-2">

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-white font-semibold">
                                    Confidence
                                </span>

                                <span className="font-black text-white">
                                    {result.prediction.confidence}%
                                </span>
                            </div>

                            <div className="
        w-full
        h-3
        bg-stone-950/80
        rounded-full
        overflow-hidden
        border
        border-white/10
    ">

                                <div
                                    className={`
                relative
                h-full
                rounded-full
                overflow-hidden
                transition-[width]
                duration-700
                ease-out
                class-${result.prediction.class}
            `}
                                    style={{
                                        width: `${result.prediction.confidence}%`
                                    }}
                                >

                                    {/* Moving dots */}
                                    <div className="
                absolute
                inset-0
                opacity-60
                animate-progress-dots
                mt-0.5
            " />

                                    {/* Moving shine */}
                                    <div className="
                absolute
                inset-y-0
                left-0
                w-1/3
                bg-linear-to-r
                from-transparent
                via-white/25
                to-transparent
                animate-progress-shine
            " />

                                </div>

                            </div>

                        </div>


                        {/* Model information */}
                        <div className="
              grid
              grid-cols-2
              gap-3
            ">

                            <div className=" bg-stone-800/30
              rounded-xl
              p-3
              border
              border-white/10">
                                <p className="text-xs text-gray-500">
                                    Input size
                                </p>

                                <p className="text-white font-bold">
                                    {result.image.input_size}
                                </p>
                            </div>

                            <div className=" bg-stone-800/30
              rounded-xl
              p-3
              border
              border-white/10">
                                <p className="text-xs text-gray-500">
                                    Inference time
                                </p>

                                <p className="text-white font-bold">
                                    {result.inference.time_ms} ms
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Probabilities */}
                <div className="mt-8">

                    <h3 className="
            text-lg
            font-black
            text-white
            mb-4
          ">
                        Class Probabilities
                    </h3>

                    <div className="space-y-3">

                        {Object.entries(probabilities).map(
                            ([className, probability]) => (

                                <div key={className}>

                                    <div className="
                    flex
                    justify-between
                    text-sm
                    mb-1
                    
                  ">

                                        <span className="text-gray-300 capitalize">
                                            {className.replaceAll("_", " ")}
                                        </span>

                                        <span className="text-white font-bold">
                                            {probability}%
                                        </span>

                                    </div>

                                    <div className=" w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                                        <div className={` relative h-full rounded-full overflow-hidden transition-[width] duration-700 ease-out class-${className}`}
                                            style={{
                                                width: `${probability}%`
                                            }}
                                        >
                                            <div className=" absolute inset-0 opacity-60 animate-progress-dots mt-px " />

                                            <div className=" absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent animate-progress-shine " />
                                        </div>
                                    </div>

                                </div>

                            )
                        )}
                    </div>
                </div>

                <div className=" mt-4 pt-5 grid grid-cols-2 md:grid-cols-4 gap-4
        ">

                    <div>
                        <p className="text-xs text-gray-500">
                            Model
                        </p>

                        <p className="text-sm text-white font-bold">
                            {result.model.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Classes
                        </p>

                        <p className="text-sm text-white font-bold">
                            {result.model.classes}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Device
                        </p>

                        <p className="text-sm text-white font-bold">
                            {result.model.device}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Channels
                        </p>

                        <p className="text-sm text-white font-bold">
                            {result.image.channels}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultPopup