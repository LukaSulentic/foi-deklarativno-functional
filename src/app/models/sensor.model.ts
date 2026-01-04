export interface SensorReading {
    id: number;
    sensorType: 'temperature' | 'humidity' | 'pressure';
    value: number;
    batteryLevel: number;
    location: string;
    timestamp: Date;
}