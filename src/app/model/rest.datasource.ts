import { Injectable } from '@angular/core';
import { HttpClient,  HttpRequest /* ,  HttpRequestMethod */ } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
// import 'rxjs/add/operator/map';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }
    getProducts(): Observable<Product[]> {
        // return this.sendRequest(RequestMethod.Get, 'products');
        return this.httpClient.get<Product[]>( this.baseUrl + 'products' );
    }
    saveOrder(order: Order): Observable<Order> {
        // return this.sendRequest(RequestMethod.Post, 'orders', order);
        return this.httpClient.post<Order>( this.baseUrl + 'orders', order );
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
