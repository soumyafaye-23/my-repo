import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

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

  // Dynamic grid layout - varied sizes for visual interest
  const getGridClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
    ];
    return patterns[index % patterns.length];
  };

  const getAccentColor = (index: number) => {
    const colors = [
      'accentcyan',
      'accentmagenta',
      'accentpurple',
      'accentpink',
      'accentorange',
      'accentyellow',
      'accentlime',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground overflow-hidden">
      <Header />

      {/* FULL-BLEED HERO - Image Dominant */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden pt-20">
        <motion.div 
          style={{ scale: heroScale }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="https://static.wixstatic.com/media/75d5d7_2365bcbfb933417a951f92c4048de653~mv2.png?originWidth=1920&originHeight=1080"
            alt="Hero visual"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />
        </motion.div>

        {/* Minimal Text Overlay */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-center px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 leading-tight"
            >
              Visual<br />Excellence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-paragraph text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Curated imagery that inspires and transforms
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-1 h-2 bg-primary-foreground/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* FEATURED IMAGE SECTION - Large Showcase */}
      <section className="relative w-full py-0 bg-primary">
        {images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[60vh] md:h-[70vh] overflow-hidden group"
          >
            <Image
              src={images[0].imageFile || 'https://static.wixstatic.com/media/75d5d7_2bfa7a4ed798460a96b37cd27205c635~mv2.png'}
              alt={images[0].altText || images[0].title || 'Featured image'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              width={1920}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {images[0].title && (
                  <h2 className="font-heading text-3xl md:text-5xl text-primary-foreground mb-4">
                    {images[0].title}
                  </h2>
                )}
                {images[0].description && (
                  <p className="font-paragraph text-base md:text-lg text-primary-foreground/80 max-w-2xl">
                    {images[0].description}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      {/* MASONRY GALLERY - Image-First Layout */}
      <section id="gallery" ref={galleryRef} className="relative w-full py-20 md:py-32 bg-primary">
        <div className="max-w-[120rem] mx-auto px-4 md:px-8 lg:px-16">
          
          {/* Section Header - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4">
              Collection
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accentcyan to-accentmagenta" />
          </motion.div>

          {/* Masonry Grid */}
          <div className="min-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="w-16 h-16 border-2 border-accentcyan/20 border-t-accentcyan rounded-full animate-spin" />
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px] md:auto-rows-[320px]">
                {images.map((image, index) => {
                  const gridClass = getGridClass(index);
                  const accentColor = getAccentColor(index);

                  return (
                    <motion.div
                      key={image._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: (index % 10) * 0.08 }}
                      className={`${gridClass} group relative overflow-hidden rounded-lg cursor-pointer bg-darkgrayoverlay`}
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={image.imageFile || 'https://static.wixstatic.com/media/75d5d7_2bfa7a4ed798460a96b37cd27205c635~mv2.png'}
                          alt={image.altText || image.title || 'Gallery image'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          width={800}
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                      {/* Accent Border on Hover */}
                      <div className={`absolute inset-0 border-2 border-${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-10">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {image.title && (
                            <h3 className="font-heading text-lg md:text-2xl text-primary-foreground mb-2 line-clamp-2">
                              {image.title}
                            </h3>
                          )}
                          {image.description && (
                            <p className="font-paragraph text-sm text-primary-foreground/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {image.description}
                            </p>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="font-heading text-2xl text-primary-foreground/40 mb-2">
                    No Images Yet
                  </p>
                  <p className="font-paragraph text-primary-foreground/30">
                    Add images to your gallery to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IMAGE STRIP - Horizontal Scroll Feel */}
      {images.length > 4 && (
        <section className="relative w-full py-20 md:py-32 bg-primary border-t border-primary-foreground/10">
          <div className="max-w-[120rem] mx-auto px-4 md:px-8 lg:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading text-3xl md:text-5xl text-primary-foreground mb-12"
            >
              More Highlights
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(1, 4).map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative h-80 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.imageFile || 'https://static.wixstatic.com/media/75d5d7_2bfa7a4ed798460a96b37cd27205c635~mv2.png'}
                    alt={image.altText || image.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    width={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {image.title && (
                      <h3 className="font-heading text-xl text-primary-foreground">
                        {image.title}
                      </h3>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
