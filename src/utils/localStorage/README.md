# LocalStorage Filter Utilities

Generic localStorage utility functions for saving and loading filters. Can be used for any page/module.

## Usage

### Option 1: Use Pre-configured Storage (Recommended)

For common pages like clients, accountants, firms:

```javascript
import { clientsStorage } from "../../../utils/localStorage";

// Get filters
const filters = clientsStorage.getDataFromLocalStorage();

// Save filters
clientsStorage.saveFiltersToLocalStorage({
  tempFilters,
  appliedFilters,
  selectedFilter,
  searchTerm,
  activeTab,
});

// Check if filters are applied
if (
  clientsStorage.hasFiltersApplied({
    selectedFilter,
    tempFilters,
    appliedFilters,
    searchTerm,
  })
) {
  // Clear filters
  clientsStorage.clearFiltersFromLocalStorage();
}
```

### Option 2: Create Custom Storage

For any custom page/module:

```javascript
import { createFilterStorage } from "../../../utils/localStorage";

// Create storage for your custom page
const myPageStorage = createFilterStorage("myPage");

// Use it the same way
const filters = myPageStorage.getDataFromLocalStorage();
myPageStorage.saveFiltersToLocalStorage({ tempFilters, selectedFilter });
```

### Option 3: Backward Compatibility (Clients Only)

For existing clients code:

```javascript
import {
  getDataFromLocalStorage,
  saveFiltersToLocalStorage,
  getNavigationData,
  saveNavigationData,
  hasFiltersApplied,
  isSidebarNavigation,
  clearFiltersFromLocalStorage,
} from "../../../utils/localStorage";

// Use directly (these are pre-configured for clients)
const filters = getDataFromLocalStorage();
saveFiltersToLocalStorage({ tempFilters, selectedFilter });
```

## Available Functions

All storage instances have these methods:

- `getDataFromLocalStorage()` - Load all filters from localStorage
- `saveFiltersToLocalStorage(filters)` - Save filters to localStorage
- `getNavigationData()` - Get navigation data from sessionStorage
- `saveNavigationData(route)` - Save navigation data to sessionStorage
- `hasFiltersApplied(filterState)` - Check if any filters are applied
- `isSidebarNavigation(currentRoute, navTime, threshold)` - Check if navigation is from sidebar
- `clearFiltersFromLocalStorage()` - Clear all filters from localStorage

## Pre-configured Storages

- `clientsStorage` - For clients page
- `accountantsStorage` - For accountants page
- `firmsStorage` - For firms page

## Example: Using in a New Component

```javascript
import { createFilterStorage } from "../../../utils/localStorage";
import { useEffect, useState } from "react";

const MyComponent = () => {
  // Create storage for this component
  const myStorage = createFilterStorage("myComponent");

  // Load filters on mount
  const initialFilters = myStorage.getDataFromLocalStorage();
  const [tempFilters, setTempFilters] = useState(initialFilters.tempFilters);
  const [selectedFilter, setSelectedFilter] = useState(
    initialFilters.selectedFilter
  );

  // Save filters when they change
  useEffect(() => {
    myStorage.saveFiltersToLocalStorage({
      tempFilters,
      selectedFilter,
    });
  }, [tempFilters, selectedFilter]);

  // ... rest of component
};
```
