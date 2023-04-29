class Purchase{
    id: number = 0;
    costumerId: string = "";
    cartId: number = 0;
    totalPrice: number = 0;
    city: string = "";
    street: string = "";
    deliveryDate: Date = new Date();
    orderedAt: Date = new Date();
    paymentNum: string = "";
}
export default Purchase;