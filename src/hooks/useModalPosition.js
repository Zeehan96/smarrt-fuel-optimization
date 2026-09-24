import { useEffect } from "react";

export const useModalPosition = (isOpen, buttonRef, modalRef) => {
  useEffect(() => {
    if (!isOpen || !buttonRef?.current || !modalRef?.current) return;

    const updatePosition = () => {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modal = modalRef.current;
      if (!modal) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 640;

      // Responsive dimensions
      const modalWidth = isMobile ? viewportWidth - 16 : 400;
      const modalHeight = isMobile
        ? Math.min(500, viewportHeight - 120)
        : Math.min(550, viewportHeight - 120);

      let left, top;

      if (isMobile) {
        left = 8;
        top = buttonRect.bottom + 8;

        if (top + modalHeight > viewportHeight - 8) {
          top = buttonRect.top - modalHeight - 8;
          if (top < 8) {
            top = 8;
            modal.style.maxHeight = `${viewportHeight - 16}px`;
          }
        }
      } else {
        left = buttonRect.right - modalWidth;
        top = buttonRect.bottom + 4;

        // Horizontal boundary checks
        if (left < 8) left = 8;
        if (left + modalWidth > viewportWidth - 8) {
          left = viewportWidth - modalWidth - 8;
        }

        // Vertical positioning - avoid snackbar area
        const snackbarSpace = 120;
        const maxBottom = viewportHeight - snackbarSpace;
        const minTop = buttonRect.bottom + 4;

        if (top < minTop) top = minTop;

        if (top + modalHeight > maxBottom) {
          const availableHeight = maxBottom - top;
          if (availableHeight > 300) {
            modal.style.height = `${availableHeight}px`;
            modal.style.maxHeight = `${availableHeight}px`;
          } else {
            top = minTop;
            modal.style.height = `${Math.max(300, availableHeight)}px`;
            modal.style.maxHeight = `${Math.max(300, availableHeight)}px`;
          }
        }
      }

      // Apply styles
      modal.style.position = "fixed";
      modal.style.left = `${left}px`;
      modal.style.top = `${top}px`;
      modal.style.width = `${modalWidth}px`;
      modal.style.height = `${modalHeight}px`;
      modal.style.maxHeight = `${modalHeight}px`;
      modal.style.zIndex = "99999";
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, buttonRef, modalRef]);
};

