import React, { useEffect, useState } from "react"
import { FiUser, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi"
import Navbar from "/src/components/Navbar"
import { useForm } from "react-hook-form"
import { supabase } from "/src/lib/supabase.js"
import { useNavigate } from "react-router"

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                navigate("/")
            } else {
                setLoading(false)
            }
        }

        checkUser()
    }, [navigate])

    if (loading) {
        return <div>Loading...</div>
    }

    async function login({ username, password }) {
        const { data, error } = await supabase.from("user_profiles").select("email").eq("username", username).single()

        if (error || !data) {
            alert("Username tidak ditemukan", error)
            return
        }

        const { error: authError } =
            await supabase.auth.signInWithPassword({
                email: data.email,
                password: password
            })

        if (authError) {
            alert("Username atau password salah", authError)
            return
        }
        navigate("/")
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md">
                    {/* Header */}
                    <header className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#00450D]">
                            Masuk ke Akun Anda
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            Silakan masukkan kredensial Anda untuk melanjutkan.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit(login)}>
                        {/* Username */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm mb-1">
                                Username
                            </label>

                            <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                                <FiUser className="text-gray-400 mr-2 text-sm sm:text-base" />

                                <input
                                    id="username"
                                    {...register("username")}
                                    type="text"
                                    placeholder="Masukkan username"
                                    className="bg-transparent outline-none w-full text-sm sm:text-base"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm mb-1">
                                Password
                            </label>

                            <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                                <FiLock className="text-gray-400 mr-2 text-sm sm:text-base" />

                                <input
                                    id="password"
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-transparent outline-none w-full text-sm sm:text-base"
                                    required
                                />

                                {/* Toggle Eye */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="
                w-full 
                bg-[#00450D]
                cursor-pointer 
                text-white 
                py-2.5 
                rounded-lg 
                hover:bg-[#1B5E20]
                transition 
                flex 
                items-center 
                justify-center 
                gap-2
                text-sm sm:text-base
              "
                        >
                            Masuk
                            <FiArrowRight />
                        </button>

                    </form>
                </section>
            </main>
        </>
    )
}

export default Login