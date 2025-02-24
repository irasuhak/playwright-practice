import test, { expect } from "@playwright/test";
import { credentials } from "../../test-data/usersData";

test.describe(("Requests to Garage Page"), () => {
    let globalAuthHeader: string;

    test.beforeAll(async ({request}) => {

        const responseAuth = await request.post('api/auth/signin', {
            data: {
                "email": credentials.userOne.email,
                "password": credentials.userOne.password,
                "remember": false
            }
        });
        globalAuthHeader = responseAuth.headers()['set-cookie'].split(';')[0];

        expect(globalAuthHeader).toBeDefined();
    });
   
    test("Add a new car [Ford Focus] - positive case", async ({ request }) => {
        const responseAddCar = await request.post('/api/cars', {
            data:{
                "carBrandId": 3,
                "carModelId": 12,
                "mileage": 122 
            },
            headers: {
                'Cookie': globalAuthHeader
            }
        });

        expect(responseAddCar.status()).toBe(201)
        
        const responseAddCarJson = await responseAddCar.json();
        
        expect(responseAddCarJson.status).toBe('ok');
        expect(responseAddCarJson.data.carBrandId).toBe(3);
        expect(responseAddCarJson.data.carModelId).toBe(12);
        expect(responseAddCarJson.data.mileage).toBe(122);
    });


    test("Add a car without mileage - negative case", async ({ request }) => {
        const responseAddCar = await request.post('/api/cars', {
            data:{
                "carBrandId": 3,
                "carModelId": 12,
            },
            headers: {
                'Cookie': globalAuthHeader
            }
        });

        expect(responseAddCar.status()).toBe(400)
        
        const responseAddCarJson = await responseAddCar.json();
        
        expect(responseAddCarJson.status).toBe('error');
        expect(responseAddCarJson.message).toBe('Mileage is required');
    });


    test("Add a car with not exist carModelId - negative case", async ({ request }) => {
        const responseAddCar = await request.post('/api/cars', {
            data:{
                "carBrandId": 3,
                "carModelId": 95,
                "mileage": 100 
            },
            headers: {
                'Cookie': globalAuthHeader
            }
        });

        expect(responseAddCar.status()).toBe(404)
        
        const responseAddCarJson = await responseAddCar.json();
        
        expect(responseAddCarJson.status).toBe('error');
        expect(responseAddCarJson.message).toBe('Model not found');
    });

    test.afterAll(async({request}) => {
        const responseGetCars = await request.get('/api/cars', {
            headers: {
                'Cookie': globalAuthHeader
            }
        });

        const responseGetCarsJson = await responseGetCars.json();
        const cars = responseGetCarsJson.data;

        for (const car of cars) {
            const responseDeleteCar = await request.delete(`/api/cars/${car.id}`, {
                headers: {
                    'Cookie': globalAuthHeader
                }
            });

            const responseDeleteCarJson = await responseDeleteCar.json();

            expect(responseDeleteCarJson.data.carId).toBe(car.id)
        }
    });
})