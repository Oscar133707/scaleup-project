
import React from 'react';
import { Reveal } from './shared/Reveal';

export const WhyUs: React.FC = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden" id="strategy">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accentSoft rounded-full blur-[120px] pointer-events-none opacity-40" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <Reveal>
                    <div className="relative group pb-0 lg:pb-16">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[3rem] transform rotate-3 group-hover:rotate-2 transition-transform duration-700" />
                        <img
                            src="https://picsum.photos/1000/1200?random=1&grayscale"
                            alt="Team collaboration and strategy discussion"
                            className="relative rounded-[2rem] lg:rounded-[3rem] shadow-2xl transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:opacity-95 w-full"
                        />

                        {/* Testimonial card — inline on mobile, absolute on desktop */}
                        <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-10 p-5 lg:p-8 bg-surface border border-borderSubtle rounded-2xl shadow-2xl lg:max-w-sm">
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-secondary font-medium italic mb-3 leading-relaxed text-sm">"This isn't just a platform, it's our co-pilot. We doubled our revenue in 12 months."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accentSoft border border-accent/20 flex-shrink-0" />
                                <p className="text-primary text-xs font-bold uppercase tracking-widest">Amit C., Lyca Mobile</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div>
                    <Reveal>
                        <h2 className="text-sm font-bold text-accent mb-6 tracking-[0.2em] uppercase">Why Choose Us</h2>
                    </Reveal>

                    <Reveal delay={100}>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                            More than a tool. <br />
                            <span className="text-accent">Your growth partner.</span>
                        </h3>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="text-lg text-secondary mb-12 leading-relaxed max-w-lg">
                            You can call us your business co-pilot, your smart colleague or maybe your best business partner.
                        </p>
                    </Reveal>

                    <div className="space-y-8">
                        {[
                            { title: "Real-time Intelligence", desc: "No more awaiting month-end reports. Insights as they happen." },
                            { title: "Modular Architecture", desc: "Scale features as you scale your team. Pay only for what you use." },
                            { title: "Future-Proof Tech", desc: "Built on stack that anticipates market shifts." }
                        ].map((item, i) => (
                            <Reveal key={i} delay={300 + (i * 100)}>
                                <div className="flex gap-6 group cursor-pointer">
                                    <div className="flex-shrink-0 w-12 h-12 bg-accentSoft rounded-full flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                        <svg className="w-5 h-5 text-accent group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                                        <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={600}>
                        <button type="button" className="mt-12 px-8 py-4 bg-accent text-white rounded-full font-bold hover:opacity-95 transition-colors duration-200 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                            Explore Case Studies
                        </button>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
