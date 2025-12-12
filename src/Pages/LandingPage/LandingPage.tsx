import React from 'react';
import { Calendar, Bell, BookOpen, CheckCircle2, ArrowRight, Users, Clock, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 lg:px-6 py-4 lg:py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
          </div>
          <span className="text-lg lg:text-xl text-gray-900">DeadlineTracker</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl text-gray-900 mb-4 lg:mb-6">
            Track All Your Deadlines in One Place
          </h1>
          <p className="text-base lg:text-xl text-gray-600 mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
            Stay organized, never miss a deadline, and manage your university coursework with ease. 
            Built by students, for students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4 mb-12 lg:mb-16 px-4">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-3.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
            >
              Log In
            </button>
          </div>
          
          {/* Dashboard Preview */}
          <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnR8ZW58MXx8fHwxNzY1NTI2ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dashboard preview"
              className="w-full h-48 lg:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-4xl text-gray-900 text-center mb-3 lg:mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-base lg:text-xl text-gray-600 text-center mb-10 lg:mb-16 max-w-2xl mx-auto px-4">
            Powerful features designed to help you manage your academic life effortlessly
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <Target className="w-6 lg:w-7 h-6 lg:h-7 text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Dashboard Overview</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Get a clear view of all your upcoming deadlines, overdue tasks, and weekly schedule at a glance. 
                Stay on top of everything that matters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <Bell className="w-6 lg:w-7 h-6 lg:h-7 text-green-600" />
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Smart Reminders</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Never miss a deadline with customizable email reminders. Get notified at the right time, 
                so you're always prepared.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <BookOpen className="w-6 lg:w-7 h-6 lg:h-7 text-purple-600" />
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Course Organizer</h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Organize all your courses in one place. Track assignments, exams, and projects by course 
                with color-coded labels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-4xl text-gray-900 text-center mb-10 lg:mb-16">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-14 lg:w-16 h-14 lg:h-16 bg-blue-600 text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl lg:text-2xl">1</span>
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Create Your Courses</h3>
              <p className="text-sm lg:text-base text-gray-600 px-4">
                Add all your university courses with instructor names and semester information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 lg:w-16 h-14 lg:h-16 bg-blue-600 text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl lg:text-2xl">2</span>
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Add Your Deadlines</h3>
              <p className="text-sm lg:text-base text-gray-600 px-4">
                Input assignments, quizzes, exams, and projects with due dates and priorities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 lg:w-16 h-14 lg:h-16 bg-blue-600 text-white rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl lg:text-2xl">3</span>
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 lg:mb-3">Stay Organized</h3>
              <p className="text-sm lg:text-base text-gray-600 px-4">
                View your schedule on the calendar, get reminders, and check off completed tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 lg:px-6 py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-4xl text-gray-900 text-center mb-10 lg:mb-16">
            What Students Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg lg:text-xl">★</span>
                ))}
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">
                "This app completely changed how I manage my coursework. I haven't missed a deadline since I started using it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 lg:w-6 h-5 lg:h-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-sm lg:text-base text-gray-900">Sarah Johnson</div>
                  <div className="text-xs lg:text-sm text-gray-500">Computer Science Major</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg lg:text-xl">★</span>
                ))}
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">
                "Simple, clean, and exactly what I needed. The calendar view helps me plan my study schedule perfectly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 lg:w-6 h-5 lg:h-6 text-green-700" />
                </div>
                <div>
                  <div className="text-sm lg:text-base text-gray-900">Michael Chen</div>
                  <div className="text-xs lg:text-sm text-gray-500">Engineering Student</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg lg:text-xl">★</span>
                ))}
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">
                "Love the priority system! I can quickly see which tasks need my attention first. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 lg:w-6 h-5 lg:h-6 text-purple-700" />
                </div>
                <div>
                  <div className="text-sm lg:text-base text-gray-900">Emma Davis</div>
                  <div className="text-xs lg:text-sm text-gray-500">Business Major</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <div className="w-7 lg:w-8 h-7 lg:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 lg:w-5 h-4 lg:h-5 text-white" />
                </div>
                <span className="text-base lg:text-lg">DeadlineTracker</span>
              </div>
              <p className="text-gray-400 text-xs lg:text-sm">
                Helping students stay organized and succeed academically.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm lg:text-base mb-3 lg:mb-4">Product</h4>
              <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm lg:text-base mb-3 lg:mb-4">Company</h4>
              <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm lg:text-base mb-3 lg:mb-4">Support</h4>
              <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 lg:pt-8 text-center text-xs lg:text-sm text-gray-400">
            © 2024 DeadlineTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}