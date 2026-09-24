import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Bell, Check, X, Store } from "lucide-react";
import {
  _list_notifications_api,
  _mark_notification_read_api,
  _mark_all_notifications_read_api,
} from "../../DAL/notifications/notifications";
import { useAppContext } from "../../hooks/useAppContext";
import { enqueueSnackbar } from "notistack";
import PageLoading from "./PageLoading";
import { useModalPosition } from "../../hooks/useModalPosition";
import {
  getNotificationIconConfig,
  formatTimeAgo,
  getNotificationRoute,
} from "../../utils/notificationUtils";

const NOTIFICATIONS_PER_PAGE = 10;

const NotificationModal = ({
  isOpen,
  onClose,
  setUnreadCount,
  buttonRef,
  onNotificationUpdate,
}) => {
  const { user: adminUser } = useAppContext();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const sentinelRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [unreadCount, setLocalUnreadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useModalPosition(isOpen, buttonRef, modalRef);

  // ── Load / reset on open ───────────────────────────────────
  useEffect(() => {
    if (isOpen && adminUser?._id) {
      setCurrentPage(0);
      loadNotifications(0, true);
    } else {
      setNotifications([]);
      setCurrentPage(0);
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, adminUser?._id]);

  // ── Click-outside close ────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  // ── Fetch notifications ────────────────────────────────────
  const loadNotifications = async (page = 0, isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true);
    else setLoadingMore(true);

    if (!adminUser?._id) {
      if (isInitialLoad) setLoading(false);
      else setLoadingMore(false);
      return;
    }

    const result = await _list_notifications_api({ page, limit: NOTIFICATIONS_PER_PAGE });

    if (isInitialLoad) setLoading(false);
    else setLoadingMore(false);

    if (result.code === 200) {
      const list = result.data?.notifications || result.notifications || [];
      const pagination = result.data?.pagination || {};
      const totalPages = pagination.pages ?? 1;
      const currentPageFromApi = pagination.page ?? page;

      if (isInitialLoad) {
        setNotifications(list);
        setCurrentPage(0);
        const apiUnread = result.data?.unread_count ?? 0;
        setLocalUnreadCount(apiUnread);
        if (setUnreadCount) setUnreadCount(apiUnread);
      } else {
        setNotifications((prev) => [...prev, ...list]);
        setLocalUnreadCount(result.data?.unread_count ?? 0);
      }
      // hasMore: if there are more pages after current
      setHasMore(currentPageFromApi + 1 < totalPages);
    } else {
      enqueueSnackbar(result.message || "Failed to load notifications", { variant: "error" });
      if (isInitialLoad) {
        setNotifications([]);
        setLocalUnreadCount(0);
        setHasMore(false);
      }
    }
  };

  // ── Infinite scroll ────────────────────────────────────────
  const loadMoreNotifications = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    const nextPage = currentPage + 1;
    await loadNotifications(nextPage, false);
    setCurrentPage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, hasMore, currentPage]);

  useEffect(() => {
    if (!isOpen || !hasMore || loadingMore) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMoreNotifications(); },
      { root: scrollContainerRef.current, rootMargin: "100px", threshold: 0.1 },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => { if (sentinelRef.current) observer.unobserve(sentinelRef.current); };
  }, [isOpen, hasMore, loadingMore, loadMoreNotifications]);

  // ── Actions ────────────────────────────────────────────────
  const handleMarkAsRead = async (notificationId) => {
    const result = await _mark_notification_read_api(notificationId);
    if (result.code === 200) {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, is_read: true } : n,
        ),
      );
      setLocalUnreadCount((prev) => Math.max(0, prev - 1));
      if (setUnreadCount) setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await _mark_all_notifications_read_api();
    if (result.code === 200) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true, read: true })));
      setLocalUnreadCount(0);
      if (setUnreadCount) setUnreadCount(0);
      if (onNotificationUpdate) onNotificationUpdate("all");
      enqueueSnackbar("All notifications marked as read", { variant: "success" });
    } else {
      enqueueSnackbar(result.message || "Failed to mark all as read", { variant: "error" });
    }
  };

  const handleNotificationClick = (notification) => {
    const route = getNotificationRoute(notification);
    onClose();
    navigate(route);
  };

  // ── Render icon ────────────────────────────────────────────
  const renderNotificationIcon = (notification) => {
    // Map notification_type to the icon config
    const config = getNotificationIconConfig({
      type: notification.notification_type || "",
      subtype: notification.subtype || "",
      message: notification.description || notification.title || "",
    });
    const IconComponent = config.icon;
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
      </div>
    );
  };

  // unread dot indicator
  const isUnread = (n) => !n.is_read;

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col w-full sm:w-auto z-[99999]"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#113071" }}>
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Mark all as read"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div ref={scrollContainerRef} className="overflow-y-auto flex-1 min-h-0">
        {loading ? (
          <div className="p-8 text-center h-full flex items-center justify-center">
            <PageLoading message="Loading notifications..." />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center h-full flex flex-col items-center justify-center">
            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No notifications found</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => {
                    if (isUnread(notification))
                      handleMarkAsRead(notification._id);
                    handleNotificationClick(notification);
                  }}
                  className={`px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                    isUnread(notification)
                      ? "bg-blue-50/50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">{renderNotificationIcon(notification)}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white break-words leading-snug">
                          {notification.title || "Notification"}
                        </p>
                        {isUnread(notification) && (
                          <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                        )}
                      </div>

                      {notification.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-words leading-relaxed">
                          {notification.description}
                        </p>
                      )}

                      {notification.supplier_name && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-[#113071]/10 w-fit">
                          <Store size={10} style={{ color: "#113071" }} />
                          <span className="text-xs font-semibold" style={{ color: "#113071" }}>
                            {notification.supplier_name}
                          </span>
                        </span>
                      )}

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite scroll sentinel */}
            {hasMore && (
              <div ref={sentinelRef} className="px-4 sm:px-6 py-4">
                {loadingMore && (
                  <div className="flex items-center justify-center gap-2 py-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Loading more notifications...
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default NotificationModal;
