import moment from "moment";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  CalendarClock,
  BadgeCheck,
  ShieldCheck,
  FileText,
  Calendar,
  AlignLeft,
  Tag,
} from "lucide-react";
import { DISPLAY_DATETIME } from "../utils/dateDisplayFormat";
import { htmlToPlainText } from "../utils/htmlPlainText";

/**
 * Central builders for detail modals. Import `DetailModalFieldGrid` + one of these per page.
 * Add new entities here and pass `fields={buildXDetailFields(item)}` from your view component.
 */

export function buildUserDetailFields(item) {
  if (!item) return [];
  const created =
    item.createdAt && moment(item.createdAt).isValid()
      ? moment(item.createdAt).format(DISPLAY_DATETIME)
      : item.createdAt || "—";

  const accountStatusRow =
    item.supplierApproval != null && String(item.supplierApproval).length > 0
      ? [
          {
            id: "supplierAccountStatus",
            label: "Account status",
            icon: ShieldCheck,
            value: item.supplierApproval,
            kind: "accountStatus",
          },
        ]
      : [];

  return [
    {
      id: "phone",
      label: "Phone",
      icon: Phone,
      value: item.phone,
    },
    {
      id: "company",
      label: "Company",
      icon: Building2,
      value: item.company,
    },
    {
      id: "country",
      label: "Country",
      icon: MapPin,
      value: item.country,
    },
    {
      id: "status",
      label: "Status",
      icon: BadgeCheck,
      value: item.status,
      kind: "status",
    },
    ...accountStatusRow,
    {
      id: "createdAt",
      label: "Created at",
      icon: CalendarClock,
      value: created,
    },
  ];
}

/** Icon for user profile header email row in `UserViewDetailCard` (name has no icon). */
export const userDetailHeaderIcons = {
  email: Mail,
};

/**
 * @param {object} item
 * @param {{ normalizeStatus?: (s: unknown) => string }} [options]
 */
export function buildEmailTemplateDetailFields(item, options = {}) {
  if (!item) return [];
  const normalizeStatus =
    options.normalizeStatus ||
    ((s) => {
      const x = String(s || "active").toLowerCase();
      return x === "inactive" ? "inactive" : "active";
    });

  const createdRaw = item.createdAt ?? item.lastModified;
  const createdAt =
    createdRaw && moment(createdRaw).isValid()
      ? moment(createdRaw).format(DISPLAY_DATETIME)
      : createdRaw || "—";

  return [
    {
      id: "subject",
      label: "Subject",
      icon: FileText,
      value: item.subject || "—",
      span: "full",
      emphasis: true,
    },
    {
      id: "status",
      label: "Status",
      icon: BadgeCheck,
      value: normalizeStatus(item.status),
      kind: "status",
    },
    {
      id: "createdAt",
      label: "Created at",
      icon: Calendar,
      value: createdAt,
    },
    {
      id: "body",
      label: "Body preview",
      icon: AlignLeft,
      value: item.body ? htmlToPlainText(item.body) : "",
      kind: "multiline",
      span: "full",
      emptyHint: "No body content.",
    },
  ];
}

/**
 * @param {object} item
 * @param {{ normalizeStatus?: (s: unknown) => string }} [options]
 */
export function buildCategoryDetailFields(item, options = {}) {
  if (!item) return [];
  const normalizeStatus =
    options.normalizeStatus ||
    ((s) => {
      const x = String(s || "active").toLowerCase();
      return x === "inactive" ? "inactive" : "active";
    });

  const createdRaw = item.createdAt;
  const createdAt =
    createdRaw && moment(createdRaw).isValid()
      ? moment(createdRaw).format(DISPLAY_DATETIME)
      : createdRaw || "—";

  return [
    {
      id: "name",
      label: "Name",
      icon: Tag,
      value: item.name || "—",
      emphasis: true,
    },
    {
      id: "status",
      label: "Status",
      icon: BadgeCheck,
      value: normalizeStatus(item.status),
      kind: "status",
    },
    {
      id: "createdAt",
      label: "Created at",
      icon: Calendar,
      value: createdAt,
      span: "full",
    },
    {
      id: "description",
      label: "Description",
      icon: AlignLeft,
      value: item.description || "",
      kind: "multiline",
      span: "full",
      emptyHint: "No description.",
    },
  ];
}

/** Optional registry for dynamic pages */
export const detailModalFieldBuilders = {
  user: buildUserDetailFields,
  emailTemplate: buildEmailTemplateDetailFields,
  category: buildCategoryDetailFields,
};
