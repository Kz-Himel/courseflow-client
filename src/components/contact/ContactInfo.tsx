import { IoMailUnreadOutline } from "react-icons/io5";
import { FaPhone, FaRegClock } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
const info = [
  {
    icon: IoMailUnreadOutline,
    title: "Email Us",
    detail: "support@courseflow.com",
  },
  {
    icon: FaPhone,
    title: "Call Us",
    detail: "+880 1526-449846",
  },
  {
    icon: LuMapPin,
    title: "Visit Us",
    detail: "Dhaka, Bangladesh",
  },
  {
    icon: FaRegClock,
    title: "Working Hours",
    detail: "Sun - Thu, 9AM - 6PM",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {info.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{item.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}