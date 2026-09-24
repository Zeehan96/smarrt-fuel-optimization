import React from "react";
import { FileText, Image, X } from "lucide-react";
import { s3BaseUrl, projectMode } from "../../config/config";

const SettingsForm = ({
  formData,
  previewImages,
  onInputChange,
  onFileChange,
  onImageClick,
  onRemoveImage,
}) => {
  const isNewlySelected = (imageSrc) => {
    if (!imageSrc) return false;
    if (imageSrc.includes(s3BaseUrl)) return false;
    return imageSrc.startsWith("data:image") || imageSrc.startsWith("blob:");
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Meta Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => onInputChange("metaTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter meta title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="3"
              value={formData.metaDescription}
              onChange={(e) => onInputChange("metaDescription", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
              placeholder="Enter meta description"
              required
            />
          </div>

          {/* Hide Intro Link for Firm Portal in invoice mode */}
          {projectMode !== "invoice" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Intro Link for Firm Portal <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.intro_links?.link || ""}
                onChange={(e) =>
                  onInputChange("intro_links", {
                    ...formData.intro_links,
                    link: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter intro link URL"
                required
              />
            </div>
          )}
        </div>
      </div>

      {/* Portal Branding Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Image className="w-5 h-5 mr-2 text-purple-600" />
          Portal Branding
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portal Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Portal Logo <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {previewImages.portalLogo && (
                <div className="relative w-full h-32 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900 group">
                  <img
                    src={previewImages.portalLogo}
                    alt="Portal Logo Preview"
                    className="max-h-28 max-w-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onImageClick(previewImages.portalLogo)}
                    title="Click to preview"
                  />
                  {isNewlySelected(previewImages.portalLogo) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage("portalLogo");
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg z-10"
                      title="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
              <input
                id="portalLogo-input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.jfif"
                onChange={(e) => onFileChange("portalLogo", e.target.files[0])}
                className="block w-full px-3 py-2 text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#006eb8] file:text-white hover:file:bg-[#005a94] file:cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recommended size: 200x60px (PNG, JPG, JPEG, WEBP, JFIF). Max
                size: 5MB
              </p>
            </div>
          </div>

          {/* Favicon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favicon <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {previewImages.favicon && (
                <div className="relative w-full h-32 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900 group">
                  <img
                    src={previewImages.favicon}
                    alt="Favicon Preview"
                    className="max-h-28 max-w-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onImageClick(previewImages.favicon)}
                    title="Click to preview"
                  />
                  {isNewlySelected(previewImages.favicon) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage("favicon");
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg z-10"
                      title="Remove favicon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
              <input
                id="favicon-input"
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange("favicon", e.target.files[0])}
                className="block w-full px-3 py-2 text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#006eb8] file:text-white hover:file:bg-[#005a94] file:cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recommended size: 32x32px or 64x64px (ICO, PNG, JPG, JPEG). Max
                size: 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
