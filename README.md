# EBUDDY PTE. LTD. Technical Test

This monorepo contains both the backend and frontend applications for the technical test.

## Personality & Technical Questions

1. **Based on this URL link https://www.reddit.com/settings (login into Reddit). Without looking at the code base, which part of the settings page is NOT server side component? Please explain how to get your answer.**

   The Reddit settings page (https://www.reddit.com/settings) uses both server-side and client-side components. The server provides the initial HTML and data, like the "Use community themes" setting's current state. However, the real-time UI feedback—such as the toggle switching instantly when you change this setting—is not server-side. It's handled client-side by JavaScript for immediate responsiveness, before the server saves the change.

2. **What are the most difficult technical problems in your work experience you have encountered and how do you fix them?**

   - One of the most challenging technical problems I encountered was implementing JWT authentication with refresh tokens in a Next.js application with Express backend. Users were getting logged out unexpectedly when multiple tabs tried to refresh tokens simultaneously, causing a race condition where one token invalidated another.

   - To solve this issue, I implemented a token rotation strategy:
     1. When refreshing a token, the system issued a new refresh token and invalidated the old one only after ensuring the new token was safely stored
     2. Added retry logic in the frontend to request a new token only if the previous request failed
     3. With this solution, the unwanted logouts were resolved and the user experience improved significantly

3. **When you're working on a project, how do you typically approach it from start to finish?**

   - When I work on a project, I usually go through these steps:
     1. Understand the requirements – I make sure I know what needs to be built and clarify any uncertainties.
     2. Plan & set up – I break the project into tasks, choose the right tools, and set up the development environment.
     3. Build & develop – I write clean, reusable code, integrate APIs, and manage state properly.
     4. Test & optimize – I check for bugs, improve performance, and make sure everything runs smoothly.
     5. Deploy & monitor – I launch the project, track its performance, and fix any issues that come up.
     6. Maintain & improve – I gather feedback, fix bugs, and make continuous improvements.
   - I like to keep things organized, efficient, and scalable while making sure the process stays smooth and enjoyable.

4. **How do you usually approach learning a new topic to absorb as much as possible?**

   - When learning a new topic, I take a hands-on approach to absorb as much as possible:
     1. Install & Set Up – I start by installing the necessary tools or frameworks to get familiar with them.
     2. Read Technical Articles – I explore resources from platforms like Dail.dev and LinkedIn to understand best practices and real-world use cases.
     3. Hands-on Practice – I experiment with the technology by building small projects or testing features in a sandbox environment.
   - This combination of theory + practice helps me learn efficiently and apply new knowledge quickly.

5. **"Consistency" vs "fast & efficient". Choose one.**

   - I'd go with fast & efficient. Being consistent is great, but if I can achieve the same (or better) results faster and more efficiently, that's a bigger win. Efficiency means working smart, optimizing processes, and adapting quickly—without unnecessary repetition. That said, consistency in quality matters. As long as the results stay reliable, I'd always prioritize speed and efficiency to move forward faster.

6. **Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…**

   - Yes, MacBook.

7. **What is your immediate availability to start this job?**
   - 2 weeks.

## Information

- The answer to technical question number 4 can be found in the `getUsersSortedPaginated` function in `userCollection.ts`.
- Use Turborepo to efficiently manage and run the monorepo.

## Structure

- `apps/backend-repo`: Express.js backend with Firebase
- `apps/frontend-repo`: Next.js frontend with React MUI
- `packages/shared`: Shared logic and entities

## Running the Application

### Dummy User Login

To test the login functionality, you can use the following dummy user credentials:

- **Email:** kenny@gmail.com
- **Password:** kenny123

### Installing Dependencies

1. Run the following command in the root directory of the monorepo to install all dependencies:

   ```bash
   npm run install:all
   ```

### Running Backend and Frontend

1. Run the following command in the root directory of the monorepo to start the backend emulator and the frontend development server simultaneously:

   ```bash
   npm run start:all
   ```

## API Documentation

### Login

- **Endpoint:** `POST /login`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "customToken": "your-custom-token"
      }
    }
    ```
  - **Error (401):**
    ```json
    {
      "success": false,
      "message": "Login failed, check email/password",
      "error": "Detailed error message"
    }
    ```

### Fetch User Data

- **Endpoint:** `GET /fetch-user-data`
- **Headers:**
  - `Authorization: Bearer <your-token>`
- **Query Parameters:**
  - `lastDoc` (optional): JSON string of the last document for pagination
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "Users fetched successfully",
      "data": {
        "users": [...],
        "lastDoc": {...},
        "hasMore": true
      }
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "message": "Error fetching user data",
      "error": "Detailed error message"
    }
    ```

### Update User Data

- **Endpoint:** `PUT /user`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <your-token>`
- **Request Body:**
  ```json
  {
    "id": "user-id",
    "name": "User Name",
    "totalAverageWeightRatings": 4.5,
    "numberOfRents": 10,
    "recentlyActive": 1
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "User data updated successfully"
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "message": "Error updating user data",
      "error": "Detailed error message"
    }
    ```

### Generate and Save Random Users

- **Endpoint:** `POST /generate-user-data`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <your-token>`
- **Request Body:**
  ```json
  {
    "count": 10
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "success": true,
      "message": "10 random users created successfully",
      "data": [...]
    }
    ```
  - **Error (500):**
    ```json
    {
      "success": false,
      "message": "Failed to create random users",
      "error": "Detailed error message"
    }
    ```

## Screenshot

<img width="1440" alt="411356538-759f31f9-c859-4a93-bd30-bcc94efc8267" src="https://github.com/user-attachments/assets/d5923931-7e43-479a-a748-73a960f53e5f" />
<img width="1440" alt="411356518-8b488462-91f4-439e-841a-4cf5d10a02a8" src="https://github.com/user-attachments/assets/f49fe42e-5858-4496-8a2f-3a0272f5eff3" />
<img width="1552" alt="411356525-d00c2a9f-7d32-442f-b740-cf569eca7da0" src="https://github.com/user-attachments/assets/9c8307c0-9f6f-46db-a56c-e31949028285" />
<img width="1552" alt="411356530-bc0a4476-682d-44a0-930d-da2e252bd578" src="https://github.com/user-attachments/assets/5d861957-9791-4253-87bf-f566cf1d4d81" />
<img width="1552" alt="411356533-da4ba1db-177f-4482-803b-9a65dee3e424" src="https://github.com/user-attachments/assets/fe631744-4d03-4745-88b6-6c4986ff9f52" />
<img width="1552" alt="411356535-5e63deac-c6a6-4353-a972-4c94dd72067b" src="https://github.com/user-attachments/assets/0ae1ff2e-210a-403f-a87a-85b823d7afde" />
<img width="1552" alt="411356536-e89303d9-b79a-4f08-8f1b-521acf67221c" src="https://github.com/user-attachments/assets/68a71df8-6e88-4730-9dd7-ec5c9c5fb6f4" />
