import { SensorReading } from '../models/sensor.model';

export const RAW_DATA: SensorReading[] = [
    { id: 1, sensorType: 'temperature', value: 22.5, batteryLevel: 85, location: 'Skladište A', timestamp: new Date() },
    { id: 2, sensorType: 'humidity', value: 45.0, batteryLevel: 12, location: 'Skladište A', timestamp: new Date() },
    { id: 3, sensorType: 'temperature', value: 28.1, batteryLevel: 90, location: 'Vanjska jedinica', timestamp: new Date() },
    { id: 4, sensorType: 'pressure', value: 1013, batteryLevel: 5, location: 'Skladište B', timestamp: new Date() },
    { id: 5, sensorType: 'temperature', value: 18.2, batteryLevel: 44, location: 'Hladnjača', timestamp: new Date() },
    { id: 6, sensorType: 'humidity', value: 88.0, batteryLevel: 15, location: 'Vanjska jedinica', timestamp: new Date() },
];