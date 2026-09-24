import { menuItems } from "./sidebarConfig";

const getPermissionItems = () => {
  const out = [];
  const pushItem = (
    item,
    parentLabel = "",
    level = 0,
    parentId = null,
    childIndex = -1,
    childCount = 0,
  ) => {
    if (!item?.id || !item?.permissionKey) return;
    out.push({
      id: item.id,
      parentId,
      level,
      permissionKey: item.permissionKey,
      label: parentLabel ? `${parentLabel} - ${item.label}` : item.label,
      itemLabel: item.label,
      childIndex,
      childCount,
    });
  };

  menuItems.forEach((item) => {
    pushItem(item, "", 0, null);
    if (Array.isArray(item.submenu)) {
      const total = item.submenu.length;
      item.submenu.forEach((child, idx) =>
        pushItem(child, item.label, 1, item.id, idx, total),
      );
    }
  });

  return out;
};

export const getPermissionParentChildrenGroups = () =>
  menuItems
    .filter((item) => Array.isArray(item.submenu) && item.submenu.length > 0)
    .map((item) => ({
      parentFieldKey: `perm__${item.id}`,
      childFieldKeys: item.submenu
        .filter((child) => child?.id)
        .map((child) => `perm__${child.id}`),
    }));

const parentIdsWithChildren = new Set(
  menuItems
    .filter((item) => Array.isArray(item.submenu) && item.submenu.length > 0)
    .map((item) => item.id),
);

const applyPermissionHierarchySelection = (form = {}) => {
  const next = { ...form };
  getPermissionParentChildrenGroups().forEach(
    ({ parentFieldKey, childFieldKeys }) => {
      // Settings children are managed by settingsChildPermsRef — skip auto-cascade
      if (parentFieldKey === "perm__settings") return;

      const parentSelected = Boolean(next[parentFieldKey]);
      const hasAnyChildSelected = childFieldKeys.some((k) => Boolean(next[k]));

      // Parent selected => all children selected.
      if (parentSelected) {
        childFieldKeys.forEach((k) => {
          next[k] = true;
        });
      }

      // Any child selected => parent selected.
      if (hasAnyChildSelected) {
        next[parentFieldKey] = true;
      }
    },
  );
  return next;
};

/**
 * API may send e.g. ['["Dashboard"]'], nested JSON strings, or plain ["Dashboard","Buyers"].
 */
export const parseSubAdminPermissions = (raw) => {
  const out = [];
  const add = (s) => {
    if (s === null || s === undefined) return;
    let v = typeof s === "string" ? s.trim() : String(s).trim();
    if (!v) return;
    v = v.replace(/^["']+|["']+$/g, "");
    if (!v) return;
    if (v === "[]" || v === "{}" || v === "''" || v === '""') return;
    if (!out.includes(v)) out.push(v);
  };

  const consume = (val) => {
    if (val == null) return;
    if (Array.isArray(val)) {
      val.forEach((item) => consume(item));
      return;
    }
    if (typeof val === "object") {
      Object.entries(val).forEach(([k, v]) => {
        if (v === true || v === "true" || v === 1 || v === "1") add(k);
      });
      return;
    }
    if (typeof val === "string") {
      const t = val.trim();
      if (!t) return;
      if (t === "[]" || t === "{}") return;
      if (t.startsWith("[") && t.endsWith("]")) {
        try {
          const parsed = JSON.parse(t);
          consume(parsed);
        } catch {
          t.slice(1, -1)
            .split(",")
            .map((x) => x.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, ""))
            .filter(Boolean)
            .forEach((x) => add(x));
        }
      } else {
        add(t);
      }
      return;
    }
    add(val);
  };

  consume(raw);
  return out.filter((k) => k && k !== "[]" && k !== "{}");
};

/** API may send `sub_admin`, `sub-admin`, `Sub_Admin`, etc. */
export const isSubAdminRole = (role) => {
  const r = String(role ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return r === "sub_admin";
};

/**
 * Sidebar / route checks expect `{ [permissionKey]: "true" }`.
 * Admin detail API may return nested string/array permissions for sub admins.
 */
export const buildSidebarPermissionsMap = (rawPermissions) => {
  const keys = parseSubAdminPermissions(rawPermissions);
  const o = {};
  keys.forEach((k) => {
    if (k) o[k] = "true";
  });
  // Parent-only keys (e.g. "Suppliers"): grant submenu keys so SidebarNavs can render children.
  // Exception: "Settings" children are granted individually — only what's explicitly in permissions.
  menuItems.forEach((item) => {
    if (!Array.isArray(item.submenu) || !item.permissionKey) return;
    if (item.id === "settings") return; // settings children granted individually
    if (item.id === "support-tickets") return; // support-tickets children granted individually
    if (o[item.permissionKey] === "true") {
      item.submenu.forEach((sub) => {
        const pk = sub.permissionKey ?? sub.label;
        if (pk) o[pk] = "true";
      });
    }
  });
  return o;
};

/** Initial values for edit form checkboxes (`perm__<menuId>`) from resolved permission keys. */
export const buildPermissionCheckboxDefaults = (permissionsList) => {
  const set = new Set(permissionsList || []);
  // Backward compatibility: if old support ticket child permissions are present,
  // keep the parent support tickets permission selected in edit form.
  if (set.has("Supplier Tickets") || set.has("Buyer Tickets")) {
    set.add("Support Tickets");
  }
  const o = {};
  getPermissionItems().forEach((item) => {
    o[`perm__${item.id}`] = set.has(item.permissionKey);
  });
  return applyPermissionHierarchySelection(o);
};

/** Permissions section: label only; input hidden (add modal). */
export const getSubAdminPermissionSectionIntroFields = () => [
  {
    key: "_permissions_section_label",
    label: "Permissions *",
    type: "text",
    defaultValue: "",
    parentClass:
      "col-span-12 mt-2 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100 [&_input]:hidden [&_input]:h-0 [&_input]:min-h-0 [&_input]:p-0 [&_input]:m-0 [&_input]:border-0",
  },
];

/** Checkbox keys in add/edit form → sidebar `permissionKey` values for the API. */
export const getSubAdminPermissionCheckboxFields = () =>
  getPermissionItems()
    // Show only parent cards in Add/Edit UI.
    .filter((item) => item.level === 0)
    // Remove "Sub Admins" permission — sub admins cannot manage other sub admins
    .filter((item) => item.id !== "sub-admins")
    .map((item) => {
      const isParentWithChildren = parentIdsWithChildren.has(item.id);
      return {
        key: `perm__${item.id}`,
        type: "checkbox",
        defaultValue: false,
        className:
          "text-[var(--primary-500)] focus:ring-[var(--primary-500)] dark:focus:ring-[var(--primary-500)]",
        label:
          item.id === "suppliers"
            ? `${item.itemLabel}\nAccess to ${item.itemLabel} (includes pending, approved and rejected suppliers)`
            : `${item.itemLabel}\nAccess to ${item.itemLabel}`,
        parentClass: isParentWithChildren
          ? "subadmin-permission-card subadmin-permission-parent subadmin-permission-parent-with-children col-span-6 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/70 px-4 py-3 shadow-sm"
          : "subadmin-permission-card col-span-6 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60 px-4 py-3 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors",
      };
    });

export const collectPermissionKeysFromForm = (form) => {
  const normalizedForm = applyPermissionHierarchySelection(form);
  const items = getPermissionItems();
  const itemById = new Map(items.map((item) => [item.id, item]));

  const selected = new Set(
    items
      .filter((item) => Boolean(normalizedForm?.[`perm__${item.id}`]))
      .map((item) => item.permissionKey),
  );

  // For parent-child groups: if parent is selected, keep children individually
  // EXCEPT for "settings" — settings children must always be sent individually.
  getPermissionParentChildrenGroups().forEach(
    ({ parentFieldKey, childFieldKeys }) => {
      const parentId = parentFieldKey.replace("perm__", "");
      if (parentId === "settings") return; // settings children go individually
      const parentPermissionKey = itemById.get(parentId)?.permissionKey;
      if (!parentPermissionKey || !selected.has(parentPermissionKey)) return;

      childFieldKeys.forEach((childFieldKey) => {
        const childId = childFieldKey.replace("perm__", "");
        const childPermissionKey = itemById.get(childId)?.permissionKey;
        if (childPermissionKey) selected.delete(childPermissionKey);
      });
    },
  );

  return Array.from(selected);
};
