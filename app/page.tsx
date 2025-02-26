import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {FiArrowRight, FiCheckCircle} from 'react-icons/fi';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'SaaSApp - Your Complete Business Solution',
    description: 'A modern SaaS application that helps you grow your business',
};

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b border-secondary-100">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary-600">SaaSApp</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#features" className="text-secondary-600 hover:text-primary-600">
                            Features
                        </a>
                        <a href="#pricing" className="text-secondary-600 hover:text-primary-600">
                            Pricing
                        </a>
                        <a href="#testimonials" className="text-secondary-600 hover:text-primary-600">
                            Testimonials
                        </a>
                        <Link href="/login" className="text-secondary-600 hover:text-primary-600">
                            Log In
                        </Link>
                    </nav>
                    <Link href="/signup" className="hidden md:block">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary-50 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="md:flex md:items-center md:space-x-12">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 leading-tight">
                                    Streamline Your Business with Our SaaS Solution
                                </h1>
                                <p className="mt-4 text-xl text-secondary-600">
                                    All-in-one platform to manage your business operations, analyze performance, and
                                    drive growth.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <Link href="/signup">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Start Free Trial <FiArrowRight className="ml-2"/>
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                            Live Demo
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                    <div className="p-1 bg-primary-600"></div>
                                    <img
                                        src="/api/placeholder/800/500"
                                        alt="SaaSApp Dashboard"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900">Powerful Features</h2>
                            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
                                Everything you need to run your business efficiently in one place
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Intuitive Dashboard',
                                    description: 'Get a comprehensive overview of your business performance at a glance.',
                                    icon: '📊',
                                },
                                {
                                    title: 'Detailed Analytics',
                                    description: 'Dive deep into your data with powerful reporting and visualization tools.',
                                    icon: '📈',
                                },
                                {
                                    title: 'User Management',
                                    description: 'Easily manage team members and their access levels within your organization.',
                                    icon: '👥',
                                },
                                {
                                    title: 'Flexible Billing',
                                    description: 'Choose from multiple subscription plans that fit your business needs.',
                                    icon: '💰',
                                },
                                {
                                    title: 'Secure Platform',
                                    description: 'Enterprise-grade security to keep your business data safe and protected.',
                                    icon: '🔒',
                                },
                                {
                                    title: 'Priority Support',
                                    description: 'Get help when you need it with our responsive customer support team.',
                                    icon: '🛠️',
                                },
                            ].map((feature, index) => (
                                <div key={index}
                                     className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-secondary-900">{feature.title}</h3>
                                    <p className="mt-2 text-secondary-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-16 bg-secondary-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900">Simple, Transparent Pricing</h2>
                            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
                                Choose the plan that works best for your business
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    name: 'Basic',
                                    price: '$9.99',
                                    description: 'Essential features for individuals and small teams',
                                    features: [
                                        '5 projects',
                                        '10 GB storage',
                                        'Basic analytics',
                                        'Email support',
                                    ],
                                    isPopular: false,
                                },
                                {
                                    name: 'Pro',
                                    price: '$29.99',
                                    description: 'Advanced features for growing businesses',
                                    features: [
                                        '15 projects',
                                        '50 GB storage',
                                        'Advanced analytics',
                                        'Priority support',
                                        'Team collaboration',
                                    ],
                                    isPopular: true,
                                },
                                {
                                    name: 'Enterprise',
                                    price: '$99.99',
                                    description: 'Complete solution for large organizations',
                                    features: [
                                        'Unlimited projects',
                                        '500 GB storage',
                                        'Custom analytics',
                                        '24/7 dedicated support',
                                        'Advanced security',
                                        'API access',
                                        'Custom integrations',
                                    ],
                                    isPopular: false,
                                },
                            ].map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${
                                        plan.isPopular ? 'border-2 border-primary-500 shadow-lg' : ''
                                    }`}
                                >
                                    {plan.isPopular && (
                                        <div className="bg-primary-500 text-white text-center py-1 text-sm font-medium">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="p-6 flex-grow">
                                        <h3 className="text-xl font-bold text-secondary-900">{plan.name}</h3>
                                        <div className="mt-4">
                                            <span className="text-3xl font-bold">{plan.price}</span>
                                            <span className="text-secondary-500">/month</span>
                                        </div>
                                        <p className="mt-2 text-secondary-600">{plan.description}</p>

                                        <ul className="mt-6 space-y-3">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start">
                                                    <FiCheckCircle
                                                        className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5"/>
                                                    <span className="text-secondary-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 border-t border-secondary-100">
                                        <Link href="/signup" className="w-full block">
                                            <Button
                                                variant={plan.isPopular ? 'primary' : 'outline'}
                                                className="w-full"
                                            >
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-secondary-900">What Our Customers Say</h2>
                            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
                                Join thousands of satisfied users who trust SaaSApp
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "SaaSApp has transformed how we manage our business. The analytics features alone have helped us increase revenue by 23% in just three months.",
                                    author: "Sarah Johnson",
                                    position: "CEO, TechStart Inc.",
                                    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
                                },
                                {
                                    quote: "The user-friendly interface makes it easy for our entire team to stay on the same page. We've seen a dramatic improvement in our workflow efficiency.",
                                    author: "Michael Rodriguez",
                                    position: "COO, GrowFast Solutions",
                                    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
                                },
                                {
                                    quote: "Customer support is exceptional. Any time we've had questions, the team responds quickly and effectively. I can't imagine running our business without SaaSApp now.",
                                    author: "Emily Chen",
                                    position: "Director of Operations, NexGen",
                                    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
                                },
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-center mb-4">
                                        <svg className="text-yellow-400 h-5 w-5" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <svg className="text-yellow-400 h-5 w-5" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <svg className="text-yellow-400 h-5 w-5" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <svg className="text-yellow-400 h-5 w-5" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <svg className="text-yellow-400 h-5 w-5" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-secondary-600 italic mb-4">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="h-10 w-10 rounded-full object-cover mr-3"
                                        />
                                        <div>
                                            <p className="font-medium text-secondary-900">{testimonial.author}</p>
                                            <p className="text-sm text-secondary-500">{testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary-600 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-white">Ready to streamline your business?</h2>
                        <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
                            Join thousands of companies that use SaaSApp to increase productivity and drive growth.
                        </p>
                        <div className="mt-8">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-white text-primary-600 hover:bg-primary-50"
                                >
                                    Start Your Free Trial
                                </Button>
                            </Link>
                            <p className="mt-4 text-primary-100">No credit card required. 14-day free trial.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-secondary-900 text-secondary-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">SaaSApp</h3>
                            <p className="mb-4">
                                Your complete business solution for growth and efficiency.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-secondary-300 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-secondary-300 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-secondary-300 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Integrations</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
                        <p>&copy; {new Date().getFullYear()} SaaSApp. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}