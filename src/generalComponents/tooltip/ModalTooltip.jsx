import React, { useState, useRef, useLayoutEffect } from "react";
import { Info } from "lucide-react";

const ModalTooltip = ({ text, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const calculatePosition = () => {
        if (!containerRef.current || !tooltipRef.current) return;

        const iconRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Find modal container
        const modalContainer = containerRef.current.closest(".common-modal");
        let containerRight = viewportWidth - 16;
        
        if (modalContainer) {
          // Find the modal content div (the white box inside modal backdrop)
          const modalContentBox = Array.from(modalContainer.children).find(
            child => {
              const classes = child.className || '';
              return classes.includes('bg-white') || 
                     classes.includes('dark:bg-gray-800') ||
                     classes.includes('max-w-2xl') ||
                     classes.includes('rounded-2xl');
            }
          );
          
          if (modalContentBox) {
            const contentRect = modalContentBox.getBoundingClientRect();
            // Account for scrollbar (typically 15-17px) + right padding (24px)
            containerRight = contentRect.right - 17 - 24;
          } else {
            // Fallback: use modal container itself with more conservative margin
            const modalRect = modalContainer.getBoundingClientRect();
            containerRight = modalRect.right - 30; // More space for scrollbar
          }
        }

        // Calculate available space from icon to right edge
        const availableWidth = containerRight - iconRect.left;
        const preferredWidth = 320; // w-80 = 320px
        
        // Use available width if less than preferred, with margin
        let finalWidth = Math.min(preferredWidth, Math.max(200, availableWidth - 16));
        
        // Ensure tooltip doesn't overflow
        const tooltipRight = iconRect.left + finalWidth;
        let leftOffset = 0;
        
        if (tooltipRight > containerRight) {
          // Shift left to fit
          leftOffset = containerRight - iconRect.left - finalWidth;
          // If still doesn't fit, reduce width
          if (leftOffset < -iconRect.left + 16) {
            finalWidth = availableWidth - 16;
            leftOffset = 0;
          }
        }

        setTooltipStyle({
          left: `${leftOffset}px`,
          width: `${finalWidth}px`,
          maxWidth: `${finalWidth}px`,
        });
      };

      requestAnimationFrame(calculatePosition);
      
      // Recalculate on scroll/resize
      const handleUpdate = () => {
        if (isVisible) {
          calculatePosition();
        }
      };

      const modalContainer = containerRef.current?.closest(".common-modal");
      const scrollContainer = modalContainer?.querySelector(".overflow-y-auto");
      
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleUpdate, { passive: true });
      }
      window.addEventListener("resize", handleUpdate, { passive: true });

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener("scroll", handleUpdate);
        }
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={() => setIsVisible(true)}
      onTouchEnd={() => setIsVisible(false)}
    >
      <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-0 mb-2 z-[10000]"
          style={tooltipStyle}
        >
          <div className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg text-left whitespace-normal pointer-events-none">
            {text}
            <div className="absolute top-full left-4 -mt-1">
              <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTooltip;

