import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorReading } from './models/sensor.model';
import { RAW_DATA } from './data/mock-data';
import { myFilter, myMap, myReduce, myPipe } from './core/functional-utils';
import { CODE_SNIPPETS } from './data/code-snippets';

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

  activeCodeSnippet: string | null = null;

  reset() {
    this.displayData = [...this.sourceData];
    this.viewMode = 'table';
    this.currentOperation = 'Reset - Izvorni podaci';
    this.activeCodeSnippet = null;
  }

  applyFilter() {
    const isCritical = (s: SensorReading) => s.batteryLevel < 20;

    this.displayData = myFilter(this.sourceData, isCritical);
    this.viewMode = 'table';
    this.currentOperation = 'myFilter(data, battery < 20)';
    this.activeCodeSnippet = CODE_SNIPPETS.filter;
  }

  applyImpossibleFilter() {
    const impossibleCondition = (s: SensorReading) => s.value > 1000 && s.sensorType === 'temperature';
    
    this.displayData = myFilter(this.sourceData, impossibleCondition);
    
    this.viewMode = 'table';
    this.currentOperation = 'EDGE CASE: myFilter(temp > 1000)';
    this.activeCodeSnippet = CODE_SNIPPETS.filter;
  }

  applyMap() {
    const toAlertString = (s: SensorReading) => `[ALARM] ${s.sensorType.toUpperCase()} senzor (#${s.id}) na lokaciji '${s.location}' bilježi ${s.value}`;

    this.displayData = myMap(this.sourceData, toAlertString);
    this.viewMode = 'list';
    this.currentOperation = 'myMap(data, createAlertString)';
    this.activeCodeSnippet = CODE_SNIPPETS.map;
  }

  applyReduce() {
    const tempsOnly = myFilter(this.sourceData, (s) => s.sensorType === 'temperature');

    const sum = myReduce(tempsOnly, (acc: number, curr: SensorReading) => acc + curr.value, 0);
    const count = tempsOnly.length;

    const avg = count > 0 ? (sum / count).toFixed(2) : 0;

    this.displayData = Number(avg);
    this.viewMode = 'stat';
    this.currentOperation = 'myReduce(temps, sum) / count';
    this.activeCodeSnippet = CODE_SNIPPETS.reduce;
  }

  applyPipe() {
    const filterCritical = (data: SensorReading[]) => myFilter(data, (s) => s.batteryLevel < 50);
    const mapToMessage = (data: SensorReading[]) => myMap(data, (s) => `UPOZORENJE: Baterija na ${s.batteryLevel}% (Senzor ${s.id})`);

    this.displayData = myPipe(this.sourceData, filterCritical, mapToMessage);
    this.viewMode = 'list';
    this.currentOperation = 'myPipe(data, filterCritical, mapToMessage)';
    this.activeCodeSnippet = CODE_SNIPPETS.pipe;
  }
}


