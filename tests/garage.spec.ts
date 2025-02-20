import { test} from  "../test-data/fixtures/userPages";

test.describe('Garage Page - Fixture', () => {
    test('Audi TT to the garage', async ({ garagePage }) => {
        await garagePage.addCarByBrandAndModel('Audi', 'TT', '200');
        await garagePage.verifyLastAddedCar('Audi TT');
    });
    
    test('Add Ford Fusion to the garage', async ({ garagePage }) => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fusion', '200');
        await garagePage.verifyLastAddedCar('Ford Fusion');
    });
})