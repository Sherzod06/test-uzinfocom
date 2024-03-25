export interface IProduct {
    model: string,
    released_date: string,
    category: ICategory | number,
    price: string
    description?: string,
    created_at: string,
    is_visible: boolean,
    image?: string
    id: number,
}

export interface ICategory {
    id: number,
    name: string
}