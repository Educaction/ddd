export default interface ValidatorInteface<T> {
  validate(entity: T): void;
}