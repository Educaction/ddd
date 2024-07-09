// <T> notation is to turn the class generict, so we can define the type of class
// Promise<void>  - when we don't want to return the object
// <T[]> return array
export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}