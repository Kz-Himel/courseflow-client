import { FiTarget, FiTrendingUp } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

const values = [
  {
    icon: FiTarget,
    title: "Our Mission",
    description:
      "To break down barriers to education by offering affordable, high-quality courses taught by real industry experts.",
  },
  {
    icon: FaRegHeart,
    title: "Our Values",
    description:
      "We believe in honest teaching, practical skills, and building a community where every learner feels supported.",
  },
  {
    icon: FiTrendingUp,
    title: "Our Vision",
    description:
      "A world where anyone, regardless of background, can learn the skills they need to build the career they want.",
  },
];

export default function MissionValues() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
      {values.map((value) => {
        const Icon = value.icon;
        return (
          <div
            key={value.title}
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {value.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}