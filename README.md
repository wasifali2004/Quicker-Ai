# Quicker AI

A powerful AI-powered application built with Next.js that provides intelligent automation and assistance capabilities.

## 🚀 Features

- **AI-Powered Intelligence**: Integrated with OpenAI and Google Generative AI
- **Modern UI/UX**: Built with React 19, Tailwind CSS, and Framer Motion animations
- **User Authentication**: Secure authentication with Clerk
- **File Upload**: PDF processing and file handling with UploadThing
- **Database**: Serverless database integration with Neon
- **Payment Integration**: Stripe payment processing
- **Responsive Design**: Mobile-first responsive design with dark/light theme support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Clerk
- **AI/ML**: OpenAI API, Google Generative AI, LangChain
- **Database**: Neon (PostgreSQL)
- **File Upload**: UploadThing
- **Payments**: Stripe
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wasifali2004/Quicker-Ai.git
   cd Quicker-Ai
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Google AI
   GOOGLE_API_KEY=your_google_api_key

   # Neon Database
   DATABASE_URL=your_neon_database_url

   # UploadThing
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   
   Make sure to add all required environment variables in your Vercel dashboard.

3. **Build Configuration**
   
   The project includes an `.npmrc` file to handle peer dependency conflicts during deployment.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/             # Reusable components
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets
├── styles/                 # Global styles
├── .env.local             # Environment variables (local)
├── .npmrc                 # NPM configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## 🔐 Environment Setup

### Required API Keys:

1. **Clerk**: Sign up at [clerk.com](https://clerk.com)
2. **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com)
3. **Google AI**: Get API key from [Google AI Studio](https://makersuite.google.com)
4. **Neon**: Create database at [neon.tech](https://neon.tech)
5. **UploadThing**: Sign up at [uploadthing.com](https://uploadthing.com)
6. **Stripe**: Get keys from [stripe.com](https://stripe.com)

## 🐛 Troubleshooting

### Common Issues:

1. **Dependency Conflicts**
   - Use `npm install --legacy-peer-deps` instead of `npm install`
   - The `.npmrc` file handles this automatically

2. **Build Errors**
   - Ensure all environment variables are set
   - Check that API keys are valid and have proper permissions

3. **Authentication Issues**
   - Verify Clerk configuration and redirect URLs
   - Check that environment variables match your Clerk dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- OpenAI for powerful AI capabilities
- Clerk for seamless authentication
- All other open-source contributors

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact the maintainers

---

Made with ❤️ using Next.js and AI
