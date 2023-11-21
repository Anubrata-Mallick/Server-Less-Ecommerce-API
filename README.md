# Server-Less-Ecommerce-API
An Serverless Ecommerce API Using Node js


## User Functions

#### 🔴 Register User

```https
  POST https://xcbqe1b29q.us.aircode.run/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User Name |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. password |

#### Update User (Only Name)

```https
  POST https://xcbqe1b29q.us.aircode.run/user/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. updated name |
| `Authorization` | `Header` | **Required**. access token of that user |

#### 🔴 Delete User

```https
  POST https://xcbqe1b29q.us.aircode.run/user/delete
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Header` | **Required**. access token of user |

#### 🔴 Login User

```https
  GET https://xcbqe1b29q.us.aircode.run/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |


## Products Functions

#### 🔴 Create Product (only admin)

```https
  POST https://xcbqe1b29q.us.aircode.run/products/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Name of product |
| `category` | `string` | **Required**. Product category |
| `price` | `number` | **Required**. Cost of product |
| `description` | `string` | About the product |
| `inStock` | `boolean` | true/false |
| `color` | `string` | if applicable  |
| `size` | `string` |  if applicable |
| `Authorization` | `Header` | **Required**. access token of admin |


#### 🔴 Read all product

```https
  GET https://xcbqe1b29q.us.aircode.run/products/all
```

#### 🔴 Update Prduct (only admin)

```https
  GET https://xcbqe1b29q.us.aircode.run/products/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. product _id |
| `title` | `string` | **Required**. updated/previous |
| `category` | `string` | **Required**. updated/previous |
| `price` | `number` | **Required**. updated/previous |
| `description` | `string` | **Required**. updated/previous |
| `inStock` | `boolean` | **Required**. updated/previous |
| `color` | `string` | **Required**. updated/previous  |
| `size` | `string` |  **Required**. updated/previous |
| `Authorization` | `Header` | **Required**. access token of admin |

#### 🔴 Delete User (only admin)

```https
  GET https://xcbqe1b29q.us.aircode.run/products/delete
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. User _id |
| `Authorization` | `Header` | **Required**. access token of admin |



