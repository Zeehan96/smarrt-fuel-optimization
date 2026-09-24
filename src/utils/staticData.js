let vehicleIdCounter = 4;
let fuelLogIdCounter = 5;
let tripIdCounter = 3;
let userIdCounter = 4;

export const staticData = {
  vehicles: [
    { _id: "v1", id: "v1", name: "Toyota Corolla", type: "Car", fuelEfficiency: 15, tankCapacity: 45, plateNumber: "LEP-1234", createdAt: "2026-01-15" },
    { _id: "v2", id: "v2", name: "Honda Civic", type: "Car", fuelEfficiency: 14, tankCapacity: 47, plateNumber: "LEP-5678", createdAt: "2026-02-20" },
    { _id: "v3", id: "v3", name: "Suzuki Mehran", type: "Car", fuelEfficiency: 18, tankCapacity: 35, plateNumber: "LEP-9012", createdAt: "2026-03-10" },
  ],
  fuelLogs: [
    { _id: "fl1", id: "fl1", vehicleId: "v1", vehicleName: "Toyota Corolla", date: "2026-05-01", quantity: 30, cost: 7800, station: "PSO Filling Station", createdAt: "2026-05-01" },
    { _id: "fl2", id: "fl2", vehicleId: "v1", vehicleName: "Toyota Corolla", date: "2026-05-10", quantity: 25, cost: 6500, station: "Shell Pump", createdAt: "2026-05-10" },
    { _id: "fl3", id: "fl3", vehicleId: "v2", vehicleName: "Honda Civic", date: "2026-05-05", quantity: 35, cost: 9100, station: "Total Parco", createdAt: "2026-05-05" },
    { _id: "fl4", id: "fl4", vehicleId: "v3", vehicleName: "Suzuki Mehran", date: "2026-05-08", quantity: 20, cost: 5200, station: "PSO Filling Station", createdAt: "2026-05-08" },
  ],
  trips: [
    { _id: "t1", id: "t1", title: "Lahore to Islamabad", startLocation: "Lahore", endLocation: "Islamabad", distance: 380, vehicleId: "v1", vehicleName: "Toyota Corolla", fuelEstimate: 25.3, date: "2026-05-15", status: "completed" },
    { _id: "t2", id: "t2", title: "Lahore to Faisalabad", startLocation: "Lahore", endLocation: "Faisalabad", distance: 180, vehicleId: "v2", vehicleName: "Honda Civic", fuelEstimate: 12.9, date: "2026-05-20", status: "planned" },
  ],
};

export const helpers = {
  nextVehicleId: () => `v${vehicleIdCounter++}`,
  nextFuelLogId: () => `fl${fuelLogIdCounter++}`,
  nextTripId: () => `t${tripIdCounter++}`,
  nextUserId: () => `u${userIdCounter++}`,
  getVehicleName: (id) => staticData.vehicles.find((v) => v._id === id)?.name || "Unknown",
  resetCounters: () => { vehicleIdCounter = 4; fuelLogIdCounter = 5; tripIdCounter = 3; userIdCounter = 4; },
};
