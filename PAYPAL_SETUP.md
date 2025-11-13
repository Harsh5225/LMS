# PayPal Setup

This document provides instructions on how to set up PayPal for handling payments in the Learning Management System.

## 1. Create a PayPal Developer Account

First, you will need a PayPal Developer account to get the necessary API credentials. If you don't have one already, you can create one by following these steps:

1.  Go to the [PayPal Developer website](https://developer.paypal.com/).
2.  Click on "Log in to Dashboard" and either log in with your existing PayPal account or create a new one.

## 2. Create a REST API App

Once you have a developer account, you need to create a new REST API application to get your credentials:

1.  Navigate to the **My Apps & Credentials** section in your developer dashboard.
2.  Under the **REST API apps** section, click **Create App**.
3.  Give your application a name (e.g., "LMS Platform") and click **Create App**.

## 3. Get Your API Credentials

After creating the app, you will be taken to a page with your API credentials. You will need the **Client ID** and the **Secret**.

*   **Client ID:** Your public identifier for the app.
*   **Secret:** A private key that should be kept confidential. Do not expose this on the client-side.

## 4. Set Up Environment Variables

Next, you need to add your PayPal API credentials to the environment variables in your server-side code. Create a `.env` file in the `server` directory if you haven't already, and add the following variables:

```
PAYPAL_CLIENT_ID=<Your_PayPal_Client_ID>
PAYPAL_CLIENT_SECRET=<Your_PayPal_Secret>
```

Replace `<Your_PayPal_Client_ID>` and `<Your_PayPal_Secret>` with the credentials you obtained from the PayPal Developer dashboard.

## 5. How It Works

*   **Order Creation:** When a user decides to purchase a course, the client-side makes a request to the `/api/v1/purchase/paypal/create-order` endpoint on your server. The server then uses the PayPal SDK to create an order with the course details and returns an order ID to the client.

*   **Payment Approval:** The client-side uses the PayPal JavaScript SDK to render the PayPal payment buttons. When the user approves the payment, the PayPal SDK captures the order.

*   **Payment Verification:** After the user completes the payment, they are redirected to a verification page. The client-side sends the `orderID` to the `/api/v1/purchase/paypal/verify-payment` endpoint on your server. The server then verifies the payment with PayPal and, if successful, updates the database to grant the user access to the course.

By following these steps, you will have successfully configured PayPal for your Learning Management System, enabling you to securely process payments for your courses.
