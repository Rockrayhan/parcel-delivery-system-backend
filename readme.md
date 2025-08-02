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
