import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded = false;

    constructor(private dataSource: RestDataSource) { }

    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders()
            .subscribe(orders => this.orders = orders);
    }

    getOrders(): Order[] {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }

    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

    updateOrder(order: Order) {
        this.dataSource.updateOrder(order).subscribe(order2 => {
            this.orders.splice(this.orders.
                // tslint:disable-next-line triple-equals
                findIndex(o => o.id == order2.id), 1, order2);
        });
    }

    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id).subscribe(order => {
            // tslint:disable-next-line triple-equals
            this.orders.splice(this.orders.findIndex(o => id == o.id));
        });
    }

}
