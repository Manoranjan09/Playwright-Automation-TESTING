import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    email: string;
    password: string;
    productName: string;
}

export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: {
        email: "kashyapking507@gmail.com",
        password: "Mano123@",
        productName: "ZARA COAT 3",
    },
});