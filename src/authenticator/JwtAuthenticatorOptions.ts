import { SimpleRepository } from '../repository';

export interface JwtAuthenticatorOptions<T> {
    repository: SimpleRepository<T[]>;
    identificationKey: keyof T;
    passwordKey: keyof T;
    secret: string;
    expiresIn: number;
}
