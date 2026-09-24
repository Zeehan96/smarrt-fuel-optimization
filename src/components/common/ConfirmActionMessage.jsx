import React from "react";

const ConfirmActionMessage = ({
  actionType,
  adminName,
  firmName,
  userName,
  entityType = "user",
}) => {
  const getMessage = () => {
    const name = adminName || firmName || userName;
    const entityText =
      entityType === "accountant"
        ? "accountant"
        : entityType === "firm"
        ? "firm"
        : entityType === "bookkeeper" || entityType === "bookkeeping"
        ? "bookkeeper"
        : entityType === "client"
        ? "client"
        : "user";

    // List of entities that support soft delete (move to deleted list)
    const supportsSoftDelete = [
      "accountant",
      "bookkeeper",
      "bookkeeping",
      "client",
      "firm",
    ];

    switch (actionType) {
      case "delete":
        // Show soft delete message for specific entities, permanent delete for others
        if (supportsSoftDelete.includes(entityType)) {
          return (
            <>
              Are you sure you want to delete{" "}
              <span className="font-medium">{name}</span>? This will move the{" "}
              {entityText} to the deleted {entityText}s list and can be restored
              later.
            </>
          );
        } else {
          return (
            <>
              Are you sure you want to delete{" "}
              <span className="font-medium">{name}</span>? This action cannot be
              undone and will permanently remove all {entityText} data.
            </>
          );
        }

      case "softDelete":
        return (
          <>
            Are you sure you want to soft delete{" "}
            <span className="font-medium">{name}</span>? This will move the{" "}
            {entityText} to the deleted {entityText}s list and can be restored
            later.
          </>
        );

      case "restore":
        return (
          <>
            Are you sure you want to restore{" "}
            <span className="font-medium">{name}</span>? This will move the{" "}
            {entityText} back to active {entityText}s list.
          </>
        );

      case "permanentDelete":
        return (
          <>
            Are you sure you want to permanently delete{" "}
            <span className="font-medium">{name}</span>? This action cannot be
            undone and will permanently remove all {entityText} data.
          </>
        );

      default:
        return "Are you sure you want to perform this action?";
    }
  };

  return <>{getMessage()}</>;
};

export default ConfirmActionMessage;
