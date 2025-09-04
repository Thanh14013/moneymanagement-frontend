# 💰 Money Management Frontend

A comprehensive personal finance management application built with React.js that helps users track income, expenses, and analyze their spending patterns through interactive dashboards and detailed reports.

## 🌟 Features

### 📊 Dashboard & Analytics
- **Financial Overview**: Real-time display of total balance, income, and expenses
- **Interactive Charts**: Pie charts and line graphs using Recharts library
- **Recent Transactions**: Quick view of latest financial activities
- **Category-wise Analysis**: Visual breakdown of spending by categories

### 💵 Income Management
- **Add Income**: Record income from various sources with custom categories
- **Income Tracking**: Detailed list of all income transactions
- **Visual Analytics**: Income trends over time with interactive charts
- **Category Classification**: Organize income by custom categories with emoji icons

### 💸 Expense Management
- **Expense Recording**: Track all expenditures with detailed categorization
- **Expense Overview**: Comprehensive view of spending patterns
- **Delete Functionality**: Remove unwanted expense entries
- **Smart Categorization**: Organize expenses by custom categories

### 🏷️ Category Management
- **Custom Categories**: Create personalized income and expense categories
- **Emoji Icons**: Visual representation with emoji picker integration
- **Edit & Update**: Modify existing categories as needed
- **Type-based Organization**: Separate categories for income and expenses

### 🔍 Advanced Filtering & Search
- **Multi-criteria Filtering**: Filter by type, date range, amount, and keywords
- **Sorting Options**: Sort by date, amount, or category
- **Search Functionality**: Find specific transactions quickly
- **Date Range Selection**: Filter transactions within specific time periods

### 🔐 User Authentication
- **Secure Login**: User authentication with JWT tokens
- **User Registration**: New user signup functionality
- **Profile Management**: User profile with photo upload support
- **Session Management**: Persistent login state with local storage

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all device sizes
- **Modern UI**: Clean and intuitive interface using TailwindCSS
- **Interactive Components**: Smooth animations and hover effects
- **DaisyUI Integration**: Enhanced UI components and themes

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **React 19.1.1**: Latest React with hooks and modern features
- **React Router DOM 7.8.2**: Client-side routing and navigation
- **Vite 7.1.2**: Fast build tool and development server

### Styling & UI
- **TailwindCSS 4.1.12**: Utility-first CSS framework
- **DaisyUI 5.1.3**: Component library built on TailwindCSS
- **Lucide React 0.542.0**: Beautiful and consistent icons

### Data Visualization
- **Recharts 3.1.2**: Powerful charting library for React
- **Custom Chart Components**: Pie charts, line graphs, and bar charts

### HTTP Client & API Integration
- **Axios 1.11.0**: Promise-based HTTP client for API calls
- **RESTful API Integration**: Backend communication with proper error handling

### User Experience
- **React Hot Toast 2.6.0**: Elegant toast notifications
- **Emoji Picker React 4.13.2**: Interactive emoji selection
- **Moment.js 2.30.1**: Date and time manipulation

### Development Tools
- **ESLint 9.33.0**: Code linting and quality assurance
- **TypeScript Support**: Type definitions for enhanced development

### Cloud Services
- **Cloudinary**: Image upload and management for profile photos

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thanh14013/moneymanagement-frontend.git
   cd moneymanagement-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Ensure the backend API is running on `http://localhost:8080`
   - Configure Cloudinary settings if using image upload features

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.jsx    # Main dashboard layout
│   ├── FinanceOverview.jsx
│   ├── CustomPieChart.jsx
│   ├── AddIncomeForm.jsx
│   ├── AddExpenseForm.jsx
│   ├── CategoryList.jsx
│   └── ...
├── pages/              # Main application pages
│   ├── Home.jsx        # Dashboard page
│   ├── Income.jsx      # Income management
│   ├── Expense.jsx     # Expense management
│   ├── Category.jsx    # Category management
│   ├── Filter.jsx      # Advanced filtering
│   ├── Login.jsx       # Authentication
│   └── Signup.jsx
├── context/            # React context for state management
│   └── AppContext.jsx
├── hook/               # Custom React hooks
│   └── useUser.jsx
├── util/               # Utility functions and configurations
│   ├── apiEndpoint.js  # API endpoints configuration
│   ├── AxiosConfig.js  # Axios configuration
│   └── util.js         # Helper functions
└── assets/             # Static assets and images
```

## 🔗 API Integration

The application integrates with a RESTful backend API providing endpoints for:

- **Authentication**: `/api/v1.0/login`, `/api/v1.0/register`
- **Dashboard**: `/api/v1.0/dashboard` - Overview statistics
- **Income Management**: `/api/v1.0/incomes` - CRUD operations
- **Expense Management**: `/api/v1.0/expenses` - CRUD operations
- **Categories**: `/api/v1.0/categories` - Category management
- **Filtering**: `/api/v1.0/filter` - Advanced filtering and search

## 💡 Key Features Implementation

### Smart Dashboard
- Real-time financial calculations
- Interactive data visualization
- Recent transaction previews
- Quick navigation to detailed views

### Category System
- Custom emoji icons for visual identification
- Type-based categorization (income/expense)
- Easy creation and modification
- Category-wise spending analysis

### Advanced Filtering
- Multi-parameter search capabilities
- Date range filtering
- Sorting by multiple criteria
- Real-time search results

### Responsive Design
- Mobile-optimized interface
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Fast loading and smooth animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nguyễn Vũ Thành**
- Email: thanh14704@gmail.com
- GitHub: [@Thanh14013](https://github.com/Thanh14013)

---

⭐ If you found this project helpful, please give it a star on GitHub!
