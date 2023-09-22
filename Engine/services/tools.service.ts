import { BehaviorSubject } from 'rxjs';

class MyService {
  DEV_MODE: BehaviorSubject<boolean>;
  
  constructor() {
    this.DEV_MODE = new BehaviorSubject(true);
  }

  getDevModeValue() {
    return this.DEV_MODE.getValue();
  }


}