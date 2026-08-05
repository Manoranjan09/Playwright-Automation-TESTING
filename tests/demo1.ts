import {type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello";
message1 = "bye";
console.log(message1);
let age1 :number = 24;
console.log(age1);
let isActive : boolean = true;
console.log(isActive);
let numbers1 : number[] = [1,2,3];
console.log(numbers1);
let data : any = "any use when no idea about DataType";
data = 42;
console.log(data);

function add1(a:number,b:number):number
{
    return a+b;
}
add1(3,4);

let user:{name :string ,age:number,location:string} ={name : "bob" , age: 34,location:"Delhi"};

user.location = "Hyderabad";

class CartPage
{
    page:Page;
    cartProducts:Locator;
constructor(page:any)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    //this.productsText = page.locator(".card-body b");
    //this.cart =  page.locator("[routerlink*='cart']");
    //this.orders = page.locator("button[routerlink*='myorders']");
    //this.checkout = page.locator("text=Checkout");

}
}

