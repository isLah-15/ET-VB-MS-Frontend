import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { userAPI } from '../../Features/Auth/UserAPI';



type VerifyInputs = {
    email: string;
    code: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    code: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be a 6 digit number')
        .required('Verification code is required'),
});

const VerifyUser = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [verifyUser, { isLoading }] = userAPI.useVerifyUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        },
    });

    const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
        try {
            const response = await verifyUser(data).unwrap();
            console.log("Verification response:", response);

            toast.success("Account verified successfully!");
            // Redirect or show success
            setTimeout(() => {
                navigate('/login', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.error("Verification error:", error);
            toast.error(`Verification failed. Please check your code and try again`);
            // Error handling
        }
    };

    return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-950 via-yellow-900 to-amber-800 font-circus">
    <div className="w-full max-w-md p-10 md:p-12 rounded-3xl shadow-2xl border-4 border-dashed border-yellow-500 bg-zinc-950/90 text-yellow-100 backdrop-blur-xl transition-transform duration-300 hover:scale-[1.01]">
      <h1 className="text-4xl md:text-5xl font-black mb-10 text-center text-amber-300 tracking-widest uppercase drop-shadow-[0_0_10px_#fbbf24]">
         Verify Your Account 🎪
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter your Email"
            className="w-full px-5 py-4 bg-zinc-900 text-yellow-100 border-2 border-yellow-500 rounded-xl shadow-inner focus:ring-4 focus:ring-amber-400 placeholder:text-yellow-400 placeholder:italic"
            readOnly={!!emailFromState}
          />
          {errors.email && (
            <span className="text-sm text-red-400 mt-1 block">{errors.email.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register('code')}
            placeholder="Enter the 6 Digit Code"
            maxLength={6}
            className="w-full px-5 py-4 bg-zinc-900 text-yellow-100 border-2 border-yellow-500 rounded-xl shadow-inner focus:ring-4 focus:ring-amber-400 placeholder:text-yellow-400 placeholder:italic"
          />
          {errors.code && (
            <span className="text-sm text-red-400 mt-1 block">{errors.code.message}</span>
          )}
        </div>

        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 mt-6 rounded-full bg-gradient-to-r from-red-700 to-yellow-600 hover:from-yellow-600 hover:to-red-700 text-white font-extrabold uppercase tracking-widest border-2 border-amber-900 shadow-lg hover:shadow-yellow-500/70 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner text-yellow-300 mr-2" />
              Verifying...
            </>
          ) : (
            "🎟️ Verify"
          )}
        </button> 
       
      </form>
    </div>
  </div>
);


}
export default VerifyUser;
