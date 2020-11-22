import { Provider } from './provider.model';

export class Product {
    id: string;
    name: string;
    structuredCode?: number;
    alternativeCode?: number;
    stock?: number;
    minStock?: number;
    group: string;
    provider?: Provider;
}