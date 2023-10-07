import { IPoint } from "./point.interface";

export interface IEquipment {
    _id?: string;
    name: string;
    serialNumber: number;
    points: IPoint[];
}
