import Image from "next/image";
import background from '@public/wallpaperflare.com_wallpaper.jpg';
import Logo from '@public/favicon-removebg-preview.png';
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div className="h-full font-barlow-condensed">
      <header>
        <div className="relative h-full bg-cover bg-center">
          {/* Background Image */}
          <Image
            src={background}
            alt="Background Image"
            className="absolute inset-0 z-[-1] h-full w-full object-cover blur-sm brightness-50"
          />

          {/* Main Container */}
          <div className="relative mx-auto w-full max-w-7xl px-3 py-2 md:px-5 md:py-3 lg:py-6">
            
            {/* Logo */}
            <motion.div 
              className="box flex justify-center mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeInOut"
              }}
            >
              <Image
                src={Logo}
                alt="Logo"
                className="h-72 w-auto mx-auto"  // Adjusted logo size
              />
            </motion.div>

            {/* ValorAgent Title and Slogan */}
            <motion.div
              className="text-center mt-4 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* ValorAgent Title */}
              <h1 className="text-white font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase">
                VALORAGENT
              </h1>

              {/* Slogan */}
              <p className="text-red-500 text-lg md:text-xl mt-2 tracking-widest uppercase font-light">
                THE EDGE YOU NEED TO WIN.
              </p>
            </motion.div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-center gap-4 mx-auto w-full max-w-3xl py-2 md:py-4 lg:py-2">
              
              {/* Title Section */}
              <div className="text-center">
                <motion.h1 
                  className="text-2xl font-bold text-white md:text-3xl leading-tight uppercase"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: "easeInOut"
                  }}
                  >
                  Track Your Valorant Performance
                </motion.h1>
                <motion.p 
                  className="mt-2 text-gray-300 text-sm sm:text-base max-w-xl mx-auto"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: "easeInOut"
                  }}
                  >
                  Get real-time stats, analyze your past matches, and improve your gameplay with data-driven insights. ValorAgent helps you become the best player you can be.
                </motion.p>
              </div>


              {/* Call to Action Button */}
              <div className="flex justify-center mt-3">
                <motion.a
                  href="/Dashboard"
                  className="inline-block bg-red-600 px-6 py-3 text-center text-lg font-extrabold text-white shadow-lg hover:bg-red-700 transition duration-300 rounded-lg"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.1,
                    delay: 1.2,
                    ease: "easeInOut"
                  }}
                >
                  Go to Dashboard
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
