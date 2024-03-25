import http from './api'

export function fetchCategoriesList() {
    return http.get('/categories')
}
