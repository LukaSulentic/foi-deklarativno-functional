import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorReading } from './models/sensor.model';
import { RAW_DATA } from './data/mock-data';
import { myFilter, myMap, myReduce, myPipe } from './core/functional-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Functional Sensor Dashboard';

  sourceData: SensorReading[] = RAW_DATA;

  displayData: any[] | number | null = [...RAW_DATA];

  viewMode: 'table' | 'list' | 'stat' = 'table';
  currentOperation: string = 'Prikaz izvornih podataka';

  reset() {
    this.displayData = [...this.sourceData];
    this.viewMode = 'table';
    this.currentOperation = 'Reset - Izvorni podaci';
  }

  applyFilter() {
    const isCritical = (s: SensorReading) => s.batteryLevel < 20;

    this.displayData = myFilter(this.sourceData, isCritical);
    this.viewMode = 'table';
    this.currentOperation = 'myFilter(data, battery < 20)';
  }

  applyMap() {
    const toAlertString = (s: SensorReading) => `[ALARM] ${s.sensorType.toUpperCase()} senzor (#${s.id}) na lokaciji '${s.location}' bilježi ${s.value}`;

    this.displayData = myMap(this.sourceData, toAlertString);
    this.viewMode = 'list';
    this.currentOperation = 'myMap(data, createAlertString)';
  }

  applyReduce() {
    const tempsOnly = myFilter(this.sourceData, (s) => s.sensorType === 'temperature');

    const sum = myReduce(tempsOnly, (acc: number, curr: SensorReading) => acc + curr.value, 0);
    const count = tempsOnly.length;

    const avg = count > 0 ? (sum / count).toFixed(2) : 0;

    this.displayData = Number(avg);
    this.viewMode = 'stat';
    this.currentOperation = 'myReduce(temps, sum) / count';
  }

  applyPipe() {
    const filterCritical = (data: SensorReading[]) => myFilter(data, (s) => s.batteryLevel < 50);
    const mapToMessage = (data: SensorReading[]) => myMap(data, (s) => `UPOZORENJE: Baterija na ${s.batteryLevel}% (Senzor ${s.id})`);

    this.displayData = myPipe(this.sourceData, filterCritical, mapToMessage);
    this.viewMode = 'list';
    this.currentOperation = 'myPipe(data, filterCritical, mapToMessage)'
  }
}


