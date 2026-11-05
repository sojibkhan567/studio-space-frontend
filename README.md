# StudioSpace — Creative Studio Booking Platform

**StudioSpace** is a peer-to-peer marketplace for discovering, listing, and booking creative workspaces. It is designed for photographers, filmmakers, podcasters, musicians, artists, and other creators who need professional spaces for their projects.

Studio owners can list their spaces with pricing, amenities, capacity, and location, while creators can explore studios, view complete details, and reserve available time slots.

## 🌐 Live Website

**Live Site:** `https://your-live-site-url.vercel.app`

**Client Repository:** `https://github.com/your-username/studiospace-client`

**Server Repository:** `https://github.com/your-username/studiospace-server`

---

## 🛠️ Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?logo=shadcnui&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)

### Authentication

![Better Auth](https://img.shields.io/badge/Better_Auth-black)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=white)

## ✨ Features

### 🏠 Home Page

- Interactive hero/banner slider with multiple slides.
- Featured studios loaded dynamically from MongoDB.
- Displays top-rated or newest studio spaces.
- Browse studios by category.
- "How Booking Works" 4-step workflow.
- Host guarantee and creator support section.
- Responsive design for mobile, tablet, and desktop.

### 🔎 Explore Studios

- Browse all available creative workspaces.
- Studio cards display:
  - Studio image
  - Title
  - Category
  - Hourly rate
  - Rating
  - Location
- View complete studio details.
- Filter studios by category.
- Responsive grid layout.

### 🏢 Studio Management

Authenticated users can create and manage their own studio listings.

Studio owners can add:

- Studio title
- Category
- Hourly rate
- Security deposit
- Maximum capacity
- Location/address
- Image
- Amenities
- Detailed studio overview

Users can:

- Add new studios
- View their own listings
- Edit existing studios
- Delete their listings
- Manage studio information from a private dashboard

### 📸 Studio Details

Each studio has a dedicated details page containing:

- Full studio information
- Image/gallery section
- Category
- Pricing
- Capacity
- Location
- Amenities
- Host information
- Reviews
- Booking option

### 📅 Booking System

- Users can book available studio spaces.
- Booking information is stored in MongoDB.
- New reservations initially receive a **Pending** status.
- Booking statuses include:
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- Users can view their bookings from **My Bookings**.
- Pending bookings can be cancelled.
- Booking availability is checked before creating reservations.

### ❤️ Saved Studios / Wishlist

- Logged-in users can save favorite studios.
- Heart icon allows users to add or remove studios from their wishlist.
- Saved studios are stored in MongoDB.
- Users can easily access their favorite creative spaces.

### 🔐 Authentication & Authorization

- User registration and login.
- Email/password authentication.
- Google authentication.
- Protected private routes.
- User profile/avatar support.
- Authenticated users get access to:
  - Dashboard
  - Add New Studio
  - My Studio Listings
  - My Bookings
  - Saved Studios
- Unauthorized users cannot access protected actions.

### 👤 User Registration

Registration includes:

- Name
- Email
- Photo URL
- Password

Password validation requires:

- At least one uppercase letter
- At least one lowercase letter
- Minimum 6 characters

### 🔑 Secure API

- JWT-based authentication.
- Protected server-side mutations.
- HTTPOnly cookie-based authentication.
- Unauthorized API requests return `401 Unauthorized`.
- Studio ownership is verified before protected update/delete operations.

### 🛡️ Double Booking Prevention

The booking system checks existing confirmed bookings before creating a new reservation.

If the requested time overlaps with an existing confirmed booking, the system rejects the reservation and displays an appropriate error message.

### 🌓 Dark / Light Theme

- Light mode and dark mode.
- Theme toggle button.
- Theme applies throughout the complete application.
- User can switch between light and dark themes from the interface.

### 🔔 Modern Notifications

The application uses modern toast notifications instead of browser `alert()` messages.

Notifications are provided for:

- Login/register errors
- Successful studio creation
- Studio updates
- Studio deletion
- Booking actions
- Wishlist actions
- API errors

### ⏳ Loading & Empty States

- Branded loading skeletons/spinners.
- Loading states during API requests.
- Friendly empty states when:
  - No studios are found
  - No bookings exist
  - Search/filter returns no results

### 🚫 Custom 404 Page

A custom not-found page is included with:

- Creative studio-themed illustration
- Helpful message
- Return to Home button

---

## 🔐 Security Features

StudioSpace implements authentication and authorization to protect user-specific operations.

Protected operations include:

- Creating a studio
- Updating a studio
- Deleting a studio
- Creating a booking
- Managing personal listings
- Managing personal bookings
- Managing wishlist data

JWT authentication is used to verify authenticated requests, while ownership checks prevent users from modifying studios belonging to other users.

## 📂 Main Application Routes

### Public Routes

| Route           | Description         |
| --------------- | ------------------- |
| `/`             | Home page           |
| `/studios`      | Explore all studios |
| `/studios/[id]` | Studio details      |
| `/login`        | User login          |
| `/register`     | User registration   |
| `/how-it-works` | Booking workflow    |
| `/about`        | About StudioSpace   |

### Private Routes

| Route                | Description            |
| -------------------- | ---------------------- |
| `/add-studio`        | Create a new studio    |
| `/my-listings`       | Manage user's studios  |
| `/studios/edit/[id]` | Update studio          |
| `/bookings`          | Manage user's bookings |
| `/wishlist`          | Saved studios          |

---

## 🗄️ MongoDB Collections

The application uses MongoDB for persistent data storage.

### Studios Collection

Stores:

- Studio information
- Category
- Pricing
- Capacity
- Address
- Images
- Amenities
- Description
- Host information
- Rating/review information

### Bookings Collection

Stores:

- User ID
- Studio ID
- Booking date
- Booking time
- Booking status
- Reservation information

### Users Collection

Stores authenticated user information and profile data.

### Wishlist Collection

Stores saved studios for authenticated users.

---

## 📱 Responsive Design

StudioSpace is designed to work across:

- 📱 Mobile devices
- 📲 Tablets
- 💻 Laptops
- 🖥️ Desktop screens

The interface uses responsive layouts, grids, cards, navigation, forms, and modals to provide a consistent experience across screen sizes.

## 📊 API Examples

### Get All Studios

```http
GET /studios
```

### Get Single Studio

```http
GET /studios/:id
```

### Create Studio

```http
POST /studios
```

### Update Studio

```http
PUT /studios/:id
```

### Delete Studio

```http
DELETE /studios/:id
```

### Create Booking

## 📌 Project Requirements Implemented

- Peer-to-peer creative workspace marketplace
- Studio discovery and filtering
- Dynamic studio listings
- Authentication and authorization
- Google authentication
- Studio CRUD operations
- MongoDB database integration
- Booking management
- Booking status system
- Double-booking prevention
- JWT security
- Wishlist functionality
- Dark/light theme
- Image upload integration
- Toast notifications
- Loading states
- Empty states
- Custom 404 page
- Responsive design
- Modern studio-focused UI

---

## 👨‍💻 Developer

**Md. Sojib Hossain**

Full Stack Developer  
CSE Student

---

## 📜 License

This project was developed for educational and academic purposes.
