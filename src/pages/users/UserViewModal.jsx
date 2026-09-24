import React from "react";
import { FormModal } from "../../components";
import UserViewDetailCard from "./UserViewDetailCard";

/** Same footprint as add/edit user modal for consistent UX */
export const USER_VIEW_MODAL_CLASS =
  "bg-white dark:bg-gray-800 w-[92%] sm:w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col";

/**
 * View-only modal: shell (FormModal) + default {@link UserViewDetailCard} or custom detail component.
 */
export default function UserViewModal({
  isOpen,
  onClose,
  title,
  item,
  /** Pass a component like `({ item }) => …` to replace the default detail card */
  DetailComponent = null,
  className = USER_VIEW_MODAL_CLASS,
}) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className={className}
    >
      {item &&
        (DetailComponent ? (
          <DetailComponent item={item} />
        ) : (
          <UserViewDetailCard item={item} />
        ))}
    </FormModal>
  );
}
