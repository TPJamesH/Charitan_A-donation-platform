# Donor Service Endpoints

<http://localhost:3000/api/donors/>

| **Method** | **Endpoint**                       | **Description**                                 |
|------------|------------------------------------|-------------------------------------------------|
| **POST**   | `/api/donors`                      | CREATE DONOR                                    |
| **GET**    | `/api/donors`                      | FETCH ALL DONORS                                |
| **GET**    | `/api/donors/top-donors-monthly`   | FETCH MONNTLY TOP DONOR                         |
| **GET**    | `/api/donors/:id/email`            | FETCH DONOR EMAIL BY ID                         |
| **GET**    | `/api/donors/:id`                  | FETCH DONOR                                     |
| **POST**   | `/api/donors/:id`                  | UPDATE DONOR                                    |
| **DELETE** | `/api/donors/:id`                  | DELETE DONOR                                    |

## 1. CREATE DONOR

POST <http://localhost:3000/api/donors/>

- Request body:

```json
{
  "userId": "6780e3258f09518b69a9a671",
  "firstName": "John",
  "lastName": "Doe",
  "address": [],
  "region": "North America",
  "subscription": {
    "category": ["Health", "Education"],
    "region": ["North America", "Europe"]
  },
  "donationStat": {
    "totalDonation": 1500,
    "monthlyDonated": 200,
    "projectsDonated": 5
  },
  "stripeId": ""
}
```

- Response:
  - 201 Created:

  ```json
  {
      "message": "Donor created successfully",
      "donor": {
          "userId": "6780e3258f09518b69a9a671",
          "firstName": "John",
          "lastName": "Doe",
          "address": [],
          "region": "North America",
          "subscription": {
              "category": [
                  "Health",
                  "Education"
              ],
              "region": [
                  "North America",
                  "Europe"
              ]
          },
          "donationStat": {
              "totalDonation": 1500,
              "monthlyDonated": 200,
              "projectsDonated": 5
          },
          "stripeId": ""
      }
  }
  ```

  - 400 Bad request:

  ``` json
  {
    "error": "User validation failed for userId \"6780e3258f09518b69a9a6\""
  }
  ```

## 2. FETCH ALL DONORS

GET <http://localhost:3000/api/donors/>

```json
[
    {
        "userId": "6780e30e8f09518b69a9a5c2",
        "firstName": "Alexandra",
        "lastName": "Grady",
        "address": [],
        "subscription": {
            "category": [],
            "region": []
        },
        "donationStat": {
            "totalDonation": 500,
            "monthlyDonated": 20,
            "projectsDonated": 5,
            "_id": "6780e30e8f09518b69a9a5c5"
        }
    },
    {
        "userId": "6780e30f8f09518b69a9a5c9",
        "firstName": "Brielle",
        "lastName": "Hauck",
        "address": [],
        "subscription": {
            "category": [],
            "region": []

    ...
```

## 3. FETCH MONNTLY TOP DONOR

GET <http://localhost:3000/api/donors/top-donors-monthly>

```json
[
    {
        "userId": "67822322bc8d6a62f43fdcfe",
        "avatar": "https://example.com/images/avatar.jpg"
    },
    {
        "userId": "6780e3258f09518b69a9a671",
        "avatar": null
    },
    {
        "userId": "6780e3258f09518b69a9a671",
        "avatar": null
    },
    {
        "userId": "6780e30e8f09518b69a9a5c2",
        "avatar": null
    },
    {
        "userId": "6780e30f8f09518b69a9a5c9",
        "avatar": null
    },
...
```

## 4. FETCH DONOR EMAIL BY ID

GET <http://localhost:3000/api/donors/:id/email>

- Request params: 6780e3258f09518b69a9a671

- Response:
  - 200 OK:

  ```json
  {
      "email": "Kendall.Brown@gmail.com"
  }
  ```

  - 404 Not Found:

  ```json
  {
    "error": "Cast to ObjectId failed for value \"6780e3258f09518b69a9a67\" (type string) at path \"userId\" for model \"Donor\""
  } 
  ```

## 5. DELETE DONOR

DELETE <http://localhost:3000/api/donors/:id>

- Request params: 6780e3258f09518b69a9a671

- Response:
  - 200 OK:

  ```json
  {
    "message": "Donor deleted successfully"
  }
  ```

  - 500 Internal Server Error:

  ```json
  {
    "error": "Cast to ObjectId failed for value \"6780e3258f09518b69a9a\" (type string) at path \"userId\" for model \"Donor\""
  }
  ```
