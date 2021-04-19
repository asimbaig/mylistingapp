export interface FilterModel {
    Services: {
        Plumber: boolean;
        Electrician: boolean;
        FoodDrink: boolean;
        Transport: boolean;
    };
    Home: {
        Appliances: boolean;
        Tools: boolean;
        Furniture: boolean;
    };
    Jobs: {
        IT: boolean;
        Marketing: boolean;
        Management: boolean;
    }
    Property: {
        Land: boolean;
        Domestic: boolean;
        Commercial: boolean;
    }
}