import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "The best place to buy tech gadgets. Their customer service is outstanding, and the products always arrive on time and in perfect condition.",
    author: "Sarah Johnson",
    role: "Tech Enthusiast",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    content: "I've been a GadgetGrid customer for years. Their curated selection of premium electronics saves me so much time when I'm looking for upgrades.",
    author: "Michael Chen",
    role: "Software Developer",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: 3,
    content: "Incredible attention to detail in packaging and product quality. The prices are competitive, and the warranty process is completely hassle-free.",
    author: "Emma Williams",
    role: "Digital Creator",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=emma"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-500">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
