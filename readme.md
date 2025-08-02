## 📚 Parcel Delivery Management Backend API

A simple backend API for Parcel Management System — built with **Node.js**, **TypeScript**, **Express.js**, and **MongoDB (Mongoose)**.

### Live link: https://parcel-dms-backend.vercel.app/

#### 🛠️ Technologies used: Mongoose, Express js , Node js, jwt token, TypeScript.

#### ✨ Features :

- JWT-based login system with three roles: admin, sender, receiver

- 🚚 Senders can:

* Create parcel delivery requests
* Cancel parcel (if not dispatched)
* View all their parcels and status logs

- Receivers can:

* View incoming parcels
* Confirm parcel delivery
* Delivery history

- Admins can:

* View and manage all users and parcels
* Block or unblock users or parcels
* Change parcel status (e.g., Approved, In Transit, Delivered)


#### ⚙️ How to Set Up Locally

- First you have to install node and github in your machine.
- then git clone the repository or download the zip file
- in root folder go to the terminal, hit - `npm i` then `npm run dev`
- copy `.env.example` to `.env` and in the `.env` file give your credentials.
- access api locally at `http://localhost:5000/api/` in your browser.



#### API Endpoint’s with descriptions

* 🔐 Auth & User Endpoints

- POST /api/user/register
➤ Register a user with a specific role (admin, sender, receiver).

- GET /api/user/
➤ Get a list of all users (admin only).

- PATCH /api/user/block/:id
➤ Block or unblock a user (admin only).

* 📦 Parcel Management Endpoints

* 🔸 Sender Endpoints

- POST /api/parcel/create
➤ Create a new parcel delivery request.

- GET /api/parcel/my-parcels
➤ View all parcels sent by the sender (also used by receivers for their deliveries).

- PATCH /api/parcel/cancel/:id
➤ Cancel a parcel if it has not been dispatched.


* 🔹 Receiver Endpoints
- GET /api/parcel/incoming
➤ View incoming parcels assigned to the receiver.

- PATCH /api/parcel/confirm/:id
➤ Confirm delivery of a parcel.

- GET /api/parcel/track/:trackingId
➤ Track the status history of a parcel (both sender & receiver).



* ⚙️ Admin Endpoints

- GET /api/parcel/
➤ View all parcels in the system.

- PATCH /api/parcel/update/:id
➤ Update parcel details (including status like Approved, In Transit, Delivered).

- DELETE /api/parcel/delete/:id
➤ Delete a parcel from the system.

- PATCH /api/parcel/block/:id
➤ Block a specific parcel (e.g., for suspicious activity).

- PATCH /api/parcel/unblock/:id
➤ Unblock a previously blocked parcel.