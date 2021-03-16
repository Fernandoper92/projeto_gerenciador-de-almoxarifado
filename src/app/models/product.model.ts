import { Provider } from './provider.model';

export class Product {
    id: string;
    name: string;
    code?: number;
    value?: number;
    stock?: number;
    minStock?: number;
    group: string;
    provider?: Provider;
}