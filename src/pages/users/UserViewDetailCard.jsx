import React, { useMemo } from "react";
import DetailModalFieldGrid, {
  DETAIL_MODAL_CARD_SHELL,
  DETAIL_MODAL_CARD_BODY,
} from "../../components/common/DetailModalFieldGrid";
import {
  buildUserDetailFields,
  userDetailHeaderIcons,
} from "../../config/detailModalFields";

const HEADER_SECTION =
  "flex items-center gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/80 bg-gray-50/90 dark:bg-gray-900/30";

const AVATAR_SIZE =
  "h-24 w-24 shrink-0 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-600";

function AvatarBlock({ name, avatarUrl }) {
  const initial =
    (name || "?").toString().trim().charAt(0).toUpperCase() || "?";
  const hasImage = typeof avatarUrl === "string" && avatarUrl.trim().length > 0;

  if (hasImage) {
    return <img src={avatarUrl} alt="" className={AVATAR_SIZE} />;
  }

  return (
    <div
      className={`flex ${AVATAR_SIZE} items-center justify-center bg-gray-200 text-2xl font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-100`}
    >
      {initial}
    </div>
  );
}

/**
 * Profile-style card for view modal: header (avatar + name + email) + detail grid.
 */
export function UserViewDetailCard({ item }) {
  const fields = useMemo(() => buildUserDetailFields(item), [item]);
  const EmailIcon = userDetailHeaderIcons.email;

  if (!item) return null;

  return (
    <div className={DETAIL_MODAL_CARD_SHELL}>
      <div className={HEADER_SECTION}>
        <AvatarBlock name={item.name} avatarUrl={item.avatar} />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">
            {item.name}
          </p>
          <p className="mt-1 flex items-center gap-2 truncate text-sm text-gray-500 dark:text-gray-400">
            <EmailIcon
              className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
              aria-hidden
            />
            <span className="truncate">{item.email}</span>
          </p>
        </div>
      </div>

      <div className={DETAIL_MODAL_CARD_BODY}>
        <DetailModalFieldGrid fields={fields} />
      </div>
    </div>
  );
}

export default UserViewDetailCard;
