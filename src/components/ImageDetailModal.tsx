import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GalleryImages } from '@/entities';
import { Image } from '@/components/ui/image';

interface ImageDetailModalProps {
  image: GalleryImages;
  onClose: () => void;
}

export default function ImageDetailModal({ image, onClose }: ImageDetailModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/95 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-6xl mx-4 bg-secondary rounded-lg overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-primary-foreground" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[600px] bg-darkgrayoverlay">
              <Image
                src={image.imageFile || 'https://static.wixstatic.com/media/75d5d7_d850d188712145649aeb0f04518736b5~mv2.png?originWidth=768&originHeight=768'}
                alt={image.altText || image.title || 'Gallery image detail'}
                className="w-full h-full object-cover"
                width={800}
              />
            </div>

            {/* Details Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {image.title && (
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
                  {image.title}
                </h2>
              )}

              {image.description && (
                <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8">
                  {image.description}
                </p>
              )}

              {/* Metadata */}
              <div className="space-y-4 pt-6 border-t border-secondary-foreground/10">
                {image.uploadDate && (
                  <div>
                    <p className="font-heading text-sm text-secondary-foreground/60 mb-1">
                      Upload Date
                    </p>
                    <p className="font-paragraph text-base text-secondary-foreground">
                      {new Date(image.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}

                {image.displayOrder !== undefined && (
                  <div>
                    <p className="font-heading text-sm text-secondary-foreground/60 mb-1">
                      Display Order
                    </p>
                    <p className="font-paragraph text-base text-secondary-foreground">
                      #{image.displayOrder}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button (Bottom) */}
              <button
                onClick={onClose}
                className="mt-8 px-8 py-4 bg-accentcyan text-primary font-heading text-base rounded-full hover:bg-accentcyan/90 transition-colors w-full md:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
