import { useState } from "react";
import { Heart, Sprout, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="bg-warm-gray font-inter text-text-soft min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lavender/20">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lavender to-sage rounded-full flex items-center justify-center">
                <Sprout className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-semibold text-text-soft">Psylen</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="animate-fade-in space-y-8">
          
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-peach to-soft-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-white" size={32} />
            </div>
            
            <h2 className="text-3xl font-bold text-text-soft leading-tight">
              Take a moment to breathe
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed px-4">
              When life feels overwhelming, you deserve a peaceful space to reset your mind and heart.
            </p>
          </div>

          {/* Purpose Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-lavender/10 animate-slide-up">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-lavender/30 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="text-sage" size={20} />
              </div>
              
              <h3 className="text-xl font-semibold text-text-soft">
                You're not alone
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Whether you're feeling anxious, stressed, or down, Psylen offers gentle activities to help you find calm and clarity in difficult moments.
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-soft text-center mb-6">
              What's waiting for you:
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-lavender/20 to-sage/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-peach rounded-full flex items-center justify-center">
                  <span className="text-sage text-lg">✏️</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-soft">Creative Expression</h4>
                  <p className="text-sm text-gray-600">Draw your feelings away</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-peach/20 to-soft-blue/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-soft-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📝</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-soft">Journal Space</h4>
                  <p className="text-sm text-gray-600">Write out your thoughts</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-soft-blue/20 to-sage/20 rounded-xl p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🧘</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-soft">Mindful Moments</h4>
                  <p className="text-sm text-gray-600">Ground yourself in the present</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 pt-4">
            <p className="text-gray-600 text-sm px-4">
              Take as long as you need. This is your space.
            </p>
            
            <Link href="/activities">
              <Button className="bg-gradient-to-r from-sage to-soft-blue hover:shadow-lg text-white py-4 px-8 rounded-xl font-medium transition-all duration-300 text-lg w-full max-w-xs mx-auto flex items-center justify-center space-x-2">
                <span>Enter Your Space</span>
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          {/* Gentle Reminder */}
          <div className="text-center pt-6 pb-8">
            <p className="text-xs text-gray-500 italic px-6">
              "Healing is not a destination, but a gentle journey back to yourself."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}