/// <reference lib="webworker" />

import Dexie, { Table } from 'dexie';
import { Elbase } from './core/models/elbase.model';
import { Elctks } from './core/models/elctks.model';
import { Elcand } from './core/models/elcand.model';
import { Elpaty } from './core/models/elpaty.model';
import { Elprof } from './core/models/elprof.model';
import { environment } from 'src/environments/environment';

addEventListener('message', ({ data }) => {
  switch (data.type) {
    case 'indexedDb':
      insertDBData(data.tableName, data.results);
      break;
  }
  const response = `worker response to ${data}`;
  postMessage(response);
});

function insertDBData(tableName: string, results: any) {
  const db = new AppDB();
  switch (tableName) {
    case 'elbase':
      db.elbase.bulkAdd(results).then();
      break;
    case 'elcand':
      db.elcand.bulkAdd(results).then();
      break;
    case 'elctks':
      db.elctks.bulkAdd(results).then();
      break;
    case 'elpaty':
      db.elpaty.bulkAdd(results).then();
      break;
    case 'elprof':
      db.elprof.bulkAdd(results).then();
      break;
  }
}
export class AppDB extends Dexie {
  elbase!: Table<Elbase, number>;
  elcand!: Table<Elcand, number>;
  elctks!: Table<Elctks, number>;
  elpaty!: Table<Elpaty, number>;
  elprof!: Table<Elprof, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(environment.indexedDBVersion).stores({
      elbase:
        '++id, [year+name], [year+provinceCity+countyCity], [year+townshipDistrict+village]',
      elcand: '++id, year',
      elctks:
        '++id, [year+provinceCity+countyCity], [year+townshipDistrict+village]',
      elpaty: '++id, year',
      elprof:
        '++id, [year+provinceCity+countyCity], [year+townshipDistrict+village]',
    });
  }
}