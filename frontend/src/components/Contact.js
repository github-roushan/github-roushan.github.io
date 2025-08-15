import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Contact <span className="text-orange text-shadow-glow">Me</span>
      </h1>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan transition-colors"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan transition-colors"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan transition-colors"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple hover:bg-purple/80 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
