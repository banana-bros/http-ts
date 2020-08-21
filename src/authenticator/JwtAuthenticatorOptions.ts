import { Repository } from '../repository/Repository';

export interface JwtAuthenticatorOptions<T> {
    repository: Repository<T[]>;
    identificationKey: keyof T;
    passwordKey: keyof T;
    secret: string;
    expiresIn: number;
}
