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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-foreground mb-2">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm tracking-wide">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center text-center">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 mx-0.5 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-200 dark:text-gray-700"}`}
                  />
                ))}
              </div>
              <p className="text-foreground leading-relaxed flex-grow mb-8 text-sm">
                "{testimonial.content}"
              </p>
              <div className="flex flex-col items-center mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mb-3 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1">{testimonial.author}</h4>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
