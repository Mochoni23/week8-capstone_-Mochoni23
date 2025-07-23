# Project Structure

```
week8-capstone_-Mochoni23/
├── backend/
│   ├── Controllers/
│   │   ├── UserController.js
│   │   ├── ProductController.js
│   │   ├── orderCartController.js
│   │   └── authController.js
│   ├── Models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── Routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   └── orderCartRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── add-products.js
│   ├── create-admin.js
│   ├── seed-products.js
│   ├── server.js
│   ├── test-auth-flow.js
│   ├── test-frontend-flow.js
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── 6kg-ola-gas.png
│   │   │   ├── 6kg-pro-gas.png
│   │   │   ├── 6kg-total.jpg
│   │   │   ├── 6kg-k-gas.png
│   │   │   ├── 6kg-afri-gas.png
│   │   │   ├── 50kg-pro-gas.png
│   │   │   ├── 50kg-total.png
│   │   │   ├── 45kg-afri-gas.png
│   │   │   ├── 50kg-k-gas.png
│   │   │   ├── 13kg-total.png
│   │   │   ├── 13kg-pro-gas.png
│   │   │   ├── 13kg-k-gas.png
│   │   │   ├── 13kg-ola-gas.jpg
│   │   │   └── 13kg-afrigas.png
│   │   ├── images.js
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/ (same as public/images)
│   │   │   ├── images.js
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── BrandProductCard.jsx
│   │   │   ├── CartIcon.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   └── Layout/
│   │   │       ├── AppLayout.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── Header.jsx
│   │   │       └── PublicLayout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
├── .gitignore
└── README.md
```

# Mobigas - Gas Cylinder Delivery Management System

A modern React-based frontend for the Mobigas gas cylinder delivery management system, built with React Router, Tailwind CSS, and comprehensive authentication.

## 🚀 Features

- **Authentication System**: Complete login/register functionality with JWT tokens
- **Route Protection**: Public, protected, and admin-only routes
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Product Management**: Browse, search, and filter gas cylinders
- **Admin Dashboard**: User and order management for administrators
- **Modern UI**: Clean, professional interface with smooth animations
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Backend API running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication Flow

### Public Routes
- `/` - Home page (accessible to everyone)
- `/auth` - Login page (redirects if already authenticated)
- `/auth/register` - Registration page (redirects if already authenticated)

### Protected Routes (Require Authentication)
- `/products` - Product listing and shopping
 ### Admin logins
 email:admin@mobigas.com
 password:admin123

### Admin Routes (Require Admin Role)
- `/admin/users` - User management
- `/admin/orders` - Order management

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom components defined in `src/index.css`:

- `.btn-primary` - Primary button styles
- `.btn-secondary` - Secondary button styles
- `.card` - Card component styles
- `.input-field` - Form input styles
- `.text-gradient` - Gradient text effect

### API Configuration
Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🌟 Key Features

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Protected route guards
- Role-based access control

### Product Management
- Product listing with search and filters
- Category-based filtering
- Add to cart functionality
- Stock management

### Admin Features
- User management (view, edit, delete)
- Order management with status updates
- Real-time order tracking
- Customer information display

### User Experience
- Loading states for all async operations
- Toast notifications for user feedback
- Smooth animations and transitions
- Mobile-responsive design

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token validation
- Route protection based on authentication status
- Role-based access control for admin features

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to main branch
   
### View  the Deployment on Vercel 
week8-capstone-mochoni23.vercel.app
### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@mobigas.co.ke
- Phone: +254115479310

---

**Mobigas** - Your trusted gas delivery partner across Kenya. 

