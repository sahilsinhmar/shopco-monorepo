# Admin Screens

In this branch, I have added admin screens which include a home screen and a create product screen. The admin can add products with images, and the images and product details are stored in the backend using a REST API.

## Adding a Product

To add a new product, follow these steps:

1. Click on the plus icon on the home screen, which will take you to the create product screen.
2. Add all the product information, including the name, description, price, category , type , sizes and colors.
3. All the information is required to add the product so fill all the information.
4. Add images (up to 3 images) by selecting them from your device.

The backend uses Cloudinary to store the images and generate URLs for them. The product details and image URLs are then stored in a MongoDB database.

## Viewing Products

Once you add a product, you will be redirected to the admin home screen, where you will see the updated list of products. I'm using TanStack Query for fetching the products from the backend, so the list will automatically update with the new product.

## Using the Admin Screens

To use the admin screens, follow these steps:

1. Clone this repository and install the dependencies using `yarn install` or `npm install`.
2. Start the backend server by running `yarn workspace @shopco/server start` .
3. Start the Expo client by running `yarn workspace @shopco/mobile-expo start`.
4. Open the Expo client on your mobile device or web browser and navigate to the admin home screen.

Note: Also, make sure to run the server and client in separate terminal windows, as they need to run simultaneously for the app to work correctly.

Note: Also change the BASE URL in the env file .
