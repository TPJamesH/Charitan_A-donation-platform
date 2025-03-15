# Donor Service Endpoints

<http://localhost:3000/api/charities/>

| **Method** | **Endpoint**                          | **Description**                                 |
|------------|---------------------------------------|-------------------------------------------------|
| **POST**   | `/api/charities`                      | CREATE CHARITY                                  |
| **GET**    | `/api/charities`                      | FETCH ALL CHARITIES                             |
| **GET**    | `/api/charities/:id`                  | FETCH CHARITY                                   |
| **POST**   | `/api/charities/:id`                  | UPDATE CHARITY                                  |
| **DELETE** | `/api/charities/:id`                  | DELETE CHARITY                                  |

## 1. CREATE CHARITY

POST <http://localhost:3000/api/charities/>

- Request body:

```json
{
  "userId": "6780e3268f09518b69a9a678",
  "name": "Not Local Health Foundation Fake",
  "address": [],
  "region": ["North America"],
  "category": "Health",
  "type": "Company",
  "taxCode": "VBKH56734"
}
```

- Response:
  - 201 Created:

  ```json
  {
    "message": "Charity created successfully",
    "charity": {
        "userId": "6780e3268f09518b69a9a678",
        "name": "Not Local Health Foundation Fake",
        "address": [],
        "region": [
            "North America"
        ],
        "category": [
            "Health"
        ],
        "type": "Company",
        "taxCode": "VBKH56734",
        "_id": "678393bfa69e3ab4e4eee741",
        "createdAt": "2025-01-12T10:04:47.488Z",
        "updatedAt": "2025-01-12T10:04:47.488Z",
        "__v": 0
    }
  }

  ```

  - 400 Bad request:

  ``` json
  {
    "error": "User validation failed for userId \"6780e3268f09518b69a9a8\""
  }
  ```

## 2. FETCH ALL CHARITIES

GET <http://localhost:3000/api/charities/>

```json
[
    {
        "name": "Company SA",
        "category": [
            "Food"
        ],
        "type": "Company",
        "region": []
    },
    {
        "name": "Individual USA",
        "category": [
            "Humanitarian"
        ],
        "type": "Person",
        "region": []
    },

    ...
```

## 3. DELETE CHARITY

DELETE <http://localhost:3000/api/charities/:id>

- Request params: 6780e30d8f09518b69a9a5b4

- Response:
  - 200 OK:

  ```json
  {
    "message": "Charity deleted successfully"
  }
  ```

  - 500 Internal Server Error:

  ```json
  {
    "error": "Cast to ObjectId failed for value \"6780e30c8f09518b69a9a5\" (type string) at path \"userId\" for model \"Charity\""
  }
  ```
