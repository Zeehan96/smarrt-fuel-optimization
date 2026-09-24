import { useMemo, useState } from "react";
import { Clock, ImageIcon, ArrowRight } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Crud from "react-admin-crud-manager";
import CustomTooltip from "../../../generalComponents/tooltip/CustomTooltip";
import { s3BaseUrl } from "../../../config/config";
import { DISPLAY_DATETIME } from "../../../utils/dateDisplayFormat";
import Button from "../../../components/common/Button";
import ImagePreviewModal from "../../../components/common/ImagePreviewModal";

const resolveImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const cleaned = path.replace(/^\/+/, "");
  const base = (s3BaseUrl || "").replace(/\/+$/, "");
  return base ? `${base}/${cleaned}` : `/${cleaned}`;
};

const DashboardPendingSuppliers = ({ suppliers }) => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const data = useMemo(
    () =>
      (suppliers || []).map((s) => ({
        ...s,
        name: `${s.first_name || ""} ${s.last_name || ""}`.trim(),
        profile_image: resolveImageUrl(s.profile_image),
      })),
    [suppliers],
  );

  const tableHead = useMemo(
    () => [
      { key: "index", title: "#", type: "index" },
      {
        key: "name",
        title: "Supplier",
        render: (row) => (
          <div className="flex items-center gap-3 min-w-0">
            {row.profile_image ? (
              <img
                src={row.profile_image}
                alt={row.name}
                onClick={() => setPreviewImage(row.profile_image)}
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
              />
            ) : (
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-400"
                aria-hidden
              >
                <ImageIcon size={18} />
              </div>
            )}
            <span className="font-medium text-gray-900 dark:text-gray-100 truncate flex-1 min-w-0">
              {row.name || "—"}
            </span>
          </div>
        ),
      },
      {
        key: "phone_number",
        title: "Phone",
        render: (row) => row.user_id?.phone_number || "—",
      },
      {
        key: "status",
        title: "Status",
        render: () => (
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Pending
          </span>
        ),
      },
      {
        key: "createdAt",
        title: "Created At",
        render: (row) =>
          row.createdAt && moment(row.createdAt).isValid()
            ? moment(row.createdAt).format(DISPLAY_DATETIME)
            : "—",
      },
    ],
    [],
  );

  const config = useMemo(
    () => ({
      title: "",
      fetchData: () => Promise.resolve({ data }),
      tableConfig: {
        table_head: tableHead,
        search: { enabled: false },
        pagination: {
          enabled: false,

          rows_per_page: 10,
        },
        exportCSV: { enabled: false },
      },
      modalConfig: {},
    }),
    [data, tableHead],
  );

  if (!data.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between ">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex-shrink-0">
            <Clock size={18} />
          </div>
          <span className="min-w-0">Recent Pending Suppliers</span>
          <CustomTooltip
            content="Latest five pending suppliers will be shown here."
            className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help flex-shrink-0"
            toolTipId="pending-suppliers-tooltip"
          />
        </h3>
        <Button
          onClick={() => navigate("/suppliers?status=pending_approval")}
          size="sm"
        >
          View All
        </Button>
      </div>
      <Crud config={config} />
      <ImagePreviewModal
        isOpen={!!previewImage}
        imageSrc={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
};

export default DashboardPendingSuppliers;
