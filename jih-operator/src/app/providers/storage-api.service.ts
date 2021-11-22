/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { StorageDto } from '../dto/StorageDto';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageApiService {

  constructor() { }
  // JSON "set" example
  async setObject(storageDto: StorageDto) {
    await Storage.set({
      key: environment.keyStorage,
      value: JSON.stringify(storageDto)
    });
  }
  // JSON "get" example
  async getObject(): Promise<StorageDto> {
    console.log('API');
    const ret = await Storage.get({ key: environment.keyStorage });
    console.log(ret);
    const resultado = ret.value;
    if(ret===null){
      return undefined;
    }else{
      const resultados: StorageDto = JSON.parse(resultado);
      return Object.assign(resultados);
    }
  }
  async removeItem() {
    await Storage.remove({ key: environment.keyStorage });
  }
  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }

  async clear() {
    await Storage.clear();
  }
}
