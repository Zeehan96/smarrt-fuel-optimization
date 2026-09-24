export const createFilterStorage = (prefix) => {
  const STORAGE_KEYS = {
    FILTERS: `${prefix}_filters`,
    APPLIED_FILTERS: `${prefix}_applied_filters`,
    SELECTED_FILTER: `${prefix}_selected_filter`,
    SEARCH_TERM: `${prefix}_search_term`,
    ACTIVE_TAB: `${prefix}_active_tab`,
    PREVIOUS_ROUTE: `${prefix}_previous_route`,
    NAV_TIME: `${prefix}_nav_time`,
  };

  /**
   * Get all filters from localStorage
   * @returns {Object} Filters object with default values if not found
   */
  const getDataFromLocalStorage = () => {
    try {
      const savedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);
      const savedAppliedFilters = localStorage.getItem(
        STORAGE_KEYS.APPLIED_FILTERS
      );
      const savedSelectedFilter = localStorage.getItem(
        STORAGE_KEYS.SELECTED_FILTER
      );
      const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM);
      const savedActiveTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);

      if (savedFilters) {
        return {
          tempFilters: JSON.parse(savedFilters),
          appliedFilters: savedAppliedFilters
            ? JSON.parse(savedAppliedFilters)
            : { start_date: "", end_date: "" },
          selectedFilter: savedSelectedFilter || "all",
          searchTerm: savedSearchTerm || "",
          activeTab: savedActiveTab || "active",
        };
      }
    } catch (error) {
      console.error(
        `Error loading filters from localStorage for ${prefix}:`,
        error
      );
    }

    // Return default values
    return {
      tempFilters: {
        status: "all",
        firm_id: "all",
        start_date: "",
        end_date: "",
      },
      appliedFilters: { start_date: "", end_date: "" },
      selectedFilter: "all",
      searchTerm: "",
      activeTab: "active",
    };
  };

  /**
   * Save filters to localStorage
   * @param {Object} filters - Filters object to save
   */
  const saveFiltersToLocalStorage = (filters) => {
    try {
      const {
        tempFilters,
        appliedFilters,
        selectedFilter,
        searchTerm,
        activeTab,
      } = filters;

      if (tempFilters) {
        localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(tempFilters));
      }
      if (appliedFilters) {
        localStorage.setItem(
          STORAGE_KEYS.APPLIED_FILTERS,
          JSON.stringify(appliedFilters)
        );
      }
      if (selectedFilter !== undefined) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_FILTER, selectedFilter);
      }
      if (searchTerm !== undefined) {
        localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
      }
      if (activeTab !== undefined) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
      }
    } catch (error) {
      console.error(
        `Error saving filters to localStorage for ${prefix}:`,
        error
      );
    }
  };

  /**
   * Get navigation data from sessionStorage
   * @returns {Object} Navigation data with previous route and timestamp
   */
  const getNavigationData = () => {
    try {
      const previousRoute = sessionStorage.getItem(STORAGE_KEYS.PREVIOUS_ROUTE);
      const navTime = sessionStorage.getItem(STORAGE_KEYS.NAV_TIME);
      return {
        previousRoute: previousRoute || null,
        navTime: navTime ? parseInt(navTime) : null,
      };
    } catch (error) {
      console.error(`Error loading navigation data for ${prefix}:`, error);
      return { previousRoute: null, navTime: null };
    }
  };

  /**
   * Save navigation data to sessionStorage
   * @param {string} route - Current route path
   */
  const saveNavigationData = (route) => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.PREVIOUS_ROUTE, route);
      sessionStorage.setItem(STORAGE_KEYS.NAV_TIME, Date.now().toString());
    } catch (error) {
      console.error(`Error saving navigation data for ${prefix}:`, error);
    }
  };

  const hasFiltersApplied = (filterState) => {
    const { selectedFilter, tempFilters, appliedFilters, searchTerm } =
      filterState;

    return (
      selectedFilter !== "all" ||
      (tempFilters?.firm_id && tempFilters.firm_id !== "all") ||
      (tempFilters?.is_individual && tempFilters.is_individual !== "all") ||
      appliedFilters?.start_date ||
      appliedFilters?.end_date ||
      searchTerm
    );
  };
  const isSidebarNavigation = (currentRoute, navTime, threshold = 5000) => {
    if (!navTime) return false;
    const timeSinceNavigation = Date.now() - navTime;
    return timeSinceNavigation < threshold;
  };

  const clearFiltersFromLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.FILTERS);
      localStorage.removeItem(STORAGE_KEYS.APPLIED_FILTERS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_FILTER);
      localStorage.removeItem(STORAGE_KEYS.SEARCH_TERM);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TAB);
    } catch (error) {
      console.error(
        `Error clearing filters from localStorage for ${prefix}:`,
        error
      );
    }
  };

  return {
    getDataFromLocalStorage,
    saveFiltersToLocalStorage,
    getNavigationData,
    saveNavigationData,
    hasFiltersApplied,
    isSidebarNavigation,
    clearFiltersFromLocalStorage,
  };
};

export const clientsStorage = createFilterStorage("clients");
export const accountantsStorage = createFilterStorage("accountants");
export const firmsStorage = createFilterStorage("firms");
export const subscriptionsStorage = createFilterStorage("subscriptions");
