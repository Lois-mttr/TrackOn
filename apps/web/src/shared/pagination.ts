export interface Pagina<T> {
    items: T[];
    pagina: number;
    limite: number;
    hayMas: boolean;
    total?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export type PaginaVisible = number | 'inicio-ellipsis' | 'fin-ellipsis';

export function paginasVisibles(actual: number, total: number): PaginaVisible[] {
    if (total <= 7) return Array.from({ length: total }, (_, indice) => indice + 1);
    if (actual <= 4) return [1, 2, 3, 4, 5, 'fin-ellipsis', total];
    if (actual >= total - 3) return [1, 'inicio-ellipsis', total - 4, total - 3, total - 2, total - 1, total];
    return [1, 'inicio-ellipsis', actual - 1, actual, actual + 1, 'fin-ellipsis', total];
}
