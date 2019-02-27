import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { map } from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        /*
                return this.http.request(new Request({
                    method: RequestMethod.Post,
                    url: this.baseUrl + 'login',
                    body: { name: user, password: pass }
                })).map(response => {
                    let r = response.json();
                    this.auth_token = r.success ? r.token : null;
                    return r.success;
                });
        */
        /* 2019.02.27
         return this.httpClient.request(
             'post', this.baseUrl + 'login',
             {
                 body: { name: user, password: pass },
                 responseType: 'json'
             }
         ).pipe(map((response: any) => {
             this.auth_token = response.success ? response.token : null;
             return response.success;
         }));
         */

        return this.httpClient.post(this.baseUrl + 'login', { name: user, password: pass })
            .pipe(map((response: any) => {
                // const r = response.json();
                this.auth_token = response.success ? response.token : null;
                return response.success;
            }))
            ;
    }

    getProducts(auth: boolean = false): Observable<Product[]> {
        // return <Observable<Product[]>>this.sendRequest( 'get', 'products');


        if (auth && this.auth_token != null) {
            // let h: HttpHeaders;
            // h.append('Authorization',`Bearer<${this.auth_token}>`);
            // request.headers.set('Authorization', `Bearer<${this.auth_token}>`);
            return this.httpClient.get<Product[]>(this.baseUrl + 'products', {
                headers: { 'Authorization': `Bearer<${this.auth_token}>` }
            });
        }

        return this.httpClient.get<Product[]>(this.baseUrl + 'products');
    }

    saveProduct(product: Product): Observable<Product> {
        /*
        return <Observable<Product>>this.sendRequest('post', 'products',
            product, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.post<Product>(this.baseUrl + 'products', product,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.post<Product>(this.baseUrl + 'products', product);
    }

    updateProduct(product): Observable<Product> {
        /*
          return <Observable<Product>>this.sendRequest('put',
              `products/${product.id}`, product, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.put<Product>(this.baseUrl + `products/${product.id}`, product,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.put<Product>(this.baseUrl + `products/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<Product> {
        /*
        return <Observable<Product>>this.sendRequest('delete',
            `products/${id}`, null, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.delete<Product>(this.baseUrl + `products/${id}`,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.delete<Product>(this.baseUrl + `products/${id}`);
    }

    getOrders(): Observable<Order[]> {
        /*
        return <Observable<Order[]>>this.sendRequest('get',
            'orders', null, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.get<Order[]>(this.baseUrl + 'orders', {
                headers: { 'Authorization': `Bearer<${this.auth_token}>` }
            });
        }

        return this.httpClient.get<Order[]>(this.baseUrl + 'orders');
    }

    deleteOrder(id: number): Observable<Order> {
        /*
        return <Observable<Order>>this.sendRequest('delete',
            `orders/${id}`, null, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.delete<Order>(this.baseUrl + `orders/${id}`,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.delete<Order>(this.baseUrl + `orders/${id}`);
    }

    updateOrder(order: Order): Observable<Order> {
        /*
        return <Observable<Order>>this.sendRequest('put',
            `orders/${order.id}`, order, true);
        */

        if (this.auth_token != null) {
            return this.httpClient.put<Order>(this.baseUrl + `orders/${order.id}`, order,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.put<Order>(this.baseUrl + `orders/${order.id}`, order);
    }

    saveOrder(order: Order): Observable<Order> {
        /*
        return this.sendRequest(RequestMethod.Post,
            "orders", order);
        */

        if (this.auth_token != null) {
            return this.httpClient.post<Order>(this.baseUrl + 'orders', order,
                { headers: { 'Authorization': `Bearer<${this.auth_token}>` } });
        }

        return this.httpClient.post<Order>(this.baseUrl + 'orders', order);
    }

    /*
    private sendRequest(verb: string,
        url: string, body?: Product | Order, auth: boolean = false)
        : Observable<Product | Product[] | Order | Order[]> {

        const req = new HttpRequest(verb, this.baseUrl + url, body, {});
        if (auth && this.auth_token != null) {
            req.headers.set('Authorization', `Bearer<${this.auth_token}>`);
        }

        return this.httpClient.request<Product | Product[] | Order | Order[]>(req)
            .pipe(map((response: any) => {
                // HttpEvent< Product | Product[] | Order | Order[] >

                // if ( response instanceof HttpResponse ) {
                let u: any;
                u = <any>response;

                return u.body;
                // }
                // is  HttpResponse< Product | Product[] | Order | Order[] >
                // return (<HttpResponse< Product | Product[] | Order | Order[] >>response).body;


                // let u: unknown;
                // u = <unknown>response;
                // return (HttpResponse< Product | Product[] | Order | Order[] >u).body;

                // return null;



            }));

    }
    */

    /*
    private sendRequest(verb: RequestMethod,
        url: string, body?: Product | Order, auth: boolean = false)
        : Observable<Product | Product[] | Order | Order[]> {
        let request = new Request({
            method: verb,
            url: this.baseUrl + url, body: body
        });
        if (auth && this.auth_token != null) {
            request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
        }
        return this.http.request(request).map(response => response.json());
    }
    */
}
