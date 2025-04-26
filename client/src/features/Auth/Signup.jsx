import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    dob: "",
    interests: "",
    referral: "",
    agreeTerms: false,
    subscribe: false,
  });

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
    "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //if(!form.fullName || !form.email || !form.username || !form.password || !form.confirmPassword || !form.phone || !form.country || !form.dob) {
      //alert("Please fill in all required fields.");
        //return;
    //}
    console.log("Sign Up Data:", form);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex justify-center items-center px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-full max-w-xl shadow-xl border border-purple-400/30"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Create an Account</h2>

        <div className="space-y-4">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} />
          <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          <label className="block text-sm mb-1 text-purple-200">Country</label>
            <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            >
            <option value="">Select your country</option>
            {countries.map((country) => (
                <option key={country} value={country}>
                {country}
                </option>
            ))}
            </select>
          <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
          <Input label="Interests (comma separated)" name="interests" value={form.interests} onChange={handleChange} />
          <Input label="Referral Code" name="referral" value={form.referral} onChange={handleChange} />

          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mt-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required />
              I agree to the <a href="#" className="underline text-purple-300">Terms & Conditions</a>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} />
              Subscribe to updates
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl mt-6 transition-all"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <span className="text-purple-300 hover:underline cursor-pointer" onClick={() => navigate("/signin")}>
              Sign In
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-purple-200">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        required
      />
    </div>
  );
}
