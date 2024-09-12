export type LoginFormType = {
    login?: string;
    password?: string;
}

export interface ITripsSearchParams {
    page: number,
    names?: string,
    email?: string,
    order_status?: number | number[],
}