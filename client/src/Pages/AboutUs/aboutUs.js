import { useState } from "react";

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);

  const journey = [
    {
      phase: "Planning & Strategy",
      description:
        "Week 1: Focused on outlining project goals, sketching wireframes, and designing architecture diagrams to guide development.",
      extra:
        "We carefully identified the key requirements to ensure the project met user needs.",
    },
    {
      phase: "Backend Foundation",
      description:
        "Weeks 2 - 4: Established the backend with robust database structures, set up API endpoints, and ensured data integrity with secure server setup.",
      extra:
        "Our team built a reliable server that seamlessly integrates with our frontend, emphasizing data security and scalability.",
    },
    {
      phase: "Frontend Creation",
      description:
        "Weeks 5 - 7: Developed user interfaces, integrated backend APIs, and fine-tuned for responsiveness to deliver an intuitive user experience.",
      extra:
        "We focused on creating a clean, user-friendly design that adapts to different screen sizes.",
    },
    {
      phase: "Testing & Refinement",
      description:
        "Week 8: Conducted thorough testing, resolved bugs, and polished the final product to ensure a seamless launch.",
      extra:
        "User feedback was pivotal, helping us refine features and ensure a bug-free experience.",
    },
  ];

  const teamMembers = [
    {
      name: "Pumlani Kewana",
      role: "Full-stack Developer",
      image: "/assets/Pumlani.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/pumlani-kewana-58047515b",
        github: "https://github.com/alexj-dev",
      },
    },
    {
      name: "Konanani Nemauluma",
      role: "Full-stack Developer",
      image: "/assets/Konie.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/konanani-charity-nemauluma/",
        github: "https://github.com/Mukoni-Nemauluma",
      },
    },
    {
      name: "Simphiwe Ndlovu",
      role: "Full-stack Developer",
      image: "/assets/Simphiwe.jpg",
      social: {
        linkedin: "https://linkedin.com/in/taylor-swift-dev",
        github: "https://github.com/swifty-dev",
      },
    },
    {
      name: "Mpho",
      role: "Full-stack Developer",
      image: "/assets/Mpho.jpg",
      social: {
        linkedin: "https://linkedin.com/in/jordan-patel",
        github: "https://github.com/jordanp-dev",
      },
    },
    {
      name: "Nonhlanhla Mazibuko",
      role: "Full-stack Developer",
      image: "/assets/Nonhlanhla.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/nonhlanhla-mazibuko-879636214/",
        github: "https://github.com/NonhlanhlaMazibuko",
      },
    },
    {
      name: "Thitevhelwi Masuvhe",
      role: "Full-stack Developer",
      image: "/assets/Thitevhelwi.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/thitevhelwimasuvhe",
        github: "https://github.com/samuelthis",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-800 mb-6">
            About Taskly
          </h1>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto">
            Empowering efficient task management across diverse fields
          </p>
        </header>

        {/* Our Story */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
            Our Story
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6 text-center">
              Taskly was born from our experiences during a rigorous 6-month
              full-stack training program. As we navigated through numerous
              projects and assignments, we realized the fundamental importance
              of effective time management and task tracking. This insight
              inspired us to create a solution that would not only address our
              own challenges but also help others in similar situations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-center">
              Our goal was to develop a user-friendly app that caters to people
              from various fields, enabling them to manage their tasks
              efficiently. We understood the struggle of juggling multiple
              projects and deadlines, so we set out to build a tool that
              simplifies this process.
            </p>
            <p className="text-gray-700 leading-relaxed text-center">
              What sets Taskly apart are its innovative features. Beyond basic
              task management, we've incorporated progress tracking, deadline
              notifications, and even a competitive element. Users can monitor
              their task completion rates, receive timely reminders for upcoming
              deadlines, and engage in friendly competition with other users -
              adding a motivational twist to productivity.
            </p>
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
            Our Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {journey.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                    {step.phase}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                  <p className="text-gray-500 mt-4 text-center">{step.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => setSelectedMember(member)}
              >
                <div className="h-80 overflow-hidden flex justify-center items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {member.role}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-800 hover:text-gray-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Team Member Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-w-16 aspect-h-10 mb-6">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 text-center mb-2">
                {selectedMember.name}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {selectedMember.role}
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                {selectedMember.social.linkedin && (
                  <a
                    href={selectedMember.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {selectedMember.social.github && (
                  <a
                    href={selectedMember.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-gray-700 text-center">
                {selectedMember.name} played a crucial role in bringing Taskly
                to life. Their expertise in {selectedMember.role.toLowerCase()}{" "}
                was instrumental in creating an intuitive and efficient task
                management solution.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
