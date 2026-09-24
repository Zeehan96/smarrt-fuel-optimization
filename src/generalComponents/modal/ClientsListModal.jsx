import React, { useEffect } from "react";
import { X, Users, Mail, Phone } from "lucide-react";
import { s3BaseUrl } from "../../config/config";

const ClientsListModal = ({ isOpen, onClose, clients, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 py-3 sm:py-0">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:max-w-3xl max-h-[85vh] sm:max-h-[92vh] flex flex-col border-2 border-gray-100 dark:border-gray-700 transform transition-all duration-300 scale-100 mx-2 sm:mx-4">
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title || "Assigned Clients"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/30 dark:bg-gray-900/20">
          <div className="px-6 py-4">
            {!clients || clients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <Users className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-sm">No clients assigned</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clients.map((client, index) => (
                  <div
                    key={client._id || index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {/* Profile Image */}
                    {client.profileImage ? (
                      <img
                        src={`${s3BaseUrl}${client.profileImage}`}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#006eb8] text-white flex items-center justify-center text-lg font-semibold flex-shrink-0">
                        {client.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                    )}

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {client.name}
                      </h4>
                      <div className="flex flex-col gap-1 mt-1">
                        {client.email && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{client.email}</span>
                          </div>
                        )}
                        {client.phone_number && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{client.phone_number}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Assigned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 rounded-b-3xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total: <span className="font-semibold">{clients?.length || 0}</span>{" "}
            client(s)
          </p>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#006eb8] hover:bg-[#005a9e] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsListModal;
