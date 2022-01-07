import { Movement } from "./model/movement";

export interface IMovementRepository {
    find(id: number): Promise<Movement | null>;
    all(): Promise<Movement[]>;
    store(entry: Movement): Promise<void>;
    update(entry: Movement): Promise<void>;
    remove(id: number): Promise<void>;
}