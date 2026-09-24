/**
 * localStorage utilities index
 * Export all localStorage utility functions
 */

// Export generic filter storage factory
export { createFilterStorage } from "./filterStorage";

// Export pre-configured storages
export {
  clientsStorage,
  accountantsStorage,
  firmsStorage,
} from "./filterStorage";

// Export clients storage functions (for backward compatibility)
export * from "./clientsStorage";
