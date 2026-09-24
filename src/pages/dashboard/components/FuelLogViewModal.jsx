import { Fuel, Calendar, MapPin, DollarSign, Building2, Car } from "lucide-react";

const FuelLogViewModal = ({ data }) => {
  const fields = [
    { icon: Car, label: "Vehicle", value: data.vehicleName },
    { icon: Calendar, label: "Date", value: data.date },
    { icon: Fuel, label: "Quantity", value: `${data.quantity} Litres` },
    { icon: DollarSign, label: "Cost", value: `Rs. ${(data.cost || 0).toLocaleString()}` },
    { icon: Building2, label: "Station", value: data.station },
    { icon: MapPin, label: "Rate", value: data.quantity > 0 ? `Rs. ${Math.round(data.cost / data.quantity)}/L` : "N/A" },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
            <div className="p-2 rounded-lg bg-[var(--primary-light)]">
              <f.icon className="w-4 h-4 text-[var(--primary-color)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{f.label}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelLogViewModal;
