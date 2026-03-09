// HPI 1.7-V
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { GalleryImages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageDetailModal from '@/components/ImageDetailModal';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImages | null>(null);

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<GalleryImages>('galleryimages');
      const sortedImages = result.items.sort((a, b) => 
        (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
      );
      setImages(sortedImages);
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Bento Grid Pattern Generator
  const getBentoClass = (index: number) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Large feature
      'md:col-span-1 md:row-span-1', // Standard
      'md:col-span-1 md:row-span-1', // Standard
      'md:col-span-2 md:row-span-1', // Wide horizontal
      'md:col-span-1 md:row-span-2', // Tall vertical
      'md:col-span-1 md:row-span-1', // Standard
      'md:col-span-2 md:row-span-2', // Large feature
      'md:col-span-1 md:row-span-1', // Standard
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground selection:bg-accentcyan selection:text-primary overflow-clip">
      <style>{`
        .glare-effect {
          position: relative;
          overflow: hidden;
        }
        .glare-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 20;
          pointer-events: none;
        }
        .glare-effect:hover::before {
          left: 200%;
        }
        .tech-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      <Header />
      
      {/* HERO SECTION - Split Layout inspired by reference */}
      <section ref={heroRef} className="relative w-full h-[100svh] flex flex-col lg:flex-row overflow-hidden bg-primary">
        
        {/* Left Content Panel */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-16 xl:px-24 z-20 relative bg-primary">
          <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl relative z-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accentcyan" />
              <span className="font-heading text-accentcyan tracking-widest uppercase text-sm">System Online</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl xl:text-8xl text-primary-foreground mb-6 leading-[0.9] tracking-tight">
              POWERING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-primary-foreground/40">
                THE FUTURE
              </span>
            </h1>
            
            <p className="font-paragraph text-lg lg:text-xl text-primary-foreground/70 mb-12 max-w-md font-light">
              Designing and manufacturing advanced, high-efficiency visual architectures. A curated collection of structural imagery.
            </p>
            
            <motion.a 
              href="#gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-10 py-4 bg-accentcyan text-primary font-heading text-sm uppercase tracking-wider rounded-full hover:bg-white transition-colors duration-300"
            >
              Explore Data
            </motion.a>
          </motion.div>
        </div>

        {/* Right Image Panel */}
        <div className="w-full lg:w-1/2 h-full relative z-10 hidden lg:block overflow-hidden border-l border-white/10">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }} 
            className="absolute inset-[-10%] w-[120%] h-[120%]"
          >
            <Image
              src="https://static.wixstatic.com/media/75d5d7_2365bcbfb933417a951f92c4048de653~mv2.png?originWidth=1152&originHeight=640"
              alt="Industrial turbine structure"
              className="w-full h-full object-cover grayscale contrast-125 brightness-75"
              width={1200}
            />
            {/* Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay" />
            <div className="absolute inset-0 bg-primary/20" />
          </motion.div>
        </div>
      </section>

      {/* NARRATIVE TRANSITION - Sticky Scroll */}
      <section className="relative w-full min-h-[150vh] bg-primary">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-20" />
          
          <div className="max-w-[100rem] mx-auto px-8 w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl text-primary-foreground/10 uppercase tracking-tighter">
                Structural
              </h2>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl text-primary-foreground uppercase tracking-tighter -mt-4 md:-mt-8 relative z-10">
                Integrity
              </h2>
              <p className="font-paragraph text-accentcyan mt-8 max-w-xl mx-auto text-lg">
                Analyzing visual data points across multiple dimensions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Bento Grid */}
      <section id="gallery" ref={galleryRef} className="w-full py-32 bg-primary relative z-20 border-t border-white/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-8 lg:px-16">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h3 className="font-heading text-3xl md:text-5xl text-primary-foreground mb-4">
                Data Matrix
              </h3>
              <p className="font-paragraph text-primary-foreground/60 max-w-md">
                A high-density bento-style visualization of our core image assets. Hover to initiate glare analysis.
              </p>
            </div>
            <div className="text-right">
              <span className="font-heading text-accentcyan text-6xl block leading-none">
                {images.length.toString().padStart(2, '0')}
              </span>
              <span className="font-paragraph text-primary-foreground/40 uppercase text-xs tracking-widest">
                Total Assets
              </span>
            </div>
          </div>

          {/* Bento Grid Container - Always rendered to prevent ref crashes */}
          <div className="min-h-[60vh] relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-accentcyan/20 border-t-accentcyan rounded-full animate-spin" />
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px] transition-opacity duration-1000 ${images.length === 0 ? 'opacity-0' : 'opacity-100'}`}>
                {images.map((image, index) => {
                  const bentoClass = getBentoClass(index);
                  
                  return (
                    <motion.div
                      key={image._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-darkgrayoverlay border border-white/5 glare-effect ${bentoClass}`}
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* Image Container with Parallax feel on hover */}
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                        <Image
                          src={image.imageFile || 'https://static.wixstatic.com/media/75d5d7_2bfa7a4ed798460a96b37cd27205c635~mv2.png?originWidth=768&originHeight=256'}
                          alt={image.altText || image.title || 'Gallery asset'}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          width={800}
                        />
                      </div>

                      {/* Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span className="w-2 h-2 rounded-full bg-accentcyan animate-pulse" />
                            <span className="font-heading text-xs text-accentcyan uppercase tracking-widest">
                              Asset {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          
                          {image.title && (
                            <h4 className="font-heading text-xl md:text-2xl text-primary-foreground mb-2">
                              {image.title}
                            </h4>
                          )}
                          
                          {image.description && (
                            <p className="font-paragraph text-sm text-primary-foreground/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && images.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center border border-white/10 p-12 rounded-2xl bg-darkgrayoverlay/50 backdrop-blur-sm">
                  <div className="w-16 h-16 mx-auto mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="block w-8 h-[1px] bg-white/40 rotate-45 absolute" />
                    <span className="block w-8 h-[1px] bg-white/40 -rotate-45 absolute" />
                  </div>
                  <p className="font-heading text-2xl text-primary-foreground mb-2">
                    Data Stream Empty
                  </p>
                  <p className="font-paragraph text-primary-foreground/50">
                    No visual assets currently available in the matrix.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}