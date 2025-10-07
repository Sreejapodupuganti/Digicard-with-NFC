import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as admin from "../api/admin";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function AdminOverview() {
    const [stats, setStats] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        admin.getOverview()
            .then(({ data }) => setStats(data))
            .catch((e) => setErr(e?.response?.data?.message || "Not authorized / failed to load"));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-8">
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">
                    Admin Overview
                </motion.h1>

                {err && <div className="mb-4 rounded bg-red-50 text-red-700 p-3">{err}</div>}
                {!stats && !err && <Loader />}

                {stats && (
                    <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">Total Users</p>
                            <p className="text-2xl font-bold">{stats.total_users}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">Total Cards</p>
                            <p className="text-2xl font-bold">{stats.total_cards}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">Payments (count)</p>
                            <p className="text-2xl font-bold">{stats.total_payments}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">Revenue (INR)</p>
                            <p className="text-2xl font-bold">₹{stats.total_revenue}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5 sm:col-span-2 lg:col-span-1">
                            <p className="text-gray-500">Today</p>
                            <p className="text-lg mt-1">Users: {stats.today_users} • Payments: {stats.today_payments}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}