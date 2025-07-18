import { testimonialsData } from "./Testimonialdata"

const Testimonials = () => {
    return (
        <section className="py-12 bg-gradient-to-br from-zinc-900 via-amber-900 to-yellow-900">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-amber-300 mb-10 drop-shadow">
                    What Our Users Say
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-zinc-800/80 rounded-xl shadow-xl p-6 flex flex-col items-center text-center border border-yellow-700 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-500 shadow-md"
                            />
                            <p className="text-yellow-100 mb-4 italic">"&nbsp;{testimonial.content}&nbsp;"</p>
                            <div>
                                <h3 className="font-bold text-lg text-amber-200">{testimonial.name}</h3>
                                <span className="text-sm text-yellow-500">{testimonial.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
