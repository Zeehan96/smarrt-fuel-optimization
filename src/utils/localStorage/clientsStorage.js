import { createFilterStorage } from "./filterStorage";

const clientsStorage = createFilterStorage("clients");

export const getDataFromLocalStorage = clientsStorage.getDataFromLocalStorage;
export const saveFiltersToLocalStorage =
  clientsStorage.saveFiltersToLocalStorage;
export const getNavigationData = clientsStorage.getNavigationData;
export const saveNavigationData = clientsStorage.saveNavigationData;
export const hasFiltersApplied = clientsStorage.hasFiltersApplied;
export const isSidebarNavigation = clientsStorage.isSidebarNavigation;
export const clearFiltersFromLocalStorage =
  clientsStorage.clearFiltersFromLocalStorage;
