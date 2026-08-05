import { expect, APIRequestContext } from '@playwright/test';

export class APIUtils {

    apiContext: APIRequestContext;
    loginPayload: any;

    constructor(apiContext: APIRequestContext, loginPayload: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;

        console.log(token);

        return token;
    }

   async createOrder(orderPayload: any) {

    const token = await this.getToken();

    const response = {
        token,
        orderId: ""
    };

    const orderResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }
    );

    expect(orderResponse.ok()).toBeTruthy();

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);

    response.orderId = orderResponseJson.orders[0];

    return response;
}
}