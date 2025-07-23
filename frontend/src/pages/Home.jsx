import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, Star, Flame, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'EPRA Certified',
      description: 'All our gas cylinders are certified by the Energy and Petroleum Regulatory Authority'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery within Nairobi and affordable rates for other locations'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock customer service and emergency gas delivery'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Premium quality gas cylinders from trusted brands across Kenya'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Wanjiku',
      location: 'Nairobi',
      rating: 5,
      comment: 'Excellent service! Fast delivery and genuine gas cylinders. Highly recommended.'
    },
    {
      name: 'John Mwangi',
      location: 'Kiambu',
      rating: 5,
      comment: 'Reliable and affordable. The team is professional and always on time.'
    },
    {
      name: 'Grace Akinyi',
      location: 'Machakos',
      rating: 5,
      comment: 'Best gas delivery service in Kenya. Safe, certified, and convenient.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Mobigas
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Safe & Reliable
                <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  LPG Gas Delivery
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Get certified LPG gas cylinders delivered to your doorstep. 
                Fast, safe, and affordable gas solutions across Kenya.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://www.istockphoto.com/photo/red-cylinders-with-propane-gas-cylinders-with-an-inscription-in-russian-propane-gm1277109882-376409623"
                  alt="LPG Gas Cylinder"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Mobigas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the safest, most reliable, and convenient gas delivery service in Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5000+</div>
              <div className="text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Delivery Locations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-orange-100">EPRA Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Mobigas for their LPG gas needs
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Browse Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
