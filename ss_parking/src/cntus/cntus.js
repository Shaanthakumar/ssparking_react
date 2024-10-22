import React, { useState } from "react";
import './cntus.css'; // Import the CSS file
import axios from 'axios'; // Import Axios for API calls

function Cntus() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/contact-us', formData);
            setSuccess(response.data.message);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setError('Error submitting your message. Please try again.');
            console.error('Error submitting contact form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="contact-panel">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">REACH US</h2>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact-input"
                        type="text"
                        required
                    />
                    <input
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-input"
                        type="email"
                        required
                    />
                    <input
                        name="message"
                        placeholder="Drop your concern"
                        value={formData.message}
                        onChange={handleChange}
                        className="contact-input"
                        type="text"
                        required
                    />

                    <button
                        className={`contact-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'DROP'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Cntus;
