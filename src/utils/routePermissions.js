const routePermissionMap = {
  "/dashboard": "Dashboard",
  "/email-templates": "Email Templates",
  "/suppliers/products": "Products",
  "/suppliers/pending": "Pending suppliers",
  "/suppliers/approved": "Approved suppliers",
  "/buyers": "Buyers",
  "/settings/email-settings": "Email Settings",
};

export const getRoutePermission = (pathname) => {
  if (routePermissionMap[pathname]) {
    return routePermissionMap[pathname];
  }
  if (pathname.startsWith("/suppliers/products")) {
    return routePermissionMap["/suppliers/products"];
  }
  if (pathname.startsWith("/suppliers/pending")) {
    return "Pending suppliers";
  }
  if (pathname.startsWith("/suppliers/approved")) {
    return "Approved suppliers";
  }
  if (pathname.startsWith("/suppliers")) {
    return "Suppliers";
  }
  if (pathname.startsWith("/buyers")) {
    return "Buyers";
  }
  if (pathname.startsWith("/categories")) {
    return "Categories";
  }
  if (pathname.startsWith("/sub-admins")) {
    return "Sub Admins";
  }
  if (pathname.startsWith("/settings/email-settings")) {
    return "Email Settings";
  }

  return null;
};

export const getFirstAvailableRoute = (userPermissions) => {
  if (!userPermissions || Object.keys(userPermissions).length === 0) {
    return "/dashboard";
  }

  for (const [route, permission] of Object.entries(routePermissionMap)) {
    if (userPermissions[permission] === "true") {
      return route;
    }
  }

  return "/dashboard";
};
