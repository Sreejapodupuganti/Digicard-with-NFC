import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as cards from "../api/cards";
import Navbar from "../components/Navbar";

export default function EditCard() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", phone: "", company: "", designation: "",
        bio: "", website: "", handle: "", socials: { twitter: "", linkedin: "", instagram: "" }
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        cards.getMyCard().then(({ data }) => {
            console.log(data)
            setForm((f) => ({
                ...f,
                ...data,
                socials: { ...f.socials, ...(data?.socials || {}) }
            }));
        }).catch(() => {}).finally(() => {});
    }, []);

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const updateSocial = (k, v) => setForm((f) => ({ ...f, socials: { ...f.socials, [k]: v } }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMsg("");
        try {
            await cards.updateMyCard(form);
            setMsg("Saved!");
            setTimeout(() => navigate("/dashboard"), 600);
        } catch (e) {
            setMsg(e?.response?.data?.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">
                    Edit Your Card
                </motion.h1>

                {msg && <div className="mb-4 rounded-lg bg-neutral-50 text-neutral-800 p-3">{msg}</div>}

                <motion.form
                    onSubmit={submit}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl shadow p-6 space-y-4"
                >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input className="border rounded-lg p-3" placeholder="Name" value={form.name} onChange={(e)=>updateField("name", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Email" type="email" value={form.email} onChange={(e)=>updateField("email", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Phone" value={form.phone} onChange={(e)=>updateField("phone", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Handle (public link)" value={form.handle} onChange={(e)=>updateField("handle", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Company" value={form.company} onChange={(e)=>updateField("company", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Designation" value={form.designation} onChange={(e)=>updateField("designation", e.target.value)} />
                    </div>

                    <textarea className="border rounded-lg p-3 w-full" rows="3" placeholder="Short bio"
                              value={form.bio} onChange={(e)=>updateField("bio", e.target.value)} />

                    <input className="border rounded-lg p-3 w-full" placeholder="Website"
                           value={form.website} onChange={(e)=>updateField("website", e.target.value)} />

                    <div className="grid sm:grid-cols-3 gap-4">
                        <input className="border rounded-lg p-3" placeholder="Twitter"
                               value={form.socials.twitter} onChange={(e)=>updateSocial("twitter", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="LinkedIn"
                               value={form.socials.linkedin} onChange={(e)=>updateSocial("linkedin", e.target.value)} />
                        <input className="border rounded-lg p-3" placeholder="Instagram"
                               value={form.socials.instagram} onChange={(e)=>updateSocial("instagram", e.target.value)} />
                    </div>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-60" disabled={saving}>
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                        <button type="button" onClick={()=>window.open(`/card/${form.handle}`, "_blank")}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                disabled={!form.handle}>
                            Preview Public Card
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}