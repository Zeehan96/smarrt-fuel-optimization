import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../hooks/useTheme";
import { editorKey } from "../../config/config";

const TinyEditor = ({
  value = "",
  onChange = () => {},
  height = 400,
  placeholder = "",
  toolbar = "undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | code | removeformat | help",
  plugins = "advlist autolink lists link charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime table help wordcount paste",
  menubar = false,
  branding = false,
  promotion = false,
  statusbar = false,
  resize = false,
  className = "",
  contentStyle,
}) => {
  const { isDarkMode } = useTheme();

  const defaultContentStyle = isDarkMode
    ? "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 14px; background-color: #1f2937; color: #e5e7eb; } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #9ca3af !important; opacity: 1 !important; }"
    : "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 14px; } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #9ca3af !important; opacity: 1 !important; }";

  const finalContentStyle = contentStyle || defaultContentStyle;

  return (
    <div className={className}>
      <Editor
        key={isDarkMode ? "dark" : "light"}
        apiKey={editorKey || ""}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar,
          plugins,
          toolbar,
          toolbar_mode: "wrap",
          placeholder,
          content_style: finalContentStyle,
          skin: isDarkMode ? "oxide-dark" : "oxide",
          content_css: isDarkMode ? "dark" : "default",
          branding,
          promotion,
          statusbar,
          resize,
          setup: (editor) => {
            editor.on("init", () => {
              const container = editor.getContainer();
              if (isDarkMode) {
                container.style.border = "1px solid #37415190";
              } else {
                container.style.border = "1px solid #d1d5db";
              }
              container.style.borderRadius = "0.5rem";
            });

            editor.on("OpenWindow", () => {
              const dialogs = document.querySelectorAll(".tox-tinymce-aux");
              dialogs.forEach((dialog) => {
                dialog.style.zIndex = "99999";
              });
            });
          },
        }}
      />
    </div>
  );
};

export default TinyEditor;
