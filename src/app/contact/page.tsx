import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            Get In Touch
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Have a question about a course, need help with your account, or
            want to partner with us? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}