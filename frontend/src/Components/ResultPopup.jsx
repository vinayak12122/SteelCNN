import React from 'react';
import { GiTireIronCross } from 'react-icons/gi';
import { BiLoaderAlt } from 'react-icons/bi';

const ResultPopup = ({ result, image, loading, onClose }) => {
    // Show nothing if neither loading nor result exists
    if (!loading && !result) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-mauve-900 border-2 border-white/20 rounded-2xl shadow-2xl p- scrollbar-hide">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 p-4 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-black text-white">
                            Prediction
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Steel defect classification
                        </p>
                    </div>
                    {!loading && (
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                        >
                            <GiTireIronCross size={22} />
                        </button>
                    )}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <BiLoaderAlt className="text-yellow-400 text-6xl animate-spin" />
                        <h3 className="text-xl font-bold text-white">
                            Analyzing Image...
                        </h3>
                        <p className="text-sm text-gray-400 max-w-md px-4">
                            Please wait while the model processes your image. Since backend is running on Render free tier, starting up can take a few seconds.
                        </p>
                    </div>
                ) : (
                    /* Existing Result View */
                    <>
                        <div className="grid md:grid-cols-2 px-6 gap-6 items-center">
                            {/* Image */}
                            <div className="aspect-square bg-stone-950 rounded-xl overflow-hidden border-2 border-white/10">
                                <img
                                    src={image}
                                    alt="Selected steel defect"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Prediction Details */}
                            <div className="space-y-5">
                                <div>
                                    <p className="text-sm text-gray-400">Predicted Class</p>
                                    <h3 className={`text-4xl font-black capitalize mt-1 class-text-${result.prediction.class}`}>
                                        {result.prediction.class.replaceAll("_", " ")}
                                    </h3>
                                </div>

                                {/* Confidence Bar */}
                                <div className="py-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">Confidence</span>
                                        <span className="font-black text-white">{result.prediction.confidence}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-stone-950/80 rounded-full overflow-hidden border border-white/10">
                                        <div
                                            className={`relative h-full rounded-full overflow-hidden transition-[width] duration-700 ease-out class-${result.prediction.class}`}
                                            style={{ width: `${result.prediction.confidence}%` }}
                                        >
                                            <div className="absolute inset-0 opacity-60 animate-progress-dots mt-0.5" />
                                            <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent animate-progress-shine" />
                                        </div>
                                    </div>
                                </div>

                                {/* Model Metadata */}
                                <div className="">
                                    {/* <div className="bg-stone-800/30 rounded-xl p-3 border border-white/10">
                                        <p className="text-xs text-gray-500">Input size</p>
                                        <p className="text-white font-bold">{result.image.input_size}</p>
                                    </div> */}
                                    <div className="p-">
                                            <p className="text-sm text-gray-400 pb-2">Inference Time</p>
                                            <p className={`text-white font-bold class-text-${result.prediction.class}`}>{result.inference.time_ms} ms</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Probabilities */}
                        <div className="mt-8 px-6 pb-6">
                            <h3 className="text-lg font-black text-white mb-4">Class Probabilities</h3>
                            <div className="space-y-3">
                                {Object.entries(result.probabilities).map(([className, probability]) => (
                                    <div key={className}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-300 capitalize">{className.replaceAll("_", " ")}</span>
                                            <span className="text-white font-bold">{probability}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                                            <div
                                                className={`relative h-full rounded-full overflow-hidden transition-[width] duration-700 ease-out class-${className}`}
                                                style={{ width: `${probability}%` }}
                                            >
                                                <div className="absolute inset-0 opacity-60 animate-progress-dots mt-px" />
                                                <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent animate-progress-shine" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Metadata Footer
                        <div className="mt-4 pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Model</p>
                                <p className="text-sm text-white font-bold">{result.model.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Classes</p>
                                <p className="text-sm text-white font-bold">{result.model.classes}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Device</p>
                                <p className="text-sm text-white font-bold">{result.model.device}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Channels</p>
                                <p className="text-sm text-white font-bold">{result.image.channels}</p>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultPopup;