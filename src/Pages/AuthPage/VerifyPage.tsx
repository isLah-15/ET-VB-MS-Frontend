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
  const navigate = useNavigate();
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
      console.log('Verification response:', response);

      toast.success('Account verified successfully!');
      setTimeout(() => {
        navigate('/login', {
          state: { email: data.email },
        });
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please check your code and try again');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-rose-100 to-red-200 font-circus">
      <div className="w-full max-w-lg bg-white/90 border-4 border-red-500 rounded-xl shadow-2xl px-8 py-10 text-red-900">
        <h1 className="text-4xl text-center font-extrabold mb-8 text-red-700 drop-shadow-xl uppercase tracking-wider">
          🎟️ Verify Your Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your Email"
              className="w-full circus-input"
              readOnly={!!emailFromState}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register('code')}
              placeholder="Enter 6 Digit Code"
              maxLength={6}
              className="w-full circus-input"
            />
            {errors.code && (
              <p className="text-red-600 text-sm">{errors.code.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-lg tracking-wider uppercase transition duration-300 ease-in-out"
          >
            {isLoading ? 'Verifying...' : 'Verify 🎟️'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
