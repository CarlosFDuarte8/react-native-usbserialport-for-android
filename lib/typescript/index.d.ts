import { Device } from './native_module';
import UsbSerial from './usb_serial';
export { Device, UsbSerial };
export { Listener, EventData } from './usb_serial';
export declare const Codes: {
    DEVICE_NOT_FOND: any;
    DRIVER_NOT_FOND: any;
    NOT_ENOUGH_PORTS: any;
    PERMISSION_DENIED: any;
    OPEN_FAILED: any;
    DEVICE_NOT_OPEN: any;
    SEND_FAILED: any;
    DEVICE_NOT_OPEN_OR_CLOSED: any;
};
export interface OpenOptions {
    baudRate: number;
    parity: Parity;
    dataBits: number;
    stopBits: number;
}
export declare enum Parity {
    None = 0,
    Odd = 1,
    Even = 2,
    Mark = 3,
    Space = 4
}
export interface Manager {
    list(): Promise<Device[]>;
    /**
     * Return true if already has permission, otherwise will request permission and return false.
     *
     * May return error with these codes:
     * * DEVICE_NOT_FOND
     *
     * See {@link Codes}
     * @param deviceId
     */
    tryRequestPermission(deviceId: number): Promise<boolean>;
    /**
     * May return error with these codes:
     * * DEVICE_NOT_FOND
     *
     * See {@link Codes}
     * @param deviceId
     */
    hasPermission(deviceId: number): Promise<boolean>;
    /**
     * May return error with these codes:
     * * DEVICE_NOT_FOND
     * * DRIVER_NOT_FOND
     * * NOT_ENOUGH_PORTS
     * * PERMISSION_DENIED
     * * OPEN_FAILED
     *
     * See {@link Codes}
     * @param deviceId
     * @param options
     */
    open(deviceId: number, options: OpenOptions): Promise<UsbSerial>;
    startListening(vendorId: number, productId: number): any
}
export declare const UsbSerialManager: Manager;
