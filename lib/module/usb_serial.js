function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import UsbSerialportForAndroid from './native_module';
const DataReceivedEvent = 'usbSerialPortDataReceived';
export default class UsbSerial {
  constructor(deviceId, eventEmitter) {
    _defineProperty(this, "deviceId", void 0);

    _defineProperty(this, "eventEmitter", void 0);

    _defineProperty(this, "listeners", void 0);

    _defineProperty(this, "subscriptions", void 0);

    this.deviceId = deviceId;
    this.eventEmitter = eventEmitter;
    this.listeners = [];
    this.subscriptions = [];
  }
  /**
   * Send data with hex string.
   *
   * May return error with these codes:
   * * DEVICE_NOT_OPEN
   * * SEND_FAILED
   *
   * See {@link Codes}
   * @param hexStr
   * @returns
   */


  send(hexStr) {
    return UsbSerialportForAndroid.send(this.deviceId, hexStr);
  }

  whiteToUsbPort(deviceId, valueBase64) {
    return UsbSerialportForAndroid.whiteToUsbPort(deviceId, valueBase64);
  }
  /**
   * Listen to data received event.
   *
   * @param listener
   * @returns EventSubscription
   */


  onReceived(listener) {
    const listenerProxy = event => {
      if (event.deviceId !== this.deviceId) {
        return;
      }

      if (!event.data) {
        return;
      }

      listener(event);
    };

    this.listeners.push(listenerProxy);
    const sub = this.eventEmitter.addListener(DataReceivedEvent, listenerProxy);
    this.subscriptions.push(sub);
    return sub;
  }
  /**
   *
   * May return error with these codes:
   * * DEVICE_NOT_OPEN_OR_CLOSED
   *
   * See {@link Codes}
   * @returns Promise<null>
   */


  close() {
    for (const sub of this.subscriptions) {
      sub.remove();
    }

    return UsbSerialportForAndroid.close(this.deviceId);
  }

  startListening(deviceId){
    return UsbSerialportForAndroid.startListening(deviceId);
  }

}
//# sourceMappingURL=usb_serial.js.map
