import http from './api'

export function fetchProductsList(params?:any) {
    console.log('🚀 ~ fetchProductsList ~ params:', params)
    return http.get('/products', {params})
}

export function deleteProduct(id:number) {
    return http.delete(`/products/${id}`)
}

export function updateProduct(data:any) {
    return http.patch(`/products/${data.id}`, data)
}

export function addNewProduct(data:any) {
    return http.post('/products', data)
}