import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
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
        return this.httpClient.request(
            'post', this.baseUrl + 'login',
            {
                body: { name: user, password: pass },
                responseType: 'json'
            }
        ).pipe(map( (response: any ) => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));



        /*
                return this.httpClient.post(this.baseUrl + 'login',  { name: user, password: pass })
                .pipe(map( (response: any ) => {
                    const r = response.json();
                    this.auth_token = r.success ? r.token : null;
                    return r.success;
                }))
                ;
        */
    }

    getProducts(auth: boolean = false): Observable<Product[]> {
        // return this.sendRequest(RequestMethod.Get, 'products');

        if (auth && this.auth_token != null) {
            // let h: HttpHeaders;
            // h.append('Authorization',`Bearer<${this.auth_token}>`);
            // request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
            return this.httpClient.get<Product[]>(this.baseUrl + 'products', {
                headers: { 'Authorization': `Bearer<${this.auth_token}>` }
            });
        }

        return this.httpClient.get<Product[]>(this.baseUrl + 'products');
    }
    saveOrder(order: Order, auth: boolean = false): Observable<Order> {
        // return this.sendRequest(RequestMethod.Post, 'orders', order);
        if (auth && this.auth_token != null) {
            return this.httpClient.post<Order>(this.baseUrl + 'orders', order);
        }
        return this.httpClient.post<Order>(this.baseUrl + 'orders', order, {
            headers: { 'Authorization': `Bearer<${this.auth_token}>` }
        });
    }

    /*
    private sendRequest(verb: RequestMethod,
        url: string, body?: Product | Order): Observable<Product | Order> {
        return this.http.request(new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        })).map(response => response.json());
    }
    */

    /* private sendRequest( url: string): Observable<Product | Order> {
         const req = new HttpRequest( verb, this.baseUrl + url, body, {});
         return this.httpClient.request(req).subscribe;
     } */

}
